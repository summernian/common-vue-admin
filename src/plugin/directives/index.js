//导入modules文件夹下所有的js文件
const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
	const value = modulesFiles(modulePath);
	modules[moduleName] = value.default;
	return modules;
}, {});

export default {
	install(Vue) {
		Object.keys(modules).forEach((key) => {
			Vue.directive(key, modules[key]);
		});
	},
};
