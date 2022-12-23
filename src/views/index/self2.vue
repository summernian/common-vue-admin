<template>
    <div>
        <div>a: {{a}}</div>
        <div>b: {{b}}</div>
        <a-button type="primary" @click="secondClick">{{`二次弹层`}}</a-button>
    </div>
</template>
<script>
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
    data() {
        return {
            btn: '求积',
			instance: null
        }
    },
    methods: {
        getResult() {
            let res = this.a * this.b;
			this.$confirm({
				title: `嘿嘿，第三级弹层！`,
				content: () => (
					<div class="third-wrapper">
						<h4 style="font-weight: 600">当前的值是:</h4>
						<p style="color: #eb6120">{res}</p>
						<span style="color: #999;font-size: 80%;">是否传出去？</span>
					</div>
				),
				onCancel: () => {
					this.$message.info('好吧，你取消了。')
				},
				onOk: () => {
					this.$emit('suiBianJiaoSha', res);
					this.instance.close();
				}
			})
        },
		secondClick() {
			this.instance = this.$modal({
				title: '2级',
				footer: null,
				content: () => (
					<div class="second-wrapper" title={this.btn}>
						<a-button type="primary" onClick={this.getResult}>{this.btn}</a-button>
					</div>	
				)
			})
		}
    }
}
</script>