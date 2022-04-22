import Layout from '@/layout/index.vue';
const routes = [
	{
		path: '/',
		name: 'Layout',
		component: Layout,
		redirect: '/LB',
		children: [
			{
				path: '/LB',
				name: 'LB',
				meta: {
					title: 'LB-PEACE',
				},
				component: () => import('@/views/LB/index.vue'),
			},
			{
				path: '/NFT',
				name: 'NFT',
				meta: {
					title: 'NFT-PEACE',
				},
				component: () => import('@/views/NFT/index.vue'),
			},
			{
				path: '/peace',
				name: 'peace',
				meta: {
					title: 'peace',
				},
				component: () => import('@/views/peace/index.vue'),
			},
		],
	},
	{
		path: '/gPAmount',
		name: 'gPAmount',
		meta: {
			title: 'gPAmount',
		},
		component: () => import('@/views/gPAmount/index.vue'),
	},
	{
		path: '/error/404',
		name: 'error404',
		meta: {
			title: '错误页面-找不到资源',
		},
		component: () => import('@/views/errorPage/404.vue'),
	},
	{
		path: '/:catchAll(.*)',
		redirect: '/error/404',
	},
];
export default routes;
