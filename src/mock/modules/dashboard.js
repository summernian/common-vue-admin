import Mock from 'mockjs';
import qs from 'qs';

import { dateFormat, subDate } from '@/utils';

export const labels = [
	'Vuex', 'Redux', 'Vue-cli3', 'Webpack',
	'Nodejs', 'Rect', 'Angular', 'Vue-router', 'Axios',
	'Fetch', 'Vue', 'HTML', 'HTML5', 'javascript', 'Java',
	'C#', 'C++', 'Paython', '人工智能', 'MySQL', '大数据',
	'网络安全', '机器学校', 'C',  '小程序', 'webApp', '.net', 'KOA', 'uniApp', 'electron'
];

const getPrevWeek = () => {
	const now = new Date();
	const week = [dateFormat(now, 'MM-dd')];
	for (let i = 1; i <= 6; i++) {
		week.unshift(dateFormat(subDate(now, `${i}d`), 'MM-dd'));
	}
	return week;
}

const getPrev30Days = () => {
	const now = new Date();
	const days = [dateFormat(now, 'MM-dd')];
	for (let i = 1; i <= 29; i++) {
		days.unshift(dateFormat(subDate(now, `${i}d`), 'MM-dd'));
	}
	return days;
}

// 模拟todayVisits接口
Mock.mock(RegExp('/mock/dashboard/todayVisits'), res => {
	let { token } = qs.parse(res.body);
	if(!token) {
		return {
			code: 401,
			msg: '请传入token！'
		}
	} else {
		const week = getPrevWeek();
		const charts = [
			{
				name: '近七天访问量',
				data: week.map(date => ({
					name: date,
					value: parseInt(Math.random() * 9999, 10) + 1
				}))
			}
		];
		const data = {
			charts,
			today: parseInt(Math.random() * 9999, 10) + 1
		};
		
		return {
			code: 200,
			msg: '请求成功！',
			data,
		}
	}
});

// 模拟todayProfit接口
Mock.mock(RegExp('/mock/dashboard/todayProfit'), res => {
	let { token } = qs.parse(res.body);
	if(!token) {
		return {
			code: 401,
			msg: '请传入token！'
		}
	} else {
		const week = getPrevWeek();
		const charts = [
			{
				name: '今年',
				data: week.map(date => ({
					name: date,
					value: parseFloat((Math.random() * 9999).toFixed(1)) + 10
				}))
			}, {
				name: '去年',
				data: week.map(date => ({
					name: date,
					value: parseFloat((Math.random() * 9999).toFixed(1)) + 10
				}))
			}
		];
		const data = {
			charts,
			today: parseFloat((Math.random() * 9999).toFixed(1)) + 10
		};
		
		return {
			code: 200,
			msg: '请求成功！',
			data,
		}
	}
});

// 获取资源收益排行
Mock.mock(RegExp('/mock/dashboard/resourceRanking'), res => {
	let { token } = qs.parse(res.body);
	if(!token) {
		return {
			code: 401,
			msg: '请传入token！'
		}
	} else {
		let data = Mock.mock({
			'data|5': [
				{
					'id|+1': 1,
					name: '@word',
					'profit|100-9999': 1
				}
			]
		}).data.sort((a, b) => (b.profit - a.profit));
		
		const total = data.reduce((total, item) => (total += item.profit), 0) + parseInt(Math.random() * 400 + 100, 10);
		
		data = data.map(item => ({ ...item, ratio: item.profit / total }));
		
		return {
			code: 200,
			msg: '请求成功！',
			data,
		}
	}
});

// 获取资源总数
Mock.mock(RegExp('/mock/dashboard/totalStatistic'), res => {
	let { token } = qs.parse(res.body);
	if(!token) {
		return {
			code: 401,
			msg: '请传入token！'
		}
	} else {
		const week = getPrevWeek()
		const data = {
			totalResources: parseInt(Math.random() * 400 + 200, 10),
			weekDownload: week.map(w => ({
				name: w,
				value: parseInt(Math.random() * 500 + 40, 10)
			})),
			weekLikes: week.map(w => ({
				name: w,
				value: parseInt(Math.random() * 500 + 60, 10)
			})),
			weekComments: week.map(w => ({
				name: w,
				value: parseInt(Math.random() * 500 + 50, 10)
			}))
		}
		
		return {
			code: 200,
			msg: '请求成功！',
			data,
		}
	}
});

// 获取下载类型
Mock.mock(RegExp('/mock/dashboard/resourceTypeRatio'), res => {
	let { token } = qs.parse(res.body);
	if(!token) {
		return {
			code: 401,
			msg: '请传入token！'
		}
	} else {
		const downloadType = ['1', '2', '3'];
		const data = downloadType.map(type => ({ type, value: parseInt(Math.random() * 200 + 50, 10) }));
		
		return {
			code: 200,
			msg: '请求成功！',
			data,
		}
	}
});

// 获取资源下载排行
Mock.mock(RegExp('/mock/dashboard/downloadRanking'), res => {
	let { token } = qs.parse(res.body);
	if(!token) {
		return {
			code: 401,
			msg: '请传入token！'
		}
	} else {
		const data = Mock.mock({
			'data|10': [
				{
					'id|+1': 1,
					name: '@word',
					'count|20-300': 1
				}
			]
		}).data.sort((a, b) => (b.count - a.count))
		
		return {
			code: 200,
			msg: '请求成功！',
			data,
		}
	}
});

// 获取类型统计
Mock.mock(RegExp('/mock/dashboard/typeStastics'), res => {
	let { token } = qs.parse(res.body);
	if(!token) {
		return {
			code: 401,
			msg: '请传入token！'
		}
	} else {
		const data = labels.map(label => ({
			name: label,
			value: parseInt(Math.random() * 100)
		}));
		
		return {
			code: 200,
			msg: '请求成功！',
			data,
		}
	}
});

// 获取趋势数据
Mock.mock(RegExp('/mock/dashboard/downloadTrend'), res => {
	let { token } = qs.parse(res.body);
	if(!token) {
		return {
			code: 401,
			msg: '请传入token！'
		}
	} else {
		const data = getPrev30Days().map(day => ({
			name: day,
			value: parseInt(Math.random() * 200, 10)
		}))
		
		return {
			code: 200,
			msg: '请求成功！',
			data,
		}
	}
});