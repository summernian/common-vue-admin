import Layout from '@/layout';

const componentsRouter = {
	name: 'pending',
	path: '/pending',
	component: Layout,
	redirect: '/pending/index',
	meta: {
		title: 'pending',
		icon: 'dashboard',
		sort: 1,
	},
	children: [
		{
			name: 'pendingIndex',
			path: '/pending/index',
			component: () => import('@/views/pending/index'),
			meta: {
				title: 'pending',
				icon: 'pending',
				// hidden: true,
			}
		},
	]
};

export default componentsRouter;