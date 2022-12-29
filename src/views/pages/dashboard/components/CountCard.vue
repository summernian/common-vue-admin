<template>
	<div :class="['count-card', `is-align-${align}`]">
		<div v-if="!large && $slots.left" class="count-card__left">
			<slot name="left"></slot>
		</div>
		<div :class="['count-card__content', large && 'is-large']">
			<div class="count-card__title">
				<slot name="title"><span v-title="title">{{ title }}</span></slot>
			</div>
			<div class="count-card__value">
				<span v-if="thousand" v-title="value + unit">{{ value | toThousand }}</span>
				<span v-else v-title="value + unit">{{ value }}</span>
				<span class="count-card__unit" v-if="unit">{{ unit }}</span>
			</div>
			<div v-if="trend || $slots.extra" class="count-card__extra">
				<slot name="extra">
					<div :class="{'is-trend-up': trendUp, 'is-trend-down': !trendUp}">
						<a-icon v-if="trendUp" type="caret-up" />
						<a-icon v-else type="caret-down" />
						<span>{{ trend | toPercentage }}</span>
					</div>
				</slot>
			</div>
		</div>
	</div>
</template>

<script>
	import { toThousand, toPercentage } from '@/utils';
	export default {
		name: 'CountCard',
		props: {
			title: String,
			value: {
				type: Number,
				required: true
			},
			trend: [Number, Array],
			unit: {
				type: String,
				default: ''
			},
			thousand: {
				type: Boolean,
				default: true
			},
			large: {
				type: Boolean,
				default: false
			},
			align: {
				type: String,
				default: 'middle',
				validator: (val) => (['top', 'middle', 'bottom'].indexOf(val) !== -1)
			}
		},

		computed: {
			trendUp() {
				return (typeof this.trend === 'number' && this.trend > 0) || (Array.isArray(this.trend) && (this.trend[0] > this.trend[1]));
			},

			showTrendPercent() {
				return Array.isArray(this.trend) && this.trend[0] && this.trend[1];
			}
		},

		filters: {
			toThousand,
			toPercentage(value) {
				if (typeof value === 'number') return toPercentage(Math.abs(value))
				if (!value[0] || !value[1]) return '0%'
				const diff = value[0] - value[1]
				return toPercentage(Math.abs(diff / value[0]))
			}
		}
	}
</script>
<style lang="scss" scoped>
	.count-card {
		position: relative;
		width: 100%;
		background-color: #fff;
		padding: 8px 12px;

		display: flex;

		&.is-align-top {
			align-items: flex-start;
		}

		&.is-align-middle {
			align-items: center;
		}

		&.is-align-bottom {
			align-items: flex-end;
		}

		.count-card__left {
			flex-shrink: 0;

			margin-right: 4px;
			width: 70px;
			min-height: 70px;
		}

		.count-card__content {
			flex-grow: 1;
			overflow: hidden;

			&.is-large {
				text-align: center;

				.count-card__title {
					font-size: 14px;
				}

				.count-card__value {
					font-size: 22px;

					.count-card__unit {
						font-size: 14px;
					}
				}
			}

			.count-card__title {
				font-size: 12px;
				color: $Color__auxiliary-text;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.count-card__value {
				font-size: 18px;
				color: $Color__title;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;

				.count-card__unit {
					font-size: 12px;
					margin-left: 4px;
					color: $Color__auxiliary-text;
				}
			}

			.count-card__extra {
				font-size: 13px;
				color: $Color__text;

				.is-trend-up {
					color: $error-color;
				}

				.is-trend-down {
					color: $success-color;
				}
			}
		}
	}
</style>
