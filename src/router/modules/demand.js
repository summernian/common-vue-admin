import Layout from '@/layout';

const componentsRouter = {
	name: 'demand',
	path: '/demand',
	component: Layout,
	redirect: '/demand/index',
	meta: {
		title: 'demand',
		icon: 'dashboard',
		sort: 2,
	},
	children: [
		{
			name: 'demandIndex',
			path: '/demand/index',
			component: () => import('@/views/demand/index'),
			meta: {
				// hidden: true,
				title: 'demand',
				icon: 'demand'
			}
		},
	]
};

export default componentsRouter;