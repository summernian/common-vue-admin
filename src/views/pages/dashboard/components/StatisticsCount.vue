<template>
	<a-row :gutter="16">
		<!-- total resources -->
		<a-col :span="6">
			<custom-count-card 
				class="dashboard-count" large 
				:unit="'个'" :title="'资源总数'"
				:value="stasticsCount.totalResources"
			/>
		</a-col>
		<!-- total download -->
		<a-col :span="6">
			<custom-count-card 
				class="dashboard-count" :title="'下载次数'" 
				:value="stasticsCount.totalDownload[0]"
				:trend="stasticsCount.totalDownload"
			>
				<custom-charts 
					slot="left" :height="72" 
					:loading="weekDownload.loading"
					:isNoData="weekDownload.isNoData" 
					:isFailed="weekDownload.isFailed" 
					:option="weekDownload.option"
				/>
			</custom-count-card>
		</a-col>
		
		<a-col :span="6">
			<custom-count-card 
				class="dashboard-count" :title="'点赞总数'"
				:value="stasticsCount.totalLikes[0]" 
				:trend="stasticsCount.totalLikes"
			>
				<custom-charts 
					slot="left" :height="72" 
					:loading="weekLikes.loading" 
					:isNoData="weekLikes.isNoData"
					:isFailed="weekLikes.isFailed" 
					:option="weekLikes.option"
				/>
			</custom-count-card>
		</a-col>
		<a-col :span="6">
			<custom-count-card 
				class="dashboard-count" :title="'评论总数'"
				:value="stasticsCount.totalComments[0]"
				:trend="stasticsCount.totalComments"
			>
				<custom-charts
					slot="left" :height="72"
					:loading="weekComments.loading"
					:isNoData="weekComments.isNoData"
					:isFailed="weekComments.isFailed"
					:option="weekComments.option"
				/>
			</custom-count-card>
		</a-col>
	</a-row>
</template>

<script>
	import CustomCountCard from './CountCard.vue';
	import CustomCharts from '@/components/charts';
	import { SIMPLE_AREA_LINE_OPTION } from '@/utils/charts';
	import { deepClone } from '@/utils';
	export default {
		name: 'Statistics',
		components: {
			CustomCountCard,
			CustomCharts
		},

		data() {
			return {
				// 统计
				stasticsCount: {
					totalResources: 0,
					totalDownload: [0, 0],
					totalLikes: [0, 0],
					totalComments: [0, 0]
				},
				weekDownload: {
					loading: false,
					isNoData: false,
					isFailed: false,
					option: deepClone({
						...SIMPLE_AREA_LINE_OPTION,
						tooltip: {
							...SIMPLE_AREA_LINE_OPTION.tooltip,
							position: function(point, params, dom, rect, size) {
								return [point[0], point[1] + 20]
							}
						}
					})
				},
				weekLikes: {
					loading: false,
					isNoData: false,
					isFailed: false,
					option: deepClone({
						...SIMPLE_AREA_LINE_OPTION,
						tooltip: {
							...SIMPLE_AREA_LINE_OPTION.tooltip,
							position: function(point, params, dom, rect, size) {
								return [point[0], point[1] + 20]
							}
						}
					})
				},
				weekComments: {
					loading: false,
					isNoData: false,
					isFailed: false,
					option: deepClone({
						...SIMPLE_AREA_LINE_OPTION,
						tooltip: {
							...SIMPLE_AREA_LINE_OPTION.tooltip,
							position: function(point, params, dom, rect, size) {
								return [point[0], point[1] + 20]
							}
						}
					})
				}
			}
		},

		mounted() {
			this.getTotalStatistic()
		},

		methods: {
			// 仪表盘
			getTotalStatistic() {
				this.weekDownload.loading = true;
				this.weekLikes.loading = true;
				this.weekComments.loading = true;

				let token = this.$store.getters.token;
				this.$api.dashboard.totalStatistic({ token }).then(res => {
					this.weekDownload.isFailed = false;
					this.weekLikes.isFailed = false;
					this.weekComments.isFailed = false;
					if (res.code == '200') {
						const resData = res.data;
						// console.log(resData, '资源总数');
						// 统计总数
						this.$set(this.stasticsCount, 'totalResources', resData.totalResources || 0);
						this.$set(this.stasticsCount.totalDownload, 0, resData.weekDownload.slice(-1)[0].value || 0);
						this.$set(this.stasticsCount.totalLikes, 0, resData.weekLikes.slice(-1)[0].value || 0);
						this.$set(this.stasticsCount.totalComments, 0, resData.weekComments.slice(-1)[0].value || 0);

						this.$set(this.stasticsCount.totalDownload, 1, resData.weekDownload.slice(-2, -1)[0].value || 0);
						this.$set(this.stasticsCount.totalLikes, 1, resData.weekLikes.slice(-2, -1)[0].value || 0);
						this.$set(this.stasticsCount.totalComments, 1, resData.weekComments.slice(-2, -1)[0].value || 0);

						// 图例
						this.weekDownload.isNoData = false;
						this.weekLikes.isNoData = false;
						this.weekComments.isNoData = false;
						this.weekDownload.option.series[0].data = resData.weekDownload;
						this.weekDownload.option.xAxis.data = resData.weekDownload.map(item => item.name);
						this.weekLikes.option.series[0].data = resData.weekLikes;
						this.weekLikes.option.xAxis.data = resData.weekLikes.map(item => item.name);
						this.weekComments.option.series[0].data = resData.weekComments;
						this.weekComments.option.xAxis.data = resData.weekComments.map(item => item.name);
					} else {
						this.weekDownload.isNoData = true;
						this.weekLikes.isNoData = true;
						this.weekComments.isNoData = true;
						this.weekDownload.option.series[0].data = [];
						this.weekLikes.option.series[0].data = [];
						this.weekComments.option.series[0].data = [];
					}
				}).catch(_ => {
					this.weekDownload.isFailed = true;
					this.weekLikes.isFailed = true;
					this.weekComments.isFailed = true;
					this.weekDownload.isNoData = false;
					this.weekLikes.isNoData = false;
					this.weekComments.isNoData = false;
					this.weekDownload.option.series[0].data = [];
					this.weekLikes.option.series[0].data = [];
					this.weekComments.option.series[0].data = [];
				}).finally(_ => {
					this.weekDownload.loading = false;
					this.weekLikes.loading = false;
					this.weekComments.loading = false;
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dashboard-count {
		position: relative;
		height: 96px;
	}
</style>
