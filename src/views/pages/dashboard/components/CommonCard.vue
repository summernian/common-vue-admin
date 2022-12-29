<template>
	<div class="common-card">
		<div class="common-card__header" v-if="title || $slots.title">
			<div class="common-card__title">
				<slot name="title">{{ title }}</slot>
			</div>
			<div class="common-card__extra" v-if="$slots.extra">
				<slot name="extra"></slot>
			</div>
		</div>
		<div class="common-card__body">
			<div v-if="subTitle || $slots.subTitle" class="common-card__subTitle">
				<slot name="subTitle">{{ subTitle }}</slot>
			</div>
			<div class="common-card__content">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'CommonCard',
		props: {
			title: String,
			subTitle: String
		}
	}
</script>

<style lang="scss" scoped>
	.common-card {
		position: relative;
		background-color: #fff;
		padding: 12px 16px;
		width: 100%;
		
		.common-card__header {
			margin-bottom: 12px;

			display: flex;
			align-items: center;
			
			.common-card__title {
				flex-grow: 1;
				
				font-size: 16px;
				color: $Color__title;
			}

			.common-card__extra {
				flex-shrink: 0;
				
				font-size: 14px;
				color: $Color__auxiliary-text;
			}
		}

		.common-card__body {
			width: 100%;
			
			.common-card__subTitle {
				color: $Color__title;
				font-size: 14px;
				margin-bottom: 8px;
			}

			.common-card__content {
				position: relative;
				width: 100%;
			}
		}
	}
</style>
