<template>
	<svg :class="svgClass" aria-hidden="true" v-on="$listeners">
		<use :xlink:href="iconName" :fill="iconColor" />
	</svg>
</template>

<script>
	/**
	 * <svg-icon icon-class="set"></svg-icon>
	 */
	export default {
		name: 'CustomSvgIcon',
		props: {
			iconClass: {
				type: String,
				required: true
			},
			className: {
				type: String,
				default: ''
			},
			iconColor: {
				type: String,
				default: ''
			}
		},
		computed: {
			iconName() {
				return `#icon-${this.iconClass}`; //跟svg-sprite-loader 生成的symbolId相对应上
			},
			svgClass() {
				if (this.className) {
					return 'custom-svg-icon ' + this.className; //自定义样式
				} else {
					return 'custom-svg-icon'; //默认样式
				}
			}
		}
	}
</script>

<style scoped>
	.custom-svg-icon {
		width: 1em;
		height: 1em;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
	}
</style>
