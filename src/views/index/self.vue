<template>
    <div>
		<div>a: {{a}}</div>
		<div>b: {{b}}</div>
		<a-button type="primary" @click="getResult">{{`二次弹层`}}</a-button>
    </div>
</template>
<script>
import Sortable from "@/utils/sortable";
export default {
    name: 'self',
    props: {
        a: {
            type: Number,
            default: 0
        },
        b: {
            type: Number,
            default: 0
        }
    },
	mounted() {},
    data() {
        return {
            btn: '求和',
			instance: null,
        }
    },
    methods: {
        getResult() {
			this.instance = this.$drawer({
				title: '2级',
				content: () => (
					<div class="second-wrapper" title={this.btn}>
						<a-button type="primary" onClick={this.secondClick}>{this.btn}</a-button>
					</div>
				)
			})
        },
		secondClick() {
			let res = this.a + this.b;
			this.$emit('cb', res);
			this.instance.close();
		}
    }
}
</script>
