const Mock = require('mockjs');
import qs from 'qs'; // 根据需求是否导入qs模块

// 模拟登陆接口
Mock.mock(RegExp('/mock/user/login'), res => {
	console.log(res, 'login params');
	let data = qs.parse(res.body);
	let {username, password} = data;
	if(!['admin','superAdmin','editor'].includes(username)) {
		return {
			code: 401,
			msg: '用户不存在！'
		}
	} else if(!['admin','123456'].includes(password)) {
		return {
			code: 401,
			msg: '账号密码错误！'
		}
	} else {
		let role = {};
		switch(username) {
			case 'admin':
				role.tag = 'admin';
				role.name = '管理员';
				break;
			case 'superAdmin':
				role.tag = 'superAdmin';
				role.name = '超级管理员';
				break;
			default:
				role.tag = 'editor'
				role.name = '用户';
				break;
		}
		return {
			code: 200,
			msg: `登陆成功！欢迎回来，${role.name}。`,
			data: {
				role: role.tag,
				name: role.name,
				token: `eyJhbGciO-iJIUzUxMiJ9.thisIsAToken_${role.tag}`,
				avatar: 'https://thirdqq.qlogo.cn/g?b=oidb&k=hgAVIJyHbBrLBLn9gF3Ekw&kti=Y5Bd_gAAAAA&s=0&rand=1671604747',
				telphone: '177****4111',
				region: '蜀山区',
				city: '合肥市',
				company: '家里蹲有限啃老公司',
				email: '315652758@qq.com',
				position: '前端开发工程师',
			}
		}
	}
});

// 模拟接口
Mock.mock(RegExp('/mock/user/userInfo'), res => {
	let { token } = qs.parse(res.body);
	// console.log(token, '- token')
	if(!token) {
		return {
			code: 401,
			msg: '请传入token！'
		}
	} else {
		let role = {};
		role.tag = token.split('_')[1];
		switch(role.tag) {
			case 'admin':
				role.name = '管理员';
				break;
			case 'superAdmin':
				role.name = '超级管理员';
				break;
			default:
				role.name = '用户';
				break;
		}
		return {
			code: 200,
			msg: '验证成功！',
			data: {
				role: role.tag,
				name: role.name,
				token: token,
				avatar: 'https://thirdqq.qlogo.cn/g?b=oidb&k=hgAVIJyHbBrLBLn9gF3Ekw&kti=Y5Bd_gAAAAA&s=0&rand=1671604747',
				telphone: '17730004111',
				region: '蜀山区',
				city: '合肥市',
				company: '家里蹲啃老有限公司',
				email: '315652758@qq.com',
				position: '前端开发工程师',
			}
		}
	}
});

// 模拟接口
Mock.mock(RegExp('/mock/user/logout'), res => {
	console.log(res);
	return {
		code: 200,
		msg: '退出成功！'
	}
});

// 模拟接口
Mock.mock(RegExp('/mock/message/unread'), res => {
	let { token } = qs.parse(res.body);
	if(!token) {
		return {
			code: 401,
			msg: '请传入token！'
		}
	} else {
		return {
			code: 200,
			msg: '请求成功！',
			data: [
				{id: '1', time: '2021-12-12 12:00:00',title: '名字很长，随便展示展示，如果成功，xxxxxx!'},
				{id: '2', time: '2021-12-18 13:14:20',title: '名字很长，随便展示展示，名字很长，随便展示展示。'},
			]
		}
	}
});

// 模拟接口
Mock.mock(RegExp('/mock/message/allread'), res => {
	let { token } = qs.parse(res.body);
	if(!token) {
		return {
			code: 401,
			msg: '请传入token！'
		}
	} else {
		return {
			code: 200,
			msg: '清除成功！',
		}
	}
});