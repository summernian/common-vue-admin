<template>
	<div class="header-wrapper">
		<span class="header-left">
			<!-- 产品 -->
			<span class="header-inner">
				<router-link class="logo" :to="'/index'" replace>
					<!-- <img src="@/assets/images/logo.png" width="36" /> -->
					<span class="header-title">Project W</span>
				</router-link>
			</span>
		</span>
		<span class="header-right">
			<!-- 帮助中心 -->
			<span class="header-handle">
				<a-tooltip placement="bottom">
					<template slot="title">
					  <span>帮助中心</span>
					</template>
					<a-icon type="question-circle" @click="handleHelp" />
				</a-tooltip>
			</span>
			<!-- 菜单切换 -->
			<a-dropdown :trigger="['click']">
				<span class="header-handle">快捷菜单</span>
				<a-menu slot="overlay">
					<template v-for="menu in menusList">
						<a-menu-item :key="menu" :command="menu">
							<a href="javascript:;" @click="handleChange(menu)">{{`${menu}`}}</a>
						</a-menu-item>
					</template>
				</a-menu>
			</a-dropdown>
			<!-- 消息 -->
			<a-popover trigger="click" placement="bottomRight">
				<span class="header-handle">
					<a-badge :dot="messageList.length > 0">
						<a-icon type="bell" />
					</a-badge>
				</span>
				<template slot="content">
					<a-list :data-source="messageList" :loading="messageLoading" class="header-message">
						<a-list-item slot="renderItem" slot-scope="item">
							<div class="header-message__item" :key="item.id">
								<div class="header-message__time">{{ item.time }}</div>
								<div class="header-message__title">{{ item.title }}</div>
							</div>
						</a-list-item>
						<div slot="header" class="header-message__header select-none">
							<span class="header-message__title">新消息</span>
							<a href="javascript:void(0)" :disabled="!messageList.length">详情</a>
						</div>
						<div slot="footer" class="header-message__footer select-none">
							<a href="javascript:void(0)" :disabled="!messageList.length" @click="handleAllRead">全部已读</a>
						</div>
					</a-list>
				</template>
			</a-popover>
			<!-- 用户 -->
			<span class="header-handle" @click="openUserDrawer">
				<span class="header-username">您好，<span class="username">{{ userInfo.name }}</span></span>
			</span>
			<!-- 头像 -->
			<a-avatar class="cursor-pointer" :size="36" :src="userInfo.avatar" icon="user" @click="openUserDrawer" />
		</span>
		<!-- 用户抽屉 -->
		<a-drawer placement="right" wrapClassName="user-drawer-wrapper" :closable="false" :width="400"
			:visible="userVisible" @close="handleCloseUserDrawer">
			<custom-user-drawer :visible.sync="userVisible"></custom-user-drawer>
		</a-drawer>
	</div>
</template>

<script>
	import { fullScreen, exitFullScreen } from '@/utils'; // 全屏及退出
	export default {
		name: 'Header',
		components: {
			CustomUserDrawer: () => import('./UserDrawer')
		},
		data() {
			return {
				// 试凑全屏
				fullScreen: false,
				// 未读消息列表
				messageLoading: false,
				messageList: [],
				// 用户详情弹窗
				userVisible: false,
			}
		},

		computed: {
			menusList() {
				return this.fullScreen ? ['刷新页面', '退出全屏'] : ['刷新页面', '全屏展示'];
			},
			userInfo() {
				return this.$store.state.user.userInfo || {}
			}
		},

		mounted() {
			this.getMessageList();
			window.addEventListener('resize', this.screenChange);
			this.$on("hook:beforeDestroy", () => {
				window.removeEventListener('resize', this.screenChange);
			});
		},

		methods: {
			// 获取未读消息
			getMessageList() {
				const token = this.userInfo.token || ''
				this.messageLoading = true
				this.$api.message.unread({
					token
				}).then(res => {
					if (res.code == '200') {
						this.messageList = res.data;
					} else {
						this.messageList = [];
					}
				}).finally(_ => {
					this.messageLoading = false
				})
			},

			// 全部已读
			handleAllRead() {
				const token = this.userInfo.token || ''
				this.$api.message.allread({
					token
				}).then(res => {
					if (res.code == '200') {
						this.$message.success(res.msg);
						// 清空后应该重新获取，此处因为是mock，没做处理，所以手动清空
						// this.getMessageList(); 
						this.messageList = [];
					}
				})
			},
			
			// 帮助中心
			handleHelp() {
				this.$confirm({
					title: 'I’m Sorry!',
					content: '我压根就没做这个功能。',
					cancelButtonProps: {
						attrs: {
							hidden: true
						},
					},
					icon: h => {
						return h("a-icon", {
							props: {
								type: "exclamation-circle",
								// theme: "filled" // 主题
							},
							style: {
								color: '#f00' //修改图标样式
							}
						})
					},
				})
			},
			
			// 用户详情关闭
			handleCloseUserDrawer() {
				this.userVisible = false
			},

			// 打开用户详情
			openUserDrawer() {
				this.userVisible = true
			},

			// 菜单点击
			handleChange(val) {
				switch (val){
					case '刷新页面':
						window && window.location.reload();
						break;
					case '全屏展示':
						fullScreen();
						break;
					case '退出全屏':
						exitFullScreen();
						break;
					default:
						break;
				}
			},
			
			// 监听屏幕变化
			screenChange() {
				let isFull = document.mozFullScreen
				|| document.fullScreen
				|| document.webkitIsFullScreen
				|| document.webkitFullScreen
				|| document.msFullScreen;
				// 用来判断当前是否是全屏状态 如果是返回 true 如果不是 返回undefined
				this.fullScreen = isFull;
			},
		}
	}
</script>
<style lang="scss" scoped>
	.header-wrapper {
		position: relative;
		height: 100%;
		
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		.header-left {
			height: 100%;
		}
		
		.header-inner {
			display: inline-block;
			height: 100%;
			overflow: hidden;
			
			.logo {			
				display: flex;;
				align-items: center;
				
				.header-title {
					padding: 0 12px;
					color: $primary-color;
					font-size: $FontSize__header-title;
					font-family: fantasy;
					text-shadow: 1px -1px 1px darken($primary-color, 70%);
				}
			}
		}
		
		.header-right {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		
		.header-handle {
			display: inline-block;
			padding: 0 12px;
			height: 100%;
			user-select: none;
			cursor: pointer;

			&:hover {
				background-color: $Color__layout-hover;
			}

			&:active {
				background-color: $Color__layout-header-active;
			}
		}

		.header-username {
			// padding-right: 12px;
			.username {
				color: #000;
				font-weight: 600;
			}
		}
	}
</style>
<style lang="scss">
	// 未读消息
	.header-message {
		position: relative;
		width: 300px;
		.ant-list-header {
			padding-top: 0;
			.header-message__header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.header-message__title {
					font-size: $FontSize__subTitle;
				}
			}
		}
		.ant-list-footer {
			border-top: 1px solid #e8e8e8;
			padding-bottom: 0;
			.header-message__footer {
				text-align: center;
			}
		}
		.ant-list-item {
			padding: 6px 0;
			&:last-child {
				border: none!important;
			}
		}
		.header-message__item {
			overflow: hidden;
			.header-message__title {
				color: $Color__text;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.header-message__time {
				color: $Color__auxiliary-text;
				font-size: 12px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
	
	.user-drawer-wrapper {
		.ant-drawer-content {
			position: relative;
			background: $Color__background;
			padding: 0;
		
			.ant-drawer-wrapper-body {
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: stretch; //撑满高度
				overflow: hidden;
		
				.ant-drawer-header {
					flex-shrink: 0; //弹性布局不压缩
					
					height: 48px;
					line-height: 48px;
					padding: 0 16px;
		
					.ant-drawer-title {
						height: inherit;
						line-height: inherit;
					}
		
					.ant-drawer-close {
						width: 48px;
						height: 48px;
						line-height: 48px;
					}
				}
		
				.ant-drawer-body {
					flex: 1;
					
					position: relative;
					padding: 0;
					overflow: hidden;
				}
			}
		}
	}
</style>