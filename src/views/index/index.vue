<template>
	<div class="index-container">
		<a-button @click="drawer">drawer test</a-button>
		<a-button @click="confirm">confirm test</a-button>
		<a-button @click="modal">modal test</a-button>
		<router-view />
	</div>
</template>
<script>
	import test1 from "./self"
	import test2 from "./self2"
	export default {
		name: 'index',
		data() {
			return {
				
			};
		},
		mounted() {
			
		},
		methods: {
			drawer() {
				let _this = this;
				let instance = this.$drawer({
					title: 'test',
					content: h => {
						return h(test1,{
							props: {
								a: 1,
								b: 20
							},
							on: {
								cb(res) {
									_this.$message.info(`值是：${res},提示结束时自动关闭。（ps: 亦可手动关闭）`, () => {
										instance.close();
									});
								}
							}
						})
					},
					beforeClose(res) {
						console.log(res);
					}
				})
			},
			confirm() {
				let okText = 'ok-btn';
				let cancelText = 'cancel-btn';
				this.$confirm({
					// title、content可直接用字符串
					title: (h) => {
						return [
							h("span", null, "错误数据 "),
							h("span", { class: "danger-color" }, 2),
							h("span", null, " 条，请下载错误数据修改后上传"),
						];
					},
					content: () => (<div style="font-size: 28px;">test：<span style="color: #00BEBE;">info1，</span>info2<span style="color: #00BEBE;"> info3，</span>info4</div>),
					okText,
					onOk: async () => {
						console.log(`你点了${okText}`);
					},
					cancelText,
					cancelButtonProps: {
						props: {
							type: 'danger', // 修改按钮模式 dafault danger primary dashed link
						},
						attrs: {
							// hidden: true, // 不显示
							// disabled: true, // 禁用
							ghost: true
						},
						style: {
							// background: 'pink'
						},
					},
					okType: "dashed",
					// closable: true,
					onCancel: () => {
						console.log(`你点了${cancelText}`);
					},
					icon: h => {
						return h("a-icon", {
							props: {
								type: "exclamation-circle",
								theme: "filled" // 主题
							},
							style: {
								color: '#f00' //修改图标样式
							}
						})
					}, // 种类1
					// icon: 'exclamation-circle', // 种类2
				})
			},
			modal() {
				let _this = this;
				const instance = this.$modal({
					title: "modal title",
					wrapClassName: "xxxx",
					okText: "ok-btn",
					cancelText: "cancel-btn",
					cancelType: "danger",
					okType: 'danger',
					

					closable: false,
        			// footer: null,
					onOk: () => {
						instance.close();
					},

					content: (h) => {
						return h(
							test2, 
							{
								props: {
									a: 4,
									b: 5
								},
								on: {
									suiBianJiaoSha(res) {
										_this.$message.info(`值是：${res}`);
										instance.close();
									}
								}
							},
							null
						);
					},
				});
			}
		}
	};
</script>
<style lang="scss" scoped>
	.index-container {
		padding: 12px;
		background: #f5f6f7;
	}
</style>
