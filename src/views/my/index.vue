<template>
	<div class="">		
		<a-button type="primary" @click="showFormModel('add')">添加弹层</a-button>
		<a-button type="primary" @click="showFormModel('edit')">编辑弹层</a-button>
		
		<div class="mt30">	
			数据内容:
			<div :class="!index ? 'mt20' : ''" v-for="(item, index) in formData" :key="index">
				<p v-for="(v, i) in Object.keys(item)">{{`${i} : ${v} - ${item[v]}`}}</p>
			</div>
		</div>
		
		<router-view />
	</div>
</template>
<script>
	import dynamicForm from '@/components/form';
	import { validateName, validateInteger } from '@/utils/validate';
	export default {
		name: 'my',
		data() {
			const that = this;
			return {
				dataSource: [
					{
						label: '用户名', // label文字
						prop: 'UserName', // 字段名
						type: 'input', // 指定antd组件
						defaultValue: '', // 字段初始值
						placeholder: '请输入用户名', // antd组件属性
						rules: [
							{ required: true, message: '请输入用户名', trigger: 'blur' },
							{ validator: validateName, trigger: 'blur' }
						],
					},
					{
						label: "年龄", // label文字
						prop: "Age", // 字段名
						type: "number", // 指定antd组件
						defaultValue: '', // 字段初始值
						placeholder: "请输入年龄", // antd组件属性
						rules: [
							{ required: true, message: '请输入年龄', trigger: 'blur' },
							{ type: 'integer', min: 1, max: 150, message: '请输入正确的年龄(1-150)', trigger: 'blur' },
						]
					},
					{
						label: "性别", // label文字
						prop: "Sex", // 字段名
						type: "select", // 指定antd组件
						defaultValue: "", // 字段初始值
						placeholder: "请选择性别", // antd组件属性
						options: [
							{
								label: "男 ♂",
								value: "1",
							},
							{
								label: "女 ♀",
								value: "2",
							},
							{
								label: "●﹏●",
								value: "3",
							},
						],
						rules: [
							{ required: true, message: '请选择性别', trigger: 'change' },
						]
					},
					{
						label: "出生年月", // label文字
						prop: "Birthday", // 字段名
						type: "date-picker", // 指定antd组件
						defaultValue: '', // 字段初始值
						placeholder: "请选择", // antd组件属性
						rules: [
							{ required: true, message: '请选择日期', trigger: 'change' },
						]
					},
					{
						label: "工作年限", // label文字
						prop: "Date", // 字段名
						type: "range-picker", // 指定antd组件
						defaultValue: '', // 字段初始值
						placeholder: "请选择", // antd组件属性
						rules: [
							{ required: true, message: '请选择日期', trigger: 'change' },
						]
					},
					{
						label: "是否中二", // label文字
						prop: "SillyB", // 字段名
						type: "switch", // 指定antd组件
						defaultValue: false, // 字段初始值
						className: 'single-line', // 一行显示
						rules: [
							{ required: true, message: '请说明你的中二情况', trigger: 'change' },
						]
					},
					{
						label: "爱好", // label文字
						prop: "Hobby", // 字段名
						type: "checkbox", // 指定antd组件
						defaultValue: [], // 字段初始值
						options: [
							{
								label: "男 ♂",
								value: "1",
							},
							{
								label: "女 ♀",
								value: "2",
							},
							{
								label: "●﹏●",
								value: "3",
							},
						],
						rules: [
							{ required: true, message: '请选择爱好', trigger: 'change' },
						],
						className: 'single-line', // 一行显示
					},
					{
						label: "婚姻状况", // label文字
						prop: "MarriageStatus", // 字段名
						type: "radio", // 指定antd组件
						defaultValue: [], // 字段初始值
						options: [
							{
								label: "single",
								value: "1",
							},
							{
								label: "married",
								value: "2",
							},
							{
								label: "divorce",
								value: "3",
							},
						],
						rules: [
							{ required: true, message: '请选择婚姻状况', trigger: 'change' },
						],
						className: 'single-line', // 一行显示
					},
					{
						label: "个人描述", // label文字
						prop: "Description", // 字段名
						type: "textarea", // 指定antd组件
						defaultValue: '', // 字段初始值
						placeholder: "请填写个人描述", // antd组件属性
						rules: [
							{ required: true, message: '请填写个人描述', trigger: 'blur' },
						],
						// antd - textare 专有属性
						autoSize: { minRows: 3, maxRows: 6 }
					},
				],
				formData: [
					{
						Age: 17,
						Birthday: "2022-12-06",
						Date: ['2022-12-08', '2023-01-05'],
						Description: "我想不论是谁, 看到此情此景都会忍不住加入到他们之中.",
						Hobby: ['2', '3'],
						MarriageStatus: "2",
						Sex: "2",
						SillyB: true,
						UserName: "测试",
					},
				],
			};
		},
		computed: {},
		methods: {
			showFormModel(type) {
				let { dataSource, formData } = this;
				
				if(type === 'add') {
					dataSource.map((item, index) => {
						switch (item.prop){
							case 'SillyB':
								item.defaultValue = false;
								break;
							default:
								break;
						}
						return { ...item }
					});
				} else {	
					// 假设回显第0条数据
					let items = formData[0];
					Object.keys(items).forEach((v, i) => {
						dataSource.map((item, index) => {
							if(item.prop === v) {
								item.defaultValue = items[v];
							}
							return { ...item }
						});
					});
				}
	
				const instance = this.$modal({
					title: type == 'add' ? '添加' : '编辑',
					width: 780,
					footer: null,
					content: (h) => {
						return h(dynamicForm, {
								props: {
									// height: '400px',
									dataSource,
								},
								on: {
									onSubmit(res) {
										console.log('submit!', {...res});
									},
									onCancel(res) {
										console.log('close!', res);
										instance.close();
									}
								}
							},
						);
					},
				});
			}
		}
	};
</script>
<style lang="scss" scoped>

</style>
