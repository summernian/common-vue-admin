import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

/**
 * @description 路由说明
 * @param {Boolean}  hidden 用来判断是否显示在侧边导航栏
 * @param {Number}  sort 动态引入的路由排序
 * @param {Object}  meta { title: 页面标题，icon: 导航图标，role: 权限（super_admin、admin、null） } 
 */

// 基础路由
export const baseRoutes = [
	{
		name: 'login',
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true,
		meta: {
			title: 'login'
		}
	},
	{
		path: '/404',
		component: () => import('@/views/error/404'),
		hidden: true,
		meta: {
			title: 'error'
		}
	},
];

/**
 * 异步挂载 modules 下的路由
 * 动态需要根据权限加载的路由表
 */
const modulesFiles = require.context('./modules', true, /\.js$/);
let routesModules = [];
// 自动引入modules目录下的所有模块
modulesFiles.keys().reduce((modules, modulePath) => {
	const value = modulesFiles(modulePath);
	routesModules.push(value.default);
}, {});
// 排序 引入的导航是按名称自动排序，未必符合设计时想要的顺序，故此单独加一个sort属性排序
routesModules = routesModules.sort((a,b) => a.sort ? (a.sort - b.sort) : -1);
console.log('动态路由全索引：',routesModules);

// 动态路由
import Layout from '@/layout';
export const asyncRoutes = [
	{
		path: '/',
		component: Layout,
		redirect: '/index',
		children: [
			{
				name: 'index',
				path: '/index',
				component: () => import('@/views/index/index'),
				meta: {
					title: 'home',
					icon: 'dashboard',
				}
			}
		]
	},
	...routesModules,
	{
		path: '*',
		redirect: '/404',
		hidden: true,
	}
];

const createRouter = () => new VueRouter({
	routes: baseRoutes,
	// mode:'history', 
	scrollBehavior: () => ({ y: 0 }),
});

const router = createRouter();

export function resetRouter() {
	router.matcher = createRouter().matcher;
}

//重定向时报错，用这个不让他报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
	return originalPush.call(this, location).catch(err => err);
};

export default router;