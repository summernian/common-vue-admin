//导入modules文件夹下所有的js文件
const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
	const value = modulesFiles(modulePath);
	modules[moduleName] = {...value};
	return modules;
}, {});

// 说明见 ./modules/test.js
export default modules;