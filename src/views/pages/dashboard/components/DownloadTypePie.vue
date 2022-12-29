<template>
	<a-row>
		<a-col :span="24">
			<custom-common-card :title="'下载类型'" :subTitle="''">
				<custom-charts 
					:height="200"
					:option="typeRatio.option" 
					:loading="typeRatio.loading"
					:isNoData="typeRatio.isNoData" 
					:isFailed="typeRatio.isFailed"
				/>
			</custom-common-card>
		</a-col>
	</a-row>
</template>

<script>
	import CustomCommonCard from './CommonCard';
	import CustomCharts from '@/components/charts';
	import { BASIC_PIE_OPTION } from '@/utils/charts';

	export default {
		name: 'DownloadTypePie',
		components: {
			CustomCommonCard,
			CustomCharts
		},

		data() {
			return {
				// 资源类型
				typeRatio: {
					loading: false,
					isNoData: false,
					isFailed: false,
					option: {
						...BASIC_PIE_OPTION
					}
				},
				downloadType: [
					{
						type: 1,
						name: '类型1'
					},
					{
						type: 2,
						name: '类型2'
					},
					{
						type: 3,
						name: '类型3'
					}
				]
			}
		},

		mounted() {
			this.getResourceTypeRatio()
		},

		methods: {
			// 下载类型统计
			getResourceTypeRatio() {
				this.typeRatio.loading = true;
				
				let token = this.$store.getters.token;
				this.$api.dashboard.resourceTypeRatio({ token }).then(res => {
					this.typeRatio.isFailed = false;
					
					if (res.code == '200') {
						this.typeRatio.isNoData = false;
						this.typeRatio.option.series[0].data = res.data.map(item => {
							const typeItem = this.downloadType.find(dt => dt.type == item.type);
							return {
								name: typeItem.name,
								value: item.value,
							}
						});
					} else {
						this.typeRatio.isNoData = true;
						this.typeRatio.option.series[0].data = [];
					}
				}).catch(_ => {
					this.typeRatio.isFailed = true;
					this.typeRatio.isNoData = false;
					this.typeRatio.option.series[0].data = [];
				}).finally(_ => {
					this.typeRatio.loading = false;
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>