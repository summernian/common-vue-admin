// 配置
window.configure = {
	development: {
		VUE_APP_BASE_API: '/api', //通用接口地址 （不带地址则默认访问根路径）
		VUE_APP_OTHER_API: '/other', // 如果需要请求其他的地址
		mock: true,
	},
	production: {
		VUE_APP_BASE_API: '/', //通用接口地址
		VUE_APP_OTHER_API: '/other', // 如果需要请求其他的地址
		mock: false,
	},
	
}