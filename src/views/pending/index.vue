<template>
	<div class="all-container">
		<h4>动态搜索表单：</h4>
		<CustomSearchForm 
			:dataSource="searchOpts" 
			:globParams="globParams"
			@onSearch="onSearch"
		/>
		<router-view />
	</div>
</template>

<script>
	import CustomSearchForm from '@/components/form/dynamicSearch'
	export default {
		name: 'pending',
		components: {
			CustomSearchForm
		},
		data() {
			const token = this.$store.getters.token;
			return {
				searchOpts: [
					{
						label: "用户名很长的呀", // label文字
						prop: "username", // 字段名
						type: "input", // 指定antd组件
						defaultValue: "", // 字段初始值
						placeholder: "请输入用户名", // antd组件属性
						events: {
							// antd组件方法
							input(val) {
								console.log(val);
							},
						},
					},
					{
						label: "年龄", // label文字
						prop: "age", // 字段名
						type: "number", // 指定antd组件
						defaultValue: '', // 字段初始值
						placeholder: "请输入年龄", // antd组件属性
						events: {
							// antd组件方法
							input(val) {
								console.log(val);
							},
						},
					},
					{
						label: "性别", // label文字
						prop: "sex", // 字段名
						type: "select", // 指定antd组件
						defaultValue: "", // 字段初始值
						placeholder: "请选择性别", // antd组件属性
						options: [
							{
								label: "男",
								value: "1",
							},
							{
								label: "女",
								value: "2",
							},
						],
						events: {
							// antd组件方法
							change(val) {
								console.log(val);
							},
						},
					},
					{
						label: "下拉框", // label文字
						prop: "address", // 字段名
						type: "select", // 指定antd组件
						defaultValue: "", // 字段初始值
						placeholder: "请选择city", // antd组件属性
						options: [],
						url: 'http://rap2api.taobao.org/app/mock/270426/city',
						method: 'get',
						dicParamsList: [
							{
								key: 'token'
							},
							{
								key: 'bussinessId',
								value: '324'
							}
						],
						events: {
							// antd组件方法
							change(val) {
								console.log(val);
							},
						},
					},
					{
						label: "项目地址", // label文字
						prop: "project", // 字段名
						type: "cascader", // 指定antd组件
						defaultValue: [], // 字段初始值
						placeholder: "请选择project", // antd组件属性
						options: [],
						url: 'http://rap2api.taobao.org/app/mock/270426/getCascaderList',
						method: 'get',
						dicParamsList: [
							{
								key: 'token'
							},
							{
								key: 'bussinessId',
								value: '324'
							}
						],
						events: {
							// antd组件方法
							change(val) {
								console.log(val);
							},
						},
					},
					{
						label: "到货日期", // label文字
						prop: "arrialDate", // 字段名
						type: "range-picker", // 指定antd组件
						defaultValue: '', // 字段初始值
						placeholder: "请选择", // antd组件属性
						events: {
							// antd组件方法
							change(val) {
								console.log(val);
							},
						},
					},
					{
						label: "发货日期", // label文字
						prop: "delieverDate", // 字段名
						type: "date-picker", // 指定antd组件
						defaultValue: '', // 字段初始值
						placeholder: "请选择", // antd组件属性
						events: {
							// antd组件方法
							change(val) {
								console.log(val);
							},
						},
					},
				],
				globParams: {
					token,
				}
			};
		},
		computed: {

		},
		methods: {
			onSearch(formData) {
				console.log({...formData}, 'formData');
				
				this.$confirm({
					title: '搜索参数',
					content: (
						<div class="search-inner-wrapper">
						{
							Object.keys(formData).map(v => {
								return <p>Key: {v} - Value: { formData[v] ? formData[v] : 'null' }</p>
							})
						}
						</div>
					),
					cancelButtonProps: { 
						attrs: {
							hidden: true, // 不显示
							// disabled: true, // 禁用
							// ghost: true
						},
					}, // 隐藏取消按钮
					// icon: 'form', // antd图标库的type
					icon: h => {
						return h("a-icon", {
							props: {
								type: "form",
							},
							style: {
								color: '#007aff' //修改图标样式
							}
						})
					}, // 种类1
				})
			}
		}
	};
</script>
<style lang="scss" scoped>

</style>
