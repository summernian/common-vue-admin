import request from '@/utils/request';
import qs from 'qs'; // 根据需求是否导入qs模块

/**
 * @description 获取未读消息列表
 * @param {string}  token
 * @returns {Array} messageList
 */
export function unread(data) {
	return request.post('/message/unread', qs.stringify(data));
}

/**
 * @description 获取未读消息列表
 * @param {string}  token
 * @returns {String} message
 */
export function allread(data) {
	return request.post('/message/allread', qs.stringify(data));
}
