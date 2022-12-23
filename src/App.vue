<template>
	<a-config-provider :locale="locale">
		<div id="app">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
		</div>
	</a-config-provider>
</template>

<script>
	import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
	export default {
		name: 'app',
		data() {
			return {
				locale: zhCN,
			};
		},
		watch: {
			'$route': {
				handler(newVal) {
					// console.log(newVal, 'route');
				},
				deep: true,
				immediate: true
			}
		},
		created() {
			// 小屏需要缩放, 计算器屏幕高度（ps：不是浏览器的窗口高度）
			if(window.screen.availHeight < 700) {
				document.body.style.zoom = .75;
			}
		},
	}
</script>