import Layout from '@/layout';

const componentsRouter = {
	sort: 9999,
	name: 'permission',
	path: '/permission',
	component: Layout,
	redirect: '/permission/index',
	children: [
		{
			name: 'permissionIndex',
			path: '/permission/index',
			component: () => import('@/views/permission/index'),
			// hidden: true,
			meta: {
				title: 'permission',
				icon: 'permission',
				role: ['super_admin'],
			}
		},
	]
};

export default componentsRouter;
