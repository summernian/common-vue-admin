<template>
	<a-layout class="custom-basic-layout">
		<a-layout-header class="custom-layout-header">
			<CustomHeader />
		</a-layout-header>
		<a-layout class="custom-layout-inner">
			<a-layout-sider class="custom-layout-sider" :collapsedWidth="64" :collapsed="collapsed" :trigger="null">
				<CustomSiderMenu :collapsed.sync="collapsed" />
			</a-layout-sider>
			<a-layout-content class="custom-layout-content">
				<transition name="slide-fade">
					<router-view></router-view>
				</transition>
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>
<script>
	import CustomHeader from './Header';
	import CustomSiderMenu from './SiderMenu'
	// import { mapState } from 'vuex'
	export default {
		name: 'CustomBasicLayout',
		components: {
			CustomHeader,
			CustomSiderMenu
		},
		computed: {
			// ...mapState(['collapsed'])
		},
		data() {
			return {
				collapsed: false
			}
		}
	}
</script>
<style lang="scss" scoped>
	.custom-basic-layout {
		position: relative;
		height: 100%;
		overflow: hidden;
		background: unset;
		
		.custom-layout-header {
			position: relative;
			height: 48px;
			line-height: 48px;
			padding: 0 12px;
			background-color: #fff;
			box-shadow: 0px 5px 8px $Color__layout-header-shadow;
			z-index: 1;
		}
		
		.custom-layout-inner {
			background: unset;
		}
		
		.custom-layout-sider {
			position: relative;
			background: $Color__background-menu;
			padding: 16px 0 56px;
			
			/deep/ .ant-layout-sider-children {
				overflow: auto;
				overflow: hidden auto; // ie不支持这种写法
			}
		}
		
		.custom-layout-content {
			position: relative;
			padding: 12px;
			
			overflow: auto;
			overflow: hidden auto; // ie不支持这种写法
		}
	}
</style>