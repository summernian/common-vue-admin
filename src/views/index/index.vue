<template>
	<div class="index-container">
		<a-button @click="drawer">drawer test</a-button>
		<a-button @click="confirm">confirm test</a-button>
		<a-button @click="modal">modal test</a-button>

		<hr class="mt40 mb40" />

		<a-input @keyup.native="isFloor" placeholder="限制输入数字、负数、小数点后2位" :maxLength="10" style="width: 300px"
			v-model="number">
			<span slot="suffix" style="color: #bbbdc7">{{ number ? number.length : 0 }} / 10</span>
		</a-input>

		<hr class="mt40 mb40" />

		<a-date-picker v-model="startValue" :disabled-date="disabledStartDate" format="YYYY-MM-DD" placeholder="开始日期"
			style="width: 160px" @change="handleStartChange" />
		<span class="dv" style="width: 36px; text-align: center; color: #c2c2c2">
			—
		</span>
		<a-date-picker v-model="endValue" :disabled-date="disabledEndDate" format="YYYY-MM-DD" placeholder="结束日期"
			style="width: 160px" @change="handleEndChange" />
		<p class="tip mt20">1、禁止选今天之前的时间;2、选了结束时间后,开始时间禁止超过结束时间;</p>
		<p class="tip">此处为插件自带的禁止效果,限制用户选择。一般情况下是不限制用户选择, 选择完成后在回调函数中做判断</p>
		<p class="tip">二者取其一, 看需求</p>

		<!-- 路由展示内容 -->
		<router-view />
	</div>
</template>
<script>
	import test1 from "./self"
	import test2 from "./self2"
	export default {
		name: 'homePage',
		data() {
			return {
				number: '',
				startValue: '',
				endValue: '',
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
						return h(test1, {
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
									h("span", {
										class: "danger-color"
									}, 2),
									h("span", null, " 条，请下载错误数据修改后上传"),
								];
							},
							content: () => ( < div style = "font-size: 28px;" > test： < span style = "color: #00BEBE;" >
								info1， < /span>info2<span style="color: #00BEBE;"> info3，</span > info4 < /div>),
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
									test2, {
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
					},

					// 限制
					isFloor(e) {
						let obj = event.target;
						let t = obj.value.charAt(0);
						obj.value = obj.value.replace(".", "$#$") //把第一个字符'.'替换成'$#$'
							.replace(/\./g, "") //把其余的字符'.'替换为空
							.replace("$#$", ".") //把字符'$#$'替换回原来的'.'
							.replace(/[^\d.]/g, "") //只能输入数字和'.'
							.replace(/^\./g, "") //不能以'.'开头
							.replace(/([0-9]+\.[0-9]{2})[0-9]*/, "$1") //只保留2位小数   
						if (t == '-') {
							obj.value = '-' + obj.value;
						}

						// 赋值给绑定的data
						this.number = obj.value;
					},

					// 时间可选范围
					disabledStartDate(current) {
						if (this.endValue) {
							return (
								(current < this.$moment().subtract(1, "days")) ||
								(current > this.$moment(this.endValue).endOf("day"))
							);
						} else {
							return (current && current < this.$moment().subtract(1, "days"));
						}
					},
					disabledEndDate(current) {
						if (this.startValue) {
							return (
								current < this.$moment(this.startValue).endOf("day").subtract(1, "days")
							);
						} else {
							return (current && current < this.$moment().subtract(1, "days"));
						}
					},

					handleStartChange(val, str) {
						console.log(str);
					},
					handleEndChange(val, str) {
						console.log(str);
					},
			}
		};
</script>
<style lang="scss" scoped>
	::v-deep.index-container {
		padding: 12px;
		background: #f5f6f7;
	}
</style>
