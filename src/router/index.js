import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

/**
 * @description 路由说明
 * @param {Object}  meta 路由属性
 * title: 页面标题，icon: 导航图标
 * role: 权限【 superAdmin、admin、user、null 】
 * hidden: 是否显示在菜单栏，split: 不合并折叠，sort: 动态排序
 */

// 基础路由
export const BASE_ROUTES = [
	{
		name: 'login',
		path: '/login',
		component: () => import('@/views/login/index'),
		meta: {
			hidden: true,
			title: 'login'
		}
	},
	{
		name: '403',
		path: '/403',
		component: () => import('@/views/error/403'),
		meta: {
			hidden: true,
			title: 'error page 403'
		}
	},
	{
		name: '404',
		path: '/404',
		component: () => import('@/views/error/404'),
		meta: {
			hidden: true,
			title: 'error page 404'
		}
	},
	{
		name: '500',
		path: '/500',
		component: () => import('@/views/error/500'),
		meta: {
			hidden: true,
			title: 'error page 500'
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
routesModules = routesModules.sort( ( a,b ) => a.meta && a.meta.sort ? (a.meta.sort - b.meta.sort) : -1 );
console.log('动态路由全索引：',routesModules);

// 动态路由
import Layout from '@/layout';
export const ASYNC_ROUTES = [
	{
		path: '/',
		component: Layout,
		redirect: '/index',
		meta: {
			title: '首页',
			icon: 'home',
			split: true,
		},
		children: [
			{
				name: 'index',
				path: '/index',
				component: () => import('@/views/index/index'),
				meta: {
					title: '首页',
					icon: 'home',
				}
			},
			{
				name: 'dashboard',
				path: '/dashboard',
				component: () => import('@/views/index/index'),
				meta: {
					title: '仪表盘',
					icon: 'dashboard',
				}
			}
		]
	},
	
	...routesModules,
	{
		path: '*',
		redirect: '/404',
		meta: {
			hidden: true
		}
	}
];

const createRouter = () => new VueRouter({
	routes: BASE_ROUTES,
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
