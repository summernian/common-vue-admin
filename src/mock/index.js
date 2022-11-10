import qs from 'qs'
// 引入mockjs
const Mock = require('mockjs');

// 模拟登陆接口
Mock.mock(RegExp('/mock/user/login'), res => {
	console.log(res);
	let item = qs.parse(res.body);
	console.log(item)
	let username = item.username;
	let password = item.password;
	if (username === 'admin' && password === '123456') {
		return {
			'code': '000',
			'msg': '登陆成功',
			'data': {
				'orgCode': '35002',
				'token': 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOiJhZG1pbiIsInVzZXJOYW1lIjoiYWRtaW4iLCJvcmdDb2RlIjoiMzUwMDAiLCJkZXB0Q29kZSI6IjM1MDAwIiwiYXVkIjoiYWRtaW4iLCJpc3MiOiJhZG1pbiIsImV4cCI6MTU5MzUzNTU5OH0.0pJAojRtT5lx6PS2gH_Q9BmBxeNlgBL37ABX22HyDlebbr66cCjVYZ0v0zbLO_9241FX9-FZpCkEqE98MQOyWw',
			}
		}
	} else {
		return {
			'code': '999',
			'msg': '登陆失败'
		}
	}
});

// 模拟接口
Mock.mock(RegExp('/mock/user/logout'), res => {
	console.log(res);
	let item = qs.parse(res.url.split('?')[1]);
	console.log(item)
	let username = item.username;
	let password = item.password;
	if (username === 'admin' && password === '123456') {
		return {
			'code': '000',
			'msg': '登陆成功',
			'data': {
				'orgCode': '35002',
				'token': 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOiJhZG1pbiIsInVzZXJOYW1lIjoiYWRtaW4iLCJvcmdDb2RlIjoiMzUwMDAiLCJkZXB0Q29kZSI6IjM1MDAwIiwiYXVkIjoiYWRtaW4iLCJpc3MiOiJhZG1pbiIsImV4cCI6MTU5MzUzNTU5OH0.0pJAojRtT5lx6PS2gH_Q9BmBxeNlgBL37ABX22HyDlebbr66cCjVYZ0v0zbLO_9241FX9-FZpCkEqE98MQOyWw',
			}
		}
	} else {
		return {
			'code': '999',
			'msg': '登陆失败'
		}
	}
});

export default Mock;
