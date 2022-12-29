<template>
	<div class="main-container" :class="{aaa: false, bbb: true}">
		<CustomBasicLayout />
	</div>
</template>

<script>
	import CustomBasicLayout from './components/BasicLayout.vue';
	export default {
		name: 'layout',
		components: { CustomBasicLayout, },
		data() {
			return {
				username: ''
			}
		},
		created() {
			this.username = this.$store.state.user.userInfo.name;
			this.$watermark({ text: this.username, opacity: .15 });
		}
	};
</script>
<style lang="scss" scoped>
	.main-container {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: $Color__background;
	}
</style>
