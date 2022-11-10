// 配置
window.configure = {
	development: {
		baseApi: '/api', //通用接口地址 （不带地址则默认访问根路径）
		otherApi: '/other', // 如果需要请求其他的地址
		mock: true,
	},
	production: {
		baseApi: '/', //通用接口地址
		otherApi: '/other', // 如果需要请求其他的地址
		mock: false,
	},
	
}