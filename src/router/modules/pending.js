import Layout from '@/layout';

const componentsRouter = {
	sort: 1,
	name: 'pending',
	path: '/pending',
	component: Layout,
	redirect: '/pending/index',
	children: [
		{
			name: 'pendingIndex',
			path: '/pending/index',
			component: () => import('@/views/pending/index'),
			// hidden: true,
			meta: {
				title: '待办',
				icon: 'pending'
			}
		},
	]
};

export default componentsRouter;