<template>
	<div>
		<div>开关:</div>
		<div>{{ isOpen ? '开' : '关'}}</div>
		<a-button type="primary" @click="change">{{btn}}</a-button>
	</div>
</template>
<script>
	export default {
		name: 'self',
		props: {
			isOpen: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				btn: '变换'
			}
		},
		methods: {
			change() {
				this.$emit('update:isOpen', !this.isOpen)
			}
		}
	}
</script>
