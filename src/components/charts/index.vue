<template>
	<div class="custom-component-chart">
		<a-spin :spinning="loading">
			<!-- 图表实例 -->
			<div 
				v-if="!isNoData && !isFailed" 
				:id="localId" :style="{ height: localHeight }"
				class="custom-component-chart__instance" 
			></div>
			<!-- 处理结果 -->
			<div v-else class="custom-component-chart__result">
				<template v-if="isNoData">
					<slot name="noData">
						<div class="custom-component-chart__resultTitle">{{('暂无数据')}}</div>
					</slot>
				</template>
				<template v-else-if="isFailed">
					<slot name="falied">
						<div class="custom-component-chart__resultTitle">{{('加载失败')}}</div>
					</slot>
				</template>
			</div>
		</a-spin>
	</div>
</template>

<script>
	import * as echarts from 'echarts';
	
	let id = 1;
	export default {
		name: 'Custom-Charts',
		props: {
			loading: Boolean,

			isFailed: Boolean,

			isNoData: Boolean,

			option: {
				type: Object,
				required: true
			},

			height: {
				type: [Number, String],
				default: 200
			},

			autoResize: Boolean
		},

		data() {
			return {
				id: id++,
				chartInstance: null
			}
		},

		computed: {
			localId() {
				return `custom-charts-id-${this.id}`;
			},

			localHeight() {
				return typeof this.height === 'string' ? this.height : `${this.height}px`;
			},

			mergeOption() {
				const defaultOption = {};
				return {
					...defaultOption,
					...this.option
				}
			}
		},

		watch: {
			option: {
				handler() {
					this.init();
				},
				deep: true,
			},

			height: {
				handler() {
					this.handleResize();
				},
				deep: true,
			}
		},

		mounted() {
			// 这里的定时器是因为
			setTimeout(() => {
				this.init();
			}, 20)
			// 监听屏幕尺寸变化
			window.addEventListener('resize', this.handleResize);
			this.$on("hook:beforeDestroy", () => {
				window.removeEventListener('resize', this.handleResize);
			});
		},

		methods: {
			init() {
				if (!this.chartInstance) {
					this.chartInstance = echarts.init(document.getElementById(this.localId));
				}
				this.chartInstance.setOption(this.mergeOption);
			},

			handleResize() {
				this.chartInstance && this.chartInstance.resize();
			}
		}
	}
</script>
<style lang="scss" scoped>
	.custom-component-chart {
		position: relative;
		display: block;
		width: 100%;

		&__instance {
			position: relative;
			display: block;
			width: 100%;
		}

		&__result {
			position: relative;
			display: block;
			width: 100%;
			padding: 24px 12px;

			.custom-component-chart__resultTitle {
				text-align: center;
				color: $Color__auxiliary-text;
				font-size: 12px;
			}
		}
	}
</style>
