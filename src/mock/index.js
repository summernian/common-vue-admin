import qs from 'qs'
// 引入mockjs
const Mock = require('mockjs');

// 模拟登陆接口
Mock.mock(RegExp('/mock/user/login'), res => {
	console.log(res);
	let data = qs.parse(res.body);
	let {username, password} = data;
	if(!['admin','super_admin','editor'].includes(username)) {
		return {
			code: 401,
			msg: '用户不存在'
		}
	} else if(!['admin','123456'].includes(password)) {
		return {
			code: 401,
			msg: '账号密码错误'
		}
	} else {
		let role = {};
		switch(username) {
			case 'admin':
				role.tag = 'admin';
				role.name = '管理员';
				break;
			case 'super_admin':
				role.tag = 'super_admin';
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
			}
		}
	}
});

// 模拟接口
Mock.mock(RegExp('/mock/user/userInfo'), res => {
	console.log(res);
	let { token } = qs.parse(res.body);
	console.log(token, '- token')
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
			case 'super_admin':
				role.name = '超级管理员';
				break;
			default:
				role.name = '用户';
				break;
		}
		return {
			code: 200,
			msg: '验证成功',
			data: {
				role: role.tag,
				name: role.name,
				token: token,
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

export default Mock;
