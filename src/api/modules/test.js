import request from '@/utils/request';
import qs from 'qs'; // 根据需求是否导入qs模块

// 接口自动导入，只要在modules文件添加一个xx.js文件，就会自动导入进全局
// 全局使用方式： this.$api.('接口模块的名字：xx').('接口名')， 
// 例如本模块第一个接口: (可以放在任意页面使用，ps：此接口不存在，所以调不通哈)
// this.$api.test.test1({a: '参数1', b: '参数2'}).then(res => console.log(res, '返回值')).catch(err => console.log(err, '错误'))

// 本模块是展示说明文件，接口基本调不通，仅供参考
// 你也可以把不确定的接口放在这里先试试，之后再分类
// post请求 传data，可以选择是否序列化参数，这样后台拿到的就是序列化obj或者JSON
// get请求 传params， 直接序列化后拼在接口后面 例如：/api/getData?a=1&b=2
// request[method](url, {...obj})方式，method为post时，第二个参数默认是data，为get时，第二个参数是配置项，所以参数要用{}包起来
// 另：如果接口不走通用的接口地址，可替换

// 获取当前环境下的全局配置
const configure = window.configure[process.env.NODE_ENV];

/**
 * @description 测试接口1，post请求方式，序列化参数，即后台拿到的是个序列化obj
 */
export function test1(data) {
	return request.post('/post/test1', qs.stringify(data));
}

/**
 * @description 测试接口2，post请求方式，直接传参，即后台拿到的是个JSON
 */
export function test2(data) {
	return request.post('/post/test2', data);
}

/**
 * @description 测试接口3，get请求方式
 */
export function test3(params) {
	return request.get('/get/test3', {
		params
	});
}

/**
 * @description 测试接口4，替换接口地址
 */
export function test4(params) {
	return request({
		method: 'post', // or get
		baseURL: configure.VUE_APP_OTHER_API, // 不走通用地址，替换为全局配置的别的api地址
		url: '/method/test4',
		// 可更改请求头信息
		headers: {
			// 具体配置什么看后台需要，非必填
			// 比如告诉后台给他的是个formData
			"Content-Type": "multipart/form-data", 
		}, 
		data: params, // post请求传这个
		params, // get请求传这个
	});
}