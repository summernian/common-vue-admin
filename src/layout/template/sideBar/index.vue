<template>
	<div class="side-wrapper">
		<!-- logo -->
		<div class="logo-wrap">
			<router-link class="logo" :to="'/index'">
				<img src="@/assets/images/logo.png" />
			</router-link>
		</div>
		<!-- nav -->
		<c-scroll class="side-wrap">
			<div class="menu-wrapper">
				<template v-for="item in baseRoute">
					<!-- 这部分基本没有 -->
					<router-link v-if="!item.children && !item.hidden" :key="item.path" :to="item.path">
						<a-icon v-if="item.icon" :type="item.icon" />
						<span class="side-title">{{ item.meta.title }}</span>
					</router-link>
					<!-- 此项目配置的侧边导航基本只走这里 -->
					<template v-else v-for="temp in item.children">
						<router-link class="side-item" active-class="active" v-if="!temp.hidden" :key="temp.path" :to="temp.path">
							<a-icon class="side-icon" v-if="temp.meta.icon" :type="temp.meta.icon" />
							<span class="side-title">{{ temp.meta.title }}</span>
						</router-link>
					</template>
				</template>
			</div>
		</c-scroll>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default {
		name: 'sideBar',
		props: {
			collapsed: {
				type: Boolean,
				default: true
			},
			mode: {
				type: String,
				default: 'inline'
			}
		},
		components: {},
		data() {
			return {
				
			};
		},
		computed: {
			...mapGetters(['baseRoute'])
		},
		mounted() {
			console.log(this.baseRoute.filter(item => !item.hidden ));
		},
		methods: {
			
		}
	};
</script>
<style lang="scss" scoped>
	.side-wrapper {
		display: flex;
		flex-direction: column;
		.logo-wrap {
			display: flex;
			justify-content: center;
			
			padding-top: 15px;
			width: 80px;
			height: 60px;
			.logo {
				display: block;
				width: 26px;
				height: 26px;
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
		.side-wrap {
			flex: 1;
			
			position: relative;
			padding-top: 8px;
			.menu-wrapper {
				.side-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					
					margin: 0 auto;
					width: 64px;
					height: 64px;
					&.active {
						background: #2D2D2D;
						border-radius: 4px;
					}
					.side-icon {
						width: 20px;
						height: 20px;
						color: #fff;
					}
					.side-title {
						margin-top: 4px;
						height: 18px;
						line-height: 18px;
						font-size: 12px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFF;
					}
				}
			}
		}
	}
</style>