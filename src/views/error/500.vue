<template>
	<a-result
		class="custom-result-container flex flex-col flex-row-center"
		status="500" title="Page Error Of 500" 
		sub-title="一片荒芜，大概率是服务器挂了吧！"
	>
		<!-- <template slot="extra">
			<a-button type="default" @click="handleGoHome">回到首页</a-button>
		</template> -->
	</a-result>
</template>

<script>
	export default {
		name: 'Page500',
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