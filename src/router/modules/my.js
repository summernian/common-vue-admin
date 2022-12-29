import Layout from '@/layout';

const componentsRouter = {
	name: 'my',
	path: '/my',
	component: Layout,
	redirect: '/my/index',
	meta: {
		title: 'my',
		icon: 'dashboard',
	},
	children: [
		{
			name: 'myIndex',
			path: '/my/index',
			component: () => import('@/views/my/index'),
			meta: {
				title: 'my',
				icon: 'personal'
				// hidden: true,
			}
		},
		{
			name: 'myPersonal',
			path: '/my/personal',
			component: () => import('@/views/my/personal'),
			meta: {
				title: 'personal',
				icon: 'personal',
				role: ['superAdmin'],
				// hidden: true,
			}
		},
	]
};

export default componentsRouter;