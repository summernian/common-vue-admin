<template>
	<a-row>
		<a-col :span="24">
			<custom-common-card :title="'走线趋势'">
				<custom-charts 
					:height="downloadTrend.height" 
					:loading="downloadTrend.loading"
					:isNoData="downloadTrend.isNoData" 
					:isFailed="downloadTrend.isFailed"
					:option="downloadTrend.option"
				/>
			</custom-common-card>
		</a-col>
	</a-row>
</template>

<script>
	import CustomCommonCard from './CommonCard';
	import CustomCharts from '@/components/charts';
	import { CHART_COLORS, BASIC_LINE_OPTION } from '@/utils/charts';

	export default {
		name: 'DownloadTrendLine',
		components: {
			CustomCommonCard,
			CustomCharts
		},

		data() {
			return {
				// 下载趋势
				downloadTrend: {
					height: 320,
					loading: false,
					isNoData: false,
					isFailed: false,
					option: {
						...BASIC_LINE_OPTION,
						color: [CHART_COLORS[0], CHART_COLORS[1]],
						toolbox: {
							show: true,
							right: 0,
							top: 0,
							feature: {
								saveAsImage: {
									show: true
								}
							}
						}
					}
				}
			}
		},

		mounted() {
			this.getDownloadTrend();
		},

		methods: {
			// 下载趋势
			getDownloadTrend() {
				this.downloadTrend.loading = true;
				
				let token = this.$store.getters.token;
				this.$api.dashboard.downloadTrend({ token }).then(res => {
					this.downloadTrend.isFailed = false
					if (res.code == '200') {
						this.downloadTrend.isNoData = false;
						this.downloadTrend.option.xAxis.data = res.data.map(item => item.name);
						this.downloadTrend.option.series[0].data = res.data.map(item => item.value);
					} else {
						this.downloadTrend.isNoData = true;
						this.downloadTrend.option.series[0].data = [];
					}
				}).catch(_ => {
					this.downloadTrend.isFailed = true;
					this.downloadTrend.isNoData = false;
					this.downloadTrend.option.series[0].data = [];
				}).finally(_ => {
					this.downloadTrend.loading = false;
				});
			}
		}
	}
</script>
