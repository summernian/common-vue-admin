<template>
	<div class="main-container">
		<sideBar class="aside-container" />
		<div class="main-content" :class="{aaa: false, bbb: true}">
			<router-view />
		</div>
	</div>
</template>

<script>
	import sideBar from './sideBar';
	export default {
		name: 'layout',
		components: { sideBar },
	};
</script>
<style lang="scss" scoped>
	.main-container {
		display: flex;
		
		width: 100%;
		height: 100%;
		overflow: hidden;
		.aside-container {
			width: 80px;
			height: 100%;
			background: #212121;
		}
		.main-content {
			flex: 1;
			
			padding: 12px;
			background: #f5f6f7;

			overflow: hidden auto;
		}
	}
</style>
