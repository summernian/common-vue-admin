import Layout from '@/layout';

const componentsRouter = {
	name: 'my',
	path: '/my',
	component: Layout,
	redirect: '/my/index',
	children: [
		{
			name: 'myIndex',
			path: '/my/index',
			component: () => import('@/views/my/index'),
			hidden: true,
			meta: {
				title: '我的',
				icon: 'personal'
			}
		},
		{
			name: 'myPersonal',
			path: '/my/personal',
			component: () => import('@/views/my/personal'),
			hidden: true,
			meta: {
				title: '个人中心',
				icon: 'personal',
				role: ['super_admin'],
			}
		},
	]
};

export default componentsRouter;