import Layout from '@/layout';

const componentsRouter = {
	name: 'permission',
	path: '/permission',
	component: Layout,
	redirect: '/permission/index',
	meta: {
		title: 'permission',
		icon: 'dashboard',
		sort: 99999,
	},
	children: [
		{
			name: 'permissionIndex',
			path: '/permission/index',
			component: () => import('@/views/permission/index'),
			// hidden: true,
			meta: {
				title: 'permission',
				icon: 'permission',
				role: ['superAdmin'],
			}
		},
	]
};

export default componentsRouter;
