import request from '@/utils/request';
import qs from 'qs'; // 根据需求是否导入qs模块

/**
 * @description 今日访问量
 * @param {string}  token
 * @returns {*} 
 */
export function todayVisits(data) {
	return request.post('/dashboard/todayVisits', qs.stringify(data));
}

/**
 * @description 今日收益
 * @param {string}  token
 * @returns {*}
 */
export function todayProfit(data) {
	return request.post('/dashboard/todayProfit', qs.stringify(data));
}

/**
 * @description 获取收益排行
 * @param {string}  token
 * @returns {*}
 */
export function resourceRanking(data) {
	return request.post('/dashboard/resourceRanking', qs.stringify(data));
}
