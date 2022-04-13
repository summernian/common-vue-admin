import Layout from '@/layout';

const componentsRouter = {
	sort: 2,
	name: 'demand',
	path: '/demand',
	component: Layout,
	redirect: '/demand/index',
	children: [
		{
			name: 'demandIndex',
			path: '/demand/index',
			component: () => import('@/views/demand/index'),
			// hidden: true,
			meta: {
				title: '需求',
				icon: 'demand'
			}
		},
	]
};

export default componentsRouter;