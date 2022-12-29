import qs from 'qs';
// 引入mockjs
const Mock = require('mockjs');

//导入modules文件夹下所有的js文件
const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
	const value = modulesFiles(modulePath);
	modules[moduleName] = value.default;
	return modules;
}, {});

// 接口延迟500ms，给个交互效果
Mock.setup({
	timeout: 500
});
export default Mock;
