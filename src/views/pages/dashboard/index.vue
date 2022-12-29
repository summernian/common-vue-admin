<template>
	<div class="dashboard-wrapper">
		<a-page-header :breadcrumb="{ props: { routes } }"/>
		<a-row :gutter="16" class="dashboard-container">
			<!-- left -->
			<a-col :span="18">
				<!-- count stastics -->
				<statistics-count />
				<!-- resource type stastics -->
				<resource-type-bar></resource-type-bar>
				<!-- download trend -->
				<download-trend-line></download-trend-line>
			</a-col>
			<!-- right -->
			<a-col :span="6">
				<!-- type ratio -->
				<download-type-pie />
				<!-- download ranking -->
				<download-ranking></download-ranking>
			</a-col>
		</a-row>
	</div>
</template>

<script>
	import StatisticsCount from './components/StatisticsCount.vue';
	import DownloadTypePie from './components/DownloadTypePie';
	import DownloadRanking from './components/DownloadRanking';
	import ResourceTypeBar from './components/ResourceTypeBar';
	import DownloadTrendLine from './components/DownloadTrendLine';

	export default {
		name: 'Dashboard',
		components: {
			DownloadTrendLine,
			ResourceTypeBar,
			DownloadRanking,
			DownloadTypePie,
			StatisticsCount
		},
		provide() {
			return {
				parent: this
			}
		},
		data() {
			return {
				routes: [{
					path: '/dashboard',
					breadcrumbName: 'dashboard'
				}]
			}
		}
	}
</script>
<style lang="scss" scoped>
	.dashboard-wrapper {
		.dashboard-container {
			margin-bottom: 20px;
		}
	}
</style>