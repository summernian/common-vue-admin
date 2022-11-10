import request from '@/utils/request';
import qs from 'qs'; // 根据需求是否导入qs模块

/**
 * @description 用户登录
 * @param {string}  username
 * @param {string}  password
 * @returns {string} token
 */
export function login(data) {
	return request.post('/user/login', qs.stringify(data));
}

/**
 * @description 获取用户信息
 * @param {string}  token
 * @returns {string} userInfo
 */
export function getInfo(data) {
	return request.post('/user/userInfo', data);
}

/**
 * @description 用户退出登录
 * @returns {string}
 */
export function loginOut(params) {
	return request.get('/user/logout', {params});
}