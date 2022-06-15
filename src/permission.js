import { message } from 'ant-design-vue';
import { getPageTitle } from './assets/utils';
import { getCache } from './assets/utils/session';
import router from './router';
import store from './store';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

// NProgress Configuration
NProgress.configure({
	showSpinner: false
}); 

router.beforeEach(async (to, from, next) => {
	NProgress.start();
	document.title = getPageTitle(to.meta.title);
	const isLogin = getCache('TOKEN');
	if (to.path == '/login') {
		console.log('前往登录');
		next();
		NProgress.done();
	} else {
		if (!isLogin) {
			console.log('尚未登录，前往登录');
			next('/login');
			NProgress.done();
		} else {
			const userInfo = store.state.user.userInfo;
			console.log('userinfo:',userInfo);
			if (userInfo) {
				console.log('已获取用户信息，跳转：',to.path);
				next();
				NProgress.done();
			} else {
				console.log('未获取用户信息，跳转：',to.path);
				try {
					const { role } = await store.dispatch('user/getInfo');
					const accountRoutes = await store.dispatch('permission/getRoute', role);
					// router.addRoutes(accountRoutes); // 该方法在新版已被弃用，可使用，但浏览器会给出警告，故改用addRoute，一个是添加单个，一个是添加数组
					accountRoutes.forEach(item => router.addRoute(item) );
					next({
						...to,
						replace: true
					});
					NProgress.done();
				} catch {
					message.error('获取用户信息失败');
					next('/login');
					NProgress.done();
				}
			}
		}
	}
});

router.afterEach(() => {
	NProgress.done();
});
