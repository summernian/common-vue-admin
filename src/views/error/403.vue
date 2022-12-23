<template>
	<a-result
		class="custom-result-container flex flex-col flex-row-center"
		status="403" title="Page Error Of 403" 
		sub-title="抱歉，你级别不够！"
	>
		<template slot="extra">
			<a-button type="danger" @click="handleGoHome">回到首页</a-button>
		</template>
	</a-result>
</template>

<script>
	export default {
		name: 'Page403',
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