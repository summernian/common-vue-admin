<template>
	<div>
		<div class="custom-sider__menus">
			<a-menu
				mode="inline" :multiple="false" 
				:openKeys="openKeys" :selectedKeys="selectedKeys" 
				@click="handleMenuItemClick" @openChange="handleOpenKeysChange"
			>
				<!-- 菜单 -->
				<template v-for="menu in menus">
					<!-- 二级菜单 -->
					<template v-if="menu.children && menu.children.length">
						<a-sub-menu :key="menu.path" :disabled="menu.disabled" v-if="!menu.meta.hidden && !menu.meta.split">
							<span slot="title">
								<a-icon v-if="menu.meta.icon" :type="menu.meta.icon" />
								<i v-else-if="menu.meta.iconClass" :class="menu.meta.iconClass"></i>
								<span>{{ menu.meta.title }}</span>
							</span>
							<template v-for="subMenu in menu.children">
								<a-menu-item :key="subMenu.path" :disabled="subMenu.disabled" v-if="!subMenu.meta.hidden">
									<a-icon v-if="subMenu.meta.icon" :type="subMenu.meta.icon" />
									<i v-else-if="subMenu.iconClass" :class="subMenu.iconClass"></i>
									<span>{{ subMenu.meta.title }}</span>
								</a-menu-item>
							</template>
						</a-sub-menu>
						<!-- 一级菜单 -->
						<template v-else-if="!menu.meta.hidden">
							<a-menu-item v-for="subMenu in menu.children" :key="subMenu.path" :disabled="subMenu.disabled">
								<a-icon v-if="subMenu.meta.icon" :type="subMenu.meta.icon" />
								<i v-else-if="subMenu.iconClass" :class="subMenu.iconClass"></i>
								<span>{{ subMenu.meta.title }}</span>
							</a-menu-item>
						</template>
					</template>
					<!-- 一级菜单 -->
					<template v-else>
						<a-menu-item :key="menu.path" :disabled="menu.disabled" v-if="!menu.children && !menu.meta.hidden">
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
				console.log('s');
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
		
		created() {			
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
<style lang="scss" scoped>
	// 侧边栏菜单样式
	.custom-sider__menus {
		.ant-menu {
			width: 100%; 
			background: $Color__background-menu;
			border-width: 0;
			
			// 展开菜单 自定义颜色
			&.ant-menu-inline {
				// menu-item
				.ant-menu-item {
					color: $Color__title;
					margin: 4px 0;

					&:hover {
						color: $primary-color;
						background-color: $Color__background;
					}

					&:active {
						color: darken($primary-color, 10%);
						background-color: darken($Color__background, 5%);
					}

					&.ant-menu-item-selected {
						color: $primary-color;
						background-color: $Color__background;
					}

					// 菜单选择bar
					&::after {
						left: 0;
						right: unset;
						border-right-width: 0;
						border-left: 5px solid $primary-color;
					}
				}
				
				// sub-menu
				.ant-menu-submenu {
					/deep/ .ant-menu-submenu-title {
						color: $Color__title;
						margin: 4px 0;
					
						&:hover {
							color: $primary-color;
					
							.ant-menu-submenu-arrow {
								&::before, &::after {
									background-image: linear-gradient(to right, $primary-color, darken($primary-color, 10%));
								}
							}
						}
					
						&:active {
							color: darken($primary-color, 10%);
							background-color: darken($Color__background, 1%);
					
							.ant-menu-submenu-arrow {
								&::before, &::after {
									background-image: linear-gradient(to right, darken($primary-color, 10%), darken($primary-color, 10%));
								}
							}
						}
					}
					
					// submenu 有选中菜单的展开样式
					&.ant-menu-submenu-selected:not(.ant-menu-submenu-open) {
						color: $primary-color;
						
						/deep/ .ant-menu-submenu-title {
							color: $primary-color;
							
							.ant-menu-submenu-arrow {
								&::before, &::after {
									background-image: linear-gradient(to right, $primary-color, darken($primary-color, 10%));
								}
							}
						}
					}
					
					// 展开样式
					&.ant-menu-submenu-open {
						color: $primary-color;
						
						/deep/ .ant-menu-submenu-title {
							color: $primary-color;
							font-size: 110%;
							
							.ant-menu-submenu-arrow {
								&::before, &::after {
									background-image: linear-gradient(to right, $primary-color, darken($primary-color, 10%));
								}
							}
						}
					}
				}
			}

			// 收缩菜单 自定义颜色
			&.ant-menu-inline-collapsed {
				// menu-item
				.ant-menu-item {
					font-size: 16px;
					padding: 0 8px !important;
					text-align: center;
					color: $Color__title;

					&:hover {
						color: $primary-color;
					}

					&:active {
						color: darken($primary-color, 10%);
					}

					&.ant-menu-item-selected {
						color: $primary-color;
						background-color: $Color__background;
					}
				}

				// sub-menu
				.ant-menu-submenu {
					/deep/ .ant-menu-submenu-title {
						font-size: 16px;
						padding: 0 8px !important;
						text-align: center;
						color: $Color__title;
					
						&:hover {
							color: $primary-color;
						}
					
						&:active {
							color: darken($primary-color, 10%);
						}
					}
					
					// submenu 有选中菜单的展开样式
					&.ant-menu-submenu-selected:not(.ant-menu-submenu-open) {
						color: $primary-color;

						/deep/ .ant-menu-submenu-title {
							color: $primary-color;
						}
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

			&:hover {
				color: $primary-color;
			}

			&:active {
				color: darken($primary-color, 10%);
			}
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