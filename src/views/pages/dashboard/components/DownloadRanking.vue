<template>
	<a-row>
		<a-col :span="24">
			<custom-common-card :title="'排行榜'">
				<a-list :loading="downloadRanking.loading" :data-source="downloadRanking.list">
					<div slot="renderItem" slot-scope="item, index" :key="item.id" class="dashboard-ranking__item">
						<span class="dashboard-ranking__index">{{ index + 1}}</span>
						<span class="dashboard-ranking__name">{{ item.name }}</span>
						<span class="dashboard-ranking__count">{{ item.count | toThousand }}</span>
					</div>
				</a-list>
			</custom-common-card>
		</a-col>
	</a-row>
</template>

<script>
	import CustomCommonCard from './CommonCard';
	import { toThousand } from '@/utils';

	export default {
		name: 'DownloadRanking',
		components: {
			CustomCommonCard
		},

		data() {
			return {
				// 下载排行
				downloadRanking: {
					list: [],
					loading: false
				}
			}
		},
		
		filters: { toThousand },

		mounted() {
			this.getDownloadRanking();
		},

		methods: {
			// 下载排行
			getDownloadRanking() {
				this.downloadRanking.loading = true;
				
				let token = this.$store.getters.token;
				this.$api.dashboard.downloadRanking({ token }).then(res => {
					if (res.code == '200') {
						this.downloadRanking.list = res.data;
					}
				}).finally(_ => {
					this.downloadRanking.loading = false;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dashboard-ranking__item {
		display: flex;
		justify-content: center;
		align-items: center;
		
		position: relative;
		padding: 8px 0;
	
		.dashboard-ranking__index {
			flex-shrink: 0;
			
			width: 24px;
			height: 24px;
			line-height: 24px;
			text-align: center;
			font-size: 12px;
			color: #fff;
			border-radius: 12px;
			background-color: rgba(#aaa, .7);
		}
	
		&:nth-child(1),
		&:nth-child(2),
		&:nth-child(3) {
			.dashboard-ranking__index {
				background-color: $primary-color;
			}
		}
	
		.dashboard-ranking__name {
			flex: 1;
			
			padding: 0 8px;
			font-size: 12px;
			color: $Color__text;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	
		.dashboard-ranking__count {
			flex-shrink: 0;
			
			font-size: 12px;
			color: $Color__text;
		}
	
		@media screen and (min-width: 1440px) {
			.dashboard-ranking__index {
				font-size: 15px;
				width: 24px;
				height: 24px;
				border-radius: 12px;
				line-height: 24px;
			}
	
			.dashboard-ranking__name {
				font-size: 14px;
			}
	
			.dashboard-ranking__count {
				font-size: 14px;
			}
		}
	}
</style>