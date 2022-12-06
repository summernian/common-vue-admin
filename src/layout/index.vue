<template>
	<div class="main-container">
		<sideBar class="aside-container"/>
		<div class="main-content" :class="{aaa: false, bbb: true}">
			<router-view />
		</div>
		<!-- 指令添加水印（会被内部dom的背景图覆盖） -->
		<!-- <div class="main-content" v-waterMarker="{text: username}"><router-view /></div>-->
	</div>
</template>

<script>
	import sideBar from './sideBar';
	// import { addWaterMarker } from '@/utils/waterMarker'; // 水印
	export default {
		name: 'layout',
		components: { sideBar },
		data() {
			return {
				username: ''
			}
		},
		created() {
			this.username = this.$store.state.user.userInfo.name;
			// body添加水印，不会被覆盖，但页面会多很多水印dom。
			// addWaterMarker({ text: this.username });
			this.$watermark({ text: this.username, opacity: .512 });
		}
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

			overflow: auto;
			overflow: hidden auto; // ie不支持这种写法
		}
	}
</style>
