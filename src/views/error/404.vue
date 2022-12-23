<template>
	<a-result
		class="custom-result-container flex flex-col flex-row-center"
		status="404" title="Page Error Of 404" 
		sub-title="抱歉，找不到对应页面！"
	>
		<template slot="extra">
			<a-button type="primary" @click="handleGoHome">回到首页</a-button>
		</template>
	</a-result>
</template>

<script>
	export default {
		name: 'Page404',
		methods: {
			handleGoHome() {
				this.$router.push('/')
			}
		}
	}
</script>
<style lang="scss" scoped>
	.custom-result-container {
		// height: 100%;
		
		/deep/ .ant-result-image {
			margin: 24px auto;
		}
	}
</style>