<template>
	<div class="user-drawer__wrapper">
		<!-- 用户信息 -->
		<div class="user-drawer__content">
			<!-- 关闭按钮 -->
			<div class="user-drawer__close" @click="handleCloseDrawer" >
				<a-icon type="close" />
			</div>
			<!-- 用户信息 -->
			<div class="user-drawer__header">
				<a-card class="user-drawer__info">
					<a-card-meta 
						:border="false" 
						:title="userInfo.name" 
						:description="userInfo.role"
					>
						<template slot="avatar">
							<div class="user-drawer__avatarContent">
								<a-avatar 
									:src="userInfo.avatar" 
									:size="52" 
									icon="user" 
									class="user-drawer__avatar"
									@click="handleChangeAvatar" 
								/>
								<span class="user-drawer__avatarMask">编辑</span>
							</div>
						</template>
					</a-card-meta>
				</a-card>
				<div class="user-drawer__otherInfo">
					<!-- 手机 -->
					<div v-if="userInfo.telphone" class="user-drawer__otherInfoItem">
						<span class="user-drawer__otherInfoItem--icon" :title="('telphone')">
							<a-icon type="mobile" />
						</span>
						<span>{{userInfo.telphone}}</span>
					</div>
					<!-- 邮箱 -->
					<div v-if="userInfo.email" class="user-drawer__otherInfoItem">
						<span class="user-drawer__otherInfoItem--icon" :title="('email')">
							<a-icon type="mail" />
						</span>
						<span>{{userInfo.email}}</span>
					</div>
					<!-- 职位 -->
					<div v-if="userInfo.position" class="user-drawer__otherInfoItem">
						<span class="user-drawer__otherInfoItem--icon" :title="('position')">
							<a-icon type="user" />
						</span>
						<span>{{userInfo.position}}</span>
					</div>
					<!-- 地区 -->
					<div v-if="userInfo.region || userInfo.city" class="user-drawer__otherInfoItem">
						<span class="user-drawer__otherInfoItem--icon" :title="('region')">
							<a-icon type="environment" />
						</span>
						<span>{{userInfo.city ? userInfo.city + '-' : ''}}{{userInfo.region}}</span>
					</div>
					<!-- 公司 -->
					<div v-if="userInfo.company" class="user-drawer__otherInfoItem flex-1">
						<span class="user-drawer__otherInfoItem--icon" :title="('company')">
							<a-icon type="bank" />
						</span>
						<span>{{userInfo.company}}</span>
					</div>
				</div>
			</div>
			<!-- 主要内容 -->
			<div class="user-drawer__body">
				<!-- 快速入口 -->
				<div class="user-drawer__bodyChart">
					<div class="user-drawer__entrances">
						<div v-for="(entrance, index) in entrances" :key="index" class="user-drawer__entranceItem" @click="handleNavigateTo(entrance)">
							<div class="user-drawer__entranceIcon">
								<c-svg-icon :icon-class="entrance.ico" class-name="is-icon"></c-svg-icon>
							</div>
							<div class="user-drawer__entranceTitle">{{ entrance.title }}</div>
						</div>
					</div>
				</div>
				<!-- 今日访问量 -->
				<div class="user-drawer__bodyChart is-primary">
					<div class="user-drawer__title">
						<span>{{('今日访问量')}}</span>
						<span>
							<a-tooltip placement="left" :title="('todayVisits_tips')">
								<a-icon type="question-circle" />
							</a-tooltip>
						</span>
					</div>
					<div class="user-drawer__value">{{ todayVisits.today | toThousand }}</div>
					<div class="user-drawer__chart">
						<custom-charts auto-resize height="120px" :option="todayVisits.option"
							:loading="todayVisits.loading" :isFailed="todayVisits.isFailed"
							:isNoData="todayVisits.isNoData" />
					</div>
				</div>
				<!-- 今日收益 -->
				<div class="user-drawer__bodyChart">
					<div class="user-drawer__title">
						<span>{{('今日收益')}}</span>
						<span>
							<a-tooltip placement="left" :title="('todayProfit_tips')">
								<a-icon type="question-circle" />
							</a-tooltip>
						</span>
					</div>
					<div class="user-drawer__value">¥{{ todayProfit.today | toThousand }}</div>
					<div class="user-drawer__chart">
						<custom-charts auto-resize height="120px" :option="todayProfit.option"
							:loading="todayProfit.loading" :isFailed="todayProfit.isFailed"
							:isNoData="todayProfit.isNoData" />
					</div>
				</div>
				<!-- 排行 -->
				<div class="user-drawer__bodyRanking" v-if="resourceRanking.length">
					<div class="user-drawer__rankingTitle">{{('收益排行榜')}} </div>
					<template v-for="rank in resourceRanking">
						<div class="user-drawer__ranking" :key="rank.id">
							<div class="user-drawer__rankingLabel">
								<span class="user-drawer__rankingName">{{ rank.name }}</span>
								<span class="user-drawer__rankingValue">
									<span class="is-profit">¥{{ rank.profit | toThousand }}</span>
									<span class="is-ratio">{{ rank.ratio | toPercentage }}</span>
								</span>
							</div>
							<div class="user-drawer__rankingBar">
								<a-progress status="active" :percent="rank.ratio | toPercentage(1, 0)" :show-info="false" />
							</div>
						</div>
					</template>
				</div>
			</div>
		</div>
		<!-- 操作栏 -->
		<div class="user-drawer__footer">
			<a-button block :loading="exitLoading" @click="handleExit">退出登录</a-button>
		</div>
	</div>
</template>

<script>
	import CustomCharts from '@/components/charts';
	import { mapState } from 'vuex';
	import { toThousand, toPercentage } from '@/utils';
	import { SIMPLE_BAR_OPTION, SIMPLE_LINE_OPTION } from '@/utils/charts';

	export default {
		name: 'CustomUserDrawer',
		components: {
			CustomCharts
		},

		props: {
			visible: Boolean
		},

		data() {
			return {
				entrances: [
					{
						ico: 'users-1',
						title: '快捷入口1',
						path: ''
					},
					{
						ico: 'users-2',
						title: '快捷入口2',
						path: ''
					},
					{
						ico: 'users-3',
						title: '快捷入口3',
						path: ''
					},
					{
						ico: 'users-4',
						title: '快捷入口4',
						path: ''
					},
					{
						ico: 'users-5',
						title: '快捷入口5',
						path: ''
					},
					{
						ico: 'users-6',
						title: '快捷入口6',
						path: ''
					},
					{
						ico: 'users-7',
						title: '快捷入口7',
						path: ''
					},
					{
						ico: 'users-8',
						title: '快捷入口8',
						path: '/my/index'
					}
				],
				// 图表
				// 今日访问量
				todayVisits: {
					loading: false,
					isFailed: false,
					isNoData: false,
					today: '-',
					option: {
						...SIMPLE_BAR_OPTION,
						formatter: '日期：{b}<br />点击量：{c}'
					}
				},

				// 今日收益
				todayProfit: {
					loading: false,
					isFailed: false,
					isNoData: false,
					today: '-',
					option: {
						...SIMPLE_LINE_OPTION,
						tooltip: {
							...SIMPLE_LINE_OPTION.tooltip,
							formatter: '{b}<br/>{a0}: ¥{c0}<br/>{a1}: ¥{c1}'
						}
					}
				},

				// 资源下载量排行
				resourceRanking: [],
				
				exitLoading: false,
			}
		},

		computed: {
			...mapState({
				userInfo: state => state.user.userInfo
			})
		},

		filters: { toThousand, toPercentage },

		mounted() {
			this.getResourceRanking()
			this.getTodayVisits()
			this.getTodayProfit()
		},

		methods: {
			// 修改头像
			handleChangeAvatar() {

			},
			
			handleNavigateTo({ path }) {
				if(path && path != this.$route.path) {
					this.$router.push(path);
					this.handleCloseDrawer();
				}
			},
			
			// 关闭drawer
			handleCloseDrawer() {
				this.$emit('update:visible', false);
			},

			// 退出登录
			handleExit() {
				this.exitLoading = true;
				this.$store.dispatch('user/logout').then(res => {
					// 隐藏侧边栏，因为退出后会清空用户信息，此时侧边栏的部分内容空白，会不好看。
					this.$emit('update:visible', false);
					this.$message.success(res.msg, _ => {
						window.location.reload();
					});
				}).finally(_ => {
					this.exitLoading = false;
				})
			},

			// 获取今日访问量
			getTodayVisits() {
				const token = this.userInfo.token || ''
				this.todayVisits.loading = true
				this.$api.dashboard.todayVisits({ token }).then(res => {
					if (res.code == '200') {
						this.todayVisits.today = res.data.today
						this.todayVisits.option.series = res.data.charts.map(chart => {
							return {
								...this.todayVisits.option.series[0],
								itemStyle: {
									color: '#fff'
								},
								barMinWidth: '8px',
								barMaxWidth: '18px',
								...chart,
							}
						});
						if (res.data.charts.length) {
							this.todayVisits.isNoData = false;
						} else {
							this.todayVisits.isNoData = true;
						}
						this.todayVisits.isFailed = false;
					} else {
						this.todayVisits.isNoData = false;
						this.todayVisits.isFailed = true;
					}
				}).finally(_ => {
					this.todayVisits.loading = false;
				})
			},

			// 获取今日收益
			getTodayProfit() {
				const token = this.userInfo.token || '';
				this.todayProfit.loading = true;
				this.$api.dashboard.todayProfit({ token }).then(res => {
					if (res.code == '200') {
						this.todayProfit.today = res.data.today;
						if (res.data.charts.length) {
							this.todayProfit.option.xAxis.data = res.data.charts[0].data.map(item => item.name);
							this.todayProfit.option.series = res.data.charts.map(chart => {
								return {
									...this.todayProfit.option.series[0],
									...chart
								}
							})
							this.todayProfit.isNoData = false;
						} else {
							this.todayProfit.isNoData = true;
						}
						this.todayProfit.isFailed = false;
					} else {
						this.todayProfit.isNoData = false;
						this.todayProfit.isFailed = true;
					}
				}).finally(_ => {
					this.todayProfit.loading = false;
				})
			},

			// 获取收益排行
			getResourceRanking() {
				const token = this.userInfo.token || '';
				this.$api.dashboard.resourceRanking({ token }).then(res => {
					if (res.code == '200') {
						this.resourceRanking = res.data;
					} else {
						this.resourceRanking = [];
					}
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
	.user-drawer__wrapper {
		position: relative;
		height: 100%;
		overflow: hidden;

		.user-drawer__close {
			position: absolute;
			top: 0px;
			right: 0px;
			width: 28px;
			height: 28px;
			line-height: 28px;
			text-align: center;
			color: rgba(#000, .25);
			cursor: pointer;
			z-index: 1;

			&:hover {
				color: rgba(#000, .5);
			}

			&:active {
				color: rgba(#000, .85);
			}
		}

		.user-drawer__content {
			position: relative;
			height: calc(100% - 48px);
			overflow-x: hidden;
			overflow-y: auto;

			// 用户信息
			.user-drawer__header {

				// 用户信息
				.user-drawer__info {
					border-width: 0;
					background: transparent;

					// 需要 ::v-deep 才生效
					// .ant-card-body {
					// 	padding: 12px 16px;

					// 	.ant-card-meta-title {
					// 		margin-bottom: 0;
					// 		padding-right: 14px
					// 	}

					// 	.ant-card-meta-avatar {
					// 		position: relative;

							.user-drawer__avatarContent {
								position: relative;
								width: 52px;
								height: 52px;
								overflow: hidden;

								&:hover {
									cursor: pointer;
									
									.user-drawer__avatar {
										&::after {
											content: '';
											position: absolute;
											left: 0;
											top: 0;
											width: 100%;
											height: 100%;
											z-index: 1;
											background-color: lighten(rgba(#000, .4), 10%);
										}
									}

									.user-drawer__avatarMask {
										display: inline-block;
									}
								}

								.user-drawer__avatarMask {
									display: none;
									
									position: absolute;
									left: 0;
									top: 50%;
									transform: translateY(-50%);
									
									width: 100%;
									font-size: 12px;
									color: rgba(#fff, .75);
									text-align: center;
									white-space: nowrap;
									user-select: none;
									
									overflow: hidden;
									// background-color: darken(rgba(#000, .3), 10%);
									z-index: 2;
								}
							}
						// }
					// }
				}

				// 其他信息
				.user-drawer__otherInfo {
					padding: 0 30px 12px;
					display: flex;
					flex-flow: row wrap;
					justify-content: space-between;
					
					.user-drawer__otherInfoItem {
						flex: 1 0 50%;
						display: flex;
						align-items: center;
						
						position: relative;

						span {
							font-size: 14px;
							color: $Color__auxiliary-text;
							line-height: 16px;

							&.user-drawer__otherInfoItem--icon {
								flex-shrink: 0;
								margin-right: 12px;
							}
						}
					}

					.user-drawer__otherInfoItem + .user-drawer__otherInfoItem {
						margin-top: 6px;
					}
				}
			}

			// 用户主体
			.user-drawer__body {
				position: relative;
				padding: 12px 16px;

				&>*+* {
					margin-top: 12px;
				}

				.user-drawer__bodyChart {
					position: relative;
					// min-height: 180px;
					background-color: #fff;
					border-radius: 8px;
					padding: 12px;
					box-shadow: 1px 2px 8px $Color__layout-border-shadow;

					.user-drawer__title {
						position: relative;
						color: $Color__auxiliary-text;
						font-size: 12px;
						
						display: flex;
						justify-content: space-between;
						align-items: center;
					}

					.user-drawer__value {
						color: $Color__title;
						font-size: 22px;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}

					// 背景色
					&.is-primary {
						color: #fff;
						background-color: $primary-color;
						box-shadow: 1px 2px 8px lighten($primary-color, 0%);

						.user-drawer__title {
							color: rgba(#fff, .85);
						}

						.user-drawer__value {
							color: #fff;
						}

						.user-drawer__chart {
							.component-chart__resultTitle {
								color: rgba(#fff, .85);
							}
						}
					}

					.user-drawer__entrances {
						position: relative;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						flex-wrap: wrap;

						.user-drawer__entranceItem {
							position: relative;
							width: 25%;
							padding: 4px 6px;

							&:hover {
								cursor: pointer;
								background-color: $Color__layout-hover;
								
								.user-drawer__entranceIcon,
								.user-drawer__entranceTitle {
									fill: $primary-color;
									color: $primary-color;
									font-weight: 600;
								}
							}

							.user-drawer__entranceIcon {
								text-align: center;

								.is-icon {
									font-size: 48px;
									margin-bottom: 4px;
								}
							}

							.user-drawer__entranceTitle {
								font-size: 12px;
								text-align: center;
								line-height: 16px;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								color: $Color__text;
							}
						}
					}
				}

				.user-drawer__bodyRanking {
					position: relative;

					// min-height: 280px;
					.user-drawer__rankingTitle {
						font-size: 16px;
						color: $Color__text;
						margin-bottom: 4px;
					}

					.user-drawer__ranking {
						padding: 4px 0;

						// 文本
						.user-drawer__rankingLabel {
							display: flex;
							justify-content: space-between;
							align-items: center;

							.user-drawer__rankingName {
								flex: 1;
								
								font-size: 12px;
								color: $Color__auxiliary-text;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}

							.user-drawer__rankingValue {
								flex-shrink: 0;
								
								font-size: 12px;

								.is-profit {
									color: $Color__text;
									font-weight: 500;
								}

								.is-ratio {
									color: $success-color;
									margin-left: 12px;
								}
							}
						}

						// 进度条
						.user-drawer__rankingBar {
							/deep/.ant-progress-inner {
								background-color: darken($Color__background, 3%);

								.ant-progress-bg {
									background-color: $primary-color;
								}
							}
						}
					}
				}
			}
		}

		// 页脚操作
		.user-drawer__footer {
			position: absolute;
			bottom: 0;
			width: 100%;
			padding: 0 16px;
			height: 48px;
			line-height: 48px;
			box-shadow: 0px -4px 8px $Color__layout-footer-shadow;
			background: #fff;
		}
	}
</style>
