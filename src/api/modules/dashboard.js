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

/**
 * @description 获取资源总数
 * @param {string}  token
 * @returns {*}
 */
export function totalStatistic(data) {
	return request.post('/dashboard/totalStatistic', qs.stringify(data));
}

/**
 * @description 下载类型
 * @param {string}  token
 * @returns {*}
 */
export function resourceTypeRatio(data) {
	return request.post('/dashboard/resourceTypeRatio', qs.stringify(data));
}

/**
 * @description 下载排行榜
 * @param {string}  token
 * @returns {*}
 */
export function downloadRanking(data) {
	return request.post('/dashboard/downloadRanking', qs.stringify(data));
}

/**
 * @description 类型统计
 * @param {string}  token
 * @returns {*}
 */
export function typeStastics(data) {
	return request.post('/dashboard/typeStastics', qs.stringify(data));
}

/**
 * @description 
 * @param {string}  token
 * @returns {*}
 */
export function downloadTrend(data) {
	return request.post('/dashboard/downloadTrend', qs.stringify(data));
}