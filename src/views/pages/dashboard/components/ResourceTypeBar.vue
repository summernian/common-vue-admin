<template>
	<a-row>
		<a-col :span="24">
			<custom-common-card :title="'类型统计'">
				<custom-charts 
					:height="typeStastics.height" 
					:loading="typeStastics.loading"
					:isNoData="typeStastics.isNoData" 
					:isFailed="typeStastics.isFailed" 
					:option="typeStastics.option"
				/>
			</custom-common-card>
		</a-col>
	</a-row>
</template>

<script>
	import CustomCommonCard from './CommonCard';
	import CustomCharts from '@/components/charts';
	import { CHART_COLORS, BASIC_BAR_OPTION } from '@/utils/charts';

	export default {
		name: 'ResourceTypeBar',
		components: {
			CustomCommonCard,
			CustomCharts
		},

		data() {
			return {
				// 类型统计
				typeStastics: {
					height: 320,
					loading: false,
					isNoData: false,
					isFailed: false,
					option: {
						...BASIC_BAR_OPTION,
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
				},
			}
		},

		mounted() {
			this.getTypeStastics()
		},

		methods: {
			// 标签统计
			getTypeStastics() {
				this.typeStastics.loading = true;
				
				let token = this.$store.getters.token;
				this.$api.dashboard.typeStastics({ token }).then(res => {
					this.typeStastics.isFailed = false;
					if (res.code == '200') {
						this.typeStastics.isNoData = false;
						this.typeStastics.option.xAxis.data = res.data.map(item => item.name);
						this.typeStastics.option.series[0].data = res.data.map(item => item.value);
					} else {
						this.typeStastics.isNoData = true;
						this.typeStastics.option.series[0].data = [];
					}
				}).catch(_ => {
					this.typeStastics.isFailed = true;
					this.typeStastics.isNoData = false;
					this.typeStastics.option.series[0].data = [];
				}).finally(_ => {
					this.typeStastics.loading = false;
				});
			}
		}
	}
</script>
