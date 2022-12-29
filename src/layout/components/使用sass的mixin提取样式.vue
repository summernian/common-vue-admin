<template>
	<div>
		<div class="custom-sider__menus">
			<a-menu 
				style="width: 100%; background: #f0f0f0;"
				mode="inline" :multiple="false" 
				:openKeys="openKeys" :selectedKeys="selectedKeys" 
				@click="handleMenuItemClick" @openChange="handleOpenKeysChange"
			>
				<!-- 菜单 -->
				<template v-for="menu in menus">
					<!-- 二级菜单 -->
					<template v-if="menu.children && menu.children.length">
						<a-sub-menu :key="menu.path" :disabled="menu.disabled" v-if="!menu.hidden">
							<span slot="title">
								<a-icon v-if="menu.meta.icon" :type="menu.meta.icon" />
								<i v-else-if="menu.meta.iconClass" :class="menu.meta.iconClass"></i>
								<span>{{ menu.meta.title }}</span>
							</span>
							<template v-for="subMenu in menu.children">
								<a-menu-item :key="subMenu.path" :disabled="subMenu.disabled">
									<a-icon v-if="subMenu.meta.icon" :type="subMenu.meta.icon" />
									<i v-else-if="subMenu.iconClass" :class="subMenu.iconClass"></i>
									<span>{{ subMenu.meta.title }}</span>
								</a-menu-item>
							</template>
						</a-sub-menu>
					</template>
					<!-- 一级菜单 -->
					<template v-else>
						<a-menu-item :key="menu.path" :disabled="menu.disabled" v-if="!menu.children">
							<a-icon v-if="menu.meta.icon" :type="menu.meta.icon" />
							<i v-else-if="menu.meta.iconClass" :class="menu.meta.iconClass"></i>
							<span>{{ menu.meta.title }}</span>
						</a-menu-item>
					</template>
				</template>
			</a-menu>
		</div>
		<div class="custom-sider__collapse">
			<span @click="handleCollapseChange">
				<a-icon v-if="!collapsed" type="menu-fold" />
				<a-icon v-else type="menu-unfold" />
			</span>
		</div>
	</div>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		name: 'CustomSiderMenu',
		
		props: ['collapsed'],

		data() {
			return {
				openKeys: [],
				selectedKeys: [],
			}
		},

		computed: {
			menus() {
				return this.$store.getters.baseRoute.filter(v => !v.hidden) || []
			}
		},

		watch: {
			'$route.path'() {
				this.setOpenKeys();
				this.setSelectedKeys();
			},

			menus: {
				handler() {
					this.setOpenKeys();
					this.setSelectedKeys();
				},
				deep: true
			},

			collapsed(newVal) {
				if (newVal) {
					// 收缩
					this.openKeys = [];
				} else {
					this.setOpenKeys();
				}
			}
		},

		mounted() {
			this.setOpenKeys();
			this.setSelectedKeys();
		},

		methods: {
			// 获取选择菜单
			setSelectedKeys(key) {
				this.selectedKeys = [key ? key : this.$route.path];
			},

			// 获取submenu展开
			setOpenKeys() {
				const self = this
				let isFind = false
				const findLoop = (menus, parent) => {
					if (isFind) return
					menus.forEach(menu => {
						if (isFind) return
						if (menu.children && menu.children.length) {
							findLoop(menu.children, menu)
						}
						if( menu.path === this.$route.path ) {
							isFind = true;
							self.openKeys = [ parent ? parent.path : menu.path ];
						}
					})
				}
				// 查找
				findLoop(this.menus);
			},

			// 点击菜单
			handleMenuItemClick({ key }) {
				console.log('前往路径: ', key);
				if (this.selectedKeys.indexOf(key) === -1) {
					this.setSelectedKeys(key)
					this.$router.push(key)
				}
			},

			// 展开submenu
			handleOpenKeysChange(keys) {
				console.log('打开的菜单栏: ', keys);
				/* 不控制 openSubKeys 可以直接添加.sync 修饰符，取消openChange 事件监听 */
				// this.openKeys = keys;
				
				/* 控制只展开一个submenu */
				if (keys.length) {
					const openSubKeys = keys.filter(key => !this.openKeys.includes(key))
					this.openKeys = openSubKeys;
				} else {
					this.openKeys = keys;
				}
			},

			// 收缩菜单
			handleCollapseChange() {
				this.$emit('update:collapsed', !this.collapsed);
			}
		}
	}
</script>
<!-- 使用scss提取了公共样式，虽然看起来精简了，但代码量并没有降低， 只是重复的样式少了。 与之相对的是， 代码的阅读量难度大大增加， 修改难度几何倍数上升。  -->
<!-- 结论： 浪费老子2小时， 以后再提取我特么是傻吊。 2022-12-22 22:40:23 提笔 -->
<!-- 说不定只是我用错了方法， 这玩意或许不应该这么用， 以后再尝试尝试。 框架都做出来了， 不可能让人写出这种脱裤子放屁的代码吧？！ 2022-12-22 22:42:00 反思 -->
<!-- 结论： 我真是个善变的人啊！ -->
<style lang="scss" scoped>
	// 右侧箭头样式
	@mixin submenu-arrow-style {
		.ant-menu-submenu-arrow {			
			&::before, &::after {
				background-image: linear-gradient(to right, $primary-color, darken($primary-color, 10%));
			}
		}
	}
	
	// hover样式
	@mixin mouse_hover {
		&:hover {
			color: $primary-color;
			@content;
		}
	}
	// 点击样式
	@mixin mouse_active {
		&:active {
			color: darken($primary-color, 10%);
			@content;
		}
	}
	
	@mixin inline-item {
		margin: 4px 0;
		
		// 菜单选择bar
		&::after {
			left: 0;
			right: unset;
			border-right-width: 0;
			border-left: 5px solid $primary-color;
		}
	}
	@mixin collapsed-item {
		font-size: 16px;
		padding: 0 8px !important;
		text-align: center;
	}
	@mixin ant-menu-item-style {
		.ant-menu-item {
			color: $Color__title;
			@content;
			
			@include mouse_hover {
				background-color: $Color__background;
			}
			@include mouse_active {
				background-color: darken($Color__background, 5%);
			}

			&.ant-menu-item-selected {
				color: $primary-color;
				background-color: $Color__background;
			}
		}
	}
	
	
	
	@mixin inline-submenu {
		margin: 4px 0;
		
		@include mouse_hover {
			@include submenu-arrow-style;
		};
		
		@include mouse_active {
			background-color: darken($Color__background, 1%);
			@include submenu-arrow-style;
		};
	}	
	@mixin collapsed-submenu {
		font-size: 16px;
		padding: 0 8px !important;
		text-align: center;
		
		@include mouse_hover;
		@include mouse_active;
	}
	@mixin ant-menu-submenu-style {
		/deep/ .ant-menu-submenu-title {
			color: $Color__title;
			@content;
		}
		
		// submenu 有选中菜单
		&.ant-menu-submenu-selected:not(.ant-menu-submenu-open) {
			color: $primary-color;
			
			/deep/ .ant-menu-submenu-title {
				color: $primary-color;
				
				@include submenu-arrow-style; // inline-submenu
			}
		}
	}
	
	// 侧边栏菜单样式
	.custom-sider__menus {
		.ant-menu {
			border-width: 0;

			// 展开菜单 自定义颜色
			&.ant-menu-inline {
				// menu-item
				@include ant-menu-item-style {
					@include inline-item;
				}
				
				// sub-menu
				.ant-menu-submenu {
					
					@include ant-menu-submenu-style {
						@include inline-submenu;
					}
					
					&.ant-menu-submenu-open {
						color: $primary-color;
						
						/deep/ .ant-menu-submenu-title {
							color: $primary-color;
							font-size: 110%;
							
							@include submenu-arrow-style;
						}
					}
					
				}
			}

			// 收缩菜单 自定义颜色
			&.ant-menu-inline-collapsed {
				// menu-item
				@include ant-menu-item-style {
					@include collapsed-item;
				}

				// sub-menu
				.ant-menu-submenu {
					@include ant-menu-submenu-style {
						@include collapsed-submenu;
					}
				}
			}
		}
	}
	
	// 侧边栏开关
	.ant-layout-sider-collapsed {
		.custom-sider__collapse {
			padding: 0;

			span {
				display: inline-block;
				width: 100%;
				height: 40px;
				line-height: 40px;
				text-align: center;

				&:hover {
					background-color: $Color__background;
				}

				&:active {
					background-color: darken($Color__background, 1%);
				}
			}
		}
	}
	// 自定义收缩触发器样式
	.custom-sider__collapse {
		position: absolute;
		bottom: 16px;
		left: 0;
		right: 0;
		padding: 0 12px;
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: right;
		font-size: 20px;
		
		span {
			cursor: pointer;
			
			@include mouse_hover;
			@include mouse_active;
		}
	}

</style>
<!-- collapsed menu-popup -->
<style lang="scss">
	.ant-menu-submenu-popup {
		.ant-menu-item {
			color: $Color__title;
			
			&:hover {
				color: $primary-color;
			}
			
			&:active {
				color: darken($primary-color, 10%);
			}
		}
		.ant-menu-item-selected {
			color: $primary-color;
		}
	}
</style>