import axios from 'axios';
import { message } from 'ant-design-vue';
import qs from 'qs';
import store from '@/store';

const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 5000 // 请求超时时间
});

//请求
service.interceptors.request.use(config => {
	// 如果有token 请求接口的时候传递出去
	if (store.getters.token) {
		config.headers['authorization'] = store.getters.token;
	}
	return config;
});

//响应
service.interceptors.response.use(response => {
	// 判断可能的response.data.status，或者response.data.code之类的，打印查看结果
	const res = response.data;
	if (res.code === 200) {
		return Promise.resolve(res);
	} else {
		message.error(res.msg || '请求出错，请检查网络配置或联系管理员~！');
		return Promise.reject(res);
	}
});

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
export default request;
