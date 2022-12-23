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
			// hidden: true,
			meta: {
				title: 'my',
				icon: 'personal'
			}
		},
		{
			name: 'myPersonal',
			path: '/my/personal',
			component: () => import('@/views/my/personal'),
			hidden: true,
			meta: {
				title: 'personal',
				icon: 'personal',
				role: ['superAdmin'],
			}
		},
	]
};

export default componentsRouter;