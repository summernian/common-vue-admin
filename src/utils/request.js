import axios from 'axios';
// 引入qs模块，用来序列化post类型的数据
import qs from 'qs'; 
import { message } from 'ant-design-vue';
import store from '@/store';

// 获取当前全局配置
const configure = window.configure[process.env.NODE_ENV];

// 创建axios实例
const service = axios.create({
	baseURL: configure.mock ? '/mock' : configure.baseApi,
	// 请求超时时间，15秒
	timeout: 15 * 1000, 
	// 跨域时使用第三方的cookie
	// withCredentials: true 
});

//请求
service.interceptors.request.use(
	config => {
		// 给参数添加时间戳，防止浏览器缓存接口数据
		config.params = {
			_t: Date.parse(new Date()) / 1000,
			...config.params
		}
		// 如果有token 请求接口的时候传递出去 
		// token获取和添加方式按自己的搭建方式来，此处用vuex获取
		if (store.getters.token) {
			config.headers['Authorization'] = store.getters.token;
		}
		return config;
	},
	error => Promise.reject(error)
);

//响应
service.interceptors.response.use(
	response => {
		// 判断可能的response.status，或者response.data.code之类的，打印查看结果
		const res = response.data;
		if (response.status === 200 && res.code === 200) {
			return Promise.resolve(res);
		} else {
			message.destroy(); // 防止多个提示框同时出现
			message.error(res.msg || '请求出错，请检查网络配置或联系管理员~！');
			return Promise.reject(res);
		}
	},
	error => {
		message.destroy(); // 防止多个提示框同时出现
		if(!error.response){
			message.error('你小子网断了吧？');
			return Promise.reject(error || new Error( 'Error'))
		} else {
			console.log(error,error.response, 'error')
			// 根据状态码走不同的逻辑，按项目需求更改
			if(['401', '402', '403', '404'].includes(error.response.status.toString())) {
				message.error('后端给的错误，去battle吧！');
			} else {
				message.error('去问问是不是服务器没启！');
			}
			return Promise.reject(error.response);
		}
	}
);

let request = {};
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
request.get = function(url, params = null) {
	return new Promise((resolve, reject) => {
		service.get(url, { params }).then(res => {
			resolve(res.data);
		}).catch(e => {
			reject(e);
		});
	});
};

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
request.post = function(url, params) {
	return new Promise((resolve, reject) => {
		service.post(url, qs.stringify(params)).then(res => {
			resolve(res.data);
		}).catch(e => {
			reject(e);
		});
	});
};

export default service;