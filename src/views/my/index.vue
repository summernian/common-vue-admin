<template>
	<div class="">		
		<a-button type="primary" @click="showFormModel('add')">添加弹层</a-button>
		<a-button type="primary" @click="showFormModel('edit')">编辑弹层</a-button>
		
		<!-- <div class="mt30">	
			数据内容:
			<div :class="!index ? 'mt20' : ''" v-for="(item, index) in formData" :key="index">
				<p v-for="(v, i) in Object.keys(item)">{{`${i} : ${v} - ${item[v]}`}}</p>
			</div>
		</div>
		
		<custom-detail-infomation 
			:detail-data="detailData"
			:form-value="formData[0]" 
		/> -->
		
		<custom-table class="mt20 cm-table"
			:data-source="formData" 
			:columns="columns"
			:loading="isLoading"
			:pagination="false"
			:tableHeight="tableHeight"
			:rowKey="( record,index ) => index "
		>
			<template #name="scope, record">
				<a-tooltip>
					<template slot="title">{{ scope }}</template>
					{{ scope.length > 15 ? scope.slice(0, 15) + "..."  : text }}
				</a-tooltip>
			</template>
			<!-- dataIndex不传,则scope绑定的是整行的数据 -->
			<template #action="scope, record ">
				<a href="javascript:;" @click="handleClick(scope, record)">查看详情</a>
			</template>
		</custom-table>
		
		<router-view />
	</div>
</template>
<script>
	import { validateName, validateInteger } from '@/utils/validate';
	import { enums } from '@/utils/enums';
	
	import dynamicForm from '@/components/form';
	import CustomTable from "@/components/table";
	import CustomDetailInfomation from '@/components/detail';
	
	// 列
	const columns = [
		{ title: "用户名", dataIndex: "UserName", width: 100 },
		{ title: "年龄", dataIndex: "Age", width: 80 },
		{ title: "性别", dataIndex: "Gender", width: 60 },
		{ title: "出生日期", dataIndex: "Birthday", width: 120 },
		{ title: "工作年限", dataIndex: "Date", width: 200 }, // 内容需要转译
		{ title: "是否中二", dataIndex: "SillyB", width: 100 }, // 内容需要转译
		{ title: "爱好", dataIndex: "Hobby", width: 100 }, // 内容需要转译
		{ title: "婚姻状况", dataIndex: "MarriageStatus", width: 100 }, // 内容需要转译
		{ title: "个人描述", dataIndex: "Description", width: 240,
			scopedSlots: {
				customRender: 'name',
			},
		},
		{ title: '操作', dataIndex: '', 
			fixed: 'right',
			align: 'center',
			width: 120,
			scopedSlots: { 
				customRender: 'action',
			},
		},
	];
	
	// 详情
	const detailData = [
		[
			{ label: "小标题 - 宽度25%", value: "subTitle", col: 24 }, // col设置满让他单独一行
		    { label: "用户名", value: "UserName", col: 6 },
		    { label: "年龄", value: "Age", col: 6 },
			{ label: "性别", value: "Gender", col: 6, isSelect: true }, // 使用下拉框
		    { label: "出生日期", value: "Birthday", col: 6 },
		],
		[
			{ label: "小标题 - 宽度50% + 转换演示", value: "subTitle", col: 24 }, // col设置满让他单独一行
		    { label: "工作年限", value: "Date", col: 12, isDataRange: true, separator: ' 至 ' },
		    { label: "是否中二", value: "SillyB", col: 12, isBoolean: true }, // 布尔值转换
		    { label: "爱好", value: "Hobby", col: 12, format: 2, enumsName: "Hobby" }, // 需要转换多选
		    { label: "婚姻状况", value: "MarriageStatus", col: 12, format: 1, enumsName: "MarriageStatus" }, // 需要转换单选
		],
		[
			{ label: "备注 - 折行展示", value: "subTitle", col: 24 }, // col设置满让他单独一行
			{ label: "个人描述col24", value: "Description", col: 24 },
		]
	];
	export default {
		name: 'my',
		components: { CustomTable, CustomDetailInfomation },
		data() {
			const that = this;
			
			return {
				columns,
				isLoading: false,
				tableHeight: 600,
				
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
						prop: "Gender", // 字段名
						type: "select", // 指定antd组件
						defaultValue: "", // 字段初始值
						placeholder: "请选择性别", // antd组件属性
						options: enums['Gender'].list,
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
						options: enums['Hobby'].list,
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
						options: enums['MarriageStatus'].list,
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
						id: 1,
						Age: 17,
						Birthday: "2022-12-06",
						Date: ['2022-12-08', '2023-01-05'],
						Description: "我想不论是谁, 看到此情此景都会忍不住加入到他们之中.",
						Hobby: ['2', '3'],
						MarriageStatus: "2",
						Gender: "2",
						SillyB: true,
						UserName: "测试",
					},
				],
				detailData,
			};
		},
		methods: {
			showFormModel(type) {
				let that = this;
				let { dataSource, formData } = that;
				
				if(type === 'add') {
					dataSource.map((item, index) => {
						switch (item.type){
							case 'switch':
								item.defaultValue = false;
								break;
							default:
								item.defaultValue = '';
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
	
				const instance = that.$modal({
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
										let id = that.formData[that.formData.length - 1].id++;
										that.formData = [...that.formData, { ...res, id}];
										instance.close();
									},
									onCancel(res) {
										instance.close();
									}
								}
							},
						);
					},
				});
			},
			// 列表页切换
			pageChange(pagination) {
				console.log(pagination);
			},
			// 操作列点击
			handleClick(scope, record) {
				let that = this;
				const instance = that.$drawer({
					title: '列表详情',
					width: 800,
					content: (h) => {
						return h(CustomDetailInfomation, {
								props: {
									formValue: record,
									detailData,
								},
							},
						);
					},
				});
			},
		}
	};
</script>
<style lang="scss" scoped>

</style>
