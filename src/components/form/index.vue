<!-- 自定义动态搜索表单 -->
<template>
	<div class="custom-dynamic-form">
		<a-row :gutter="gutter">
			<c-scroll :style="{ height: `${height}` }">
				<a-form-model 
					ref="formRef" layout="horizontal" 
					:model="formData"
				>
					<a-col
						:span="['range-picker', 'textarea', 'switch', 'radio', 'checkbox'].includes(item.type) ? 24 : 12" 
						v-for="(item, index) in dataSource" :key="index"
					>	
						<formModelItem
							v-model="formData[item.prop]" 
							:itemOptions="item" 
							:globParams="globParams"
						/>
						<!-- <a-form-model-item
							:prop="item.prop"
							:label="item.label ? item.label + '：' : ''"
							:rules="item.rules"
							:class="item.className"
						>
							<formItem
								v-model="formData[item.prop]" 
								:itemOptions="item"
								:globParams="globParams"
							/>
						</a-form-model-item> -->
					</a-col>
					<!-- 自定义插槽 -->
					<slot></slot>
				</a-form-model>
			</c-scroll>
		</a-row>
		<a-row type="flex" justify="end">
			<!-- 提交按钮 -->
			<a-button @click="onCancel">取消</a-button>
			<a-button type="primary" @click="onSubmit">提交</a-button>
		</a-row>
	</div>
</template>

<script>
	import formModelItem from "./components/form-model-item";
	export default {
		name: 'custom-dynamic-form',
		props: {
			/**
			 * 表单配置
			 * 示例：
			 * [{
			 *   label: '用户名', // label文字
			 *   prop: 'username', // 字段名
			 *   type: 'input', // 指定antd组件
			 *   defaultValue: '', // 字段初始值
			 *   placeholder: '请输入用户名', // antd组件属性
			 *   rules: [
			 *      必填
			 *		{ required: true, message: '必填项', trigger: 'blur' }
			 * 		如果类型是string或array，则表示长度值（value.length）的范围，如果类型是数值类型（number,integer,float）则表示值的范围。
			 *		{ min: 3, max: 10, message: '名称长度在3到10个字符', trigger: 'blur' }
			 * 		type: email 邮箱, number 数字, boolean 布尔值, integer 整数, float 浮点数(小数), array 数组, url 网址 ... 等等
			 *		{ type: 'email', message:'请输入正确的邮箱格式', trigger: 'blur' }
			 * 		长度, 优先级大于min max
			 *		{ len: 6, message: '长度为6', trigger: 'blur' }
			 * 		正则表达式，表示该项必须匹配正则表达式才能通过验证
			 *		{ pattern: /^\d*$/, message: '只能输入数字', trigger: 'blur' }
			 * 		enum: Array，表示该项只能在枚举出的集合里
			 *		{ type: "enum", enum: ['admin', 'user', 'guest'], message: '结果不存在', trigger: 'blur' }
			 * 		transform: Function，钩子函数，表示在开始验证前对数据进行处理，然后再进行验证
			 *		{ type: 'string', required: true, message: '请输入必填项', transform(value) { return value.trim(); } }
			 * 		validator: 自定义验证 部分验证已配置好, 见 @/utils/validate.js
			 *		{ validator: fn, trigger: 'blur' }
			 *	 ], // antd组件属性
			 *   events: { // antd组件方法
			 *     input (val) {
			 *       console.log(val)
			 *     },
			 *     ...... // 可添加任意antd组件支持的方法
			 *   }
			 *   ...... // 可添加任意antd组件支持的属性
			 * }]
			 */
			dataSource: {
				type: Array,
				required: true,
				default () {
					return [];
				}
			},
			/**
			 * 请求所需参数
			 * 示例：
			 * globParams: {
			 *   // 参数名
			 *   // 参数值
			 *   token: "123"
			 *  },
			 */
			globParams: {
				type: Object,
				default () {
					return {};
				}
			},
			gutter: {
				type: Number,
				default: 24
			},
			height: {
				type: [ Number, String ],
				default: '100%'
			}
		},

		data() {
			return {
				// form数据
				formData: {}
			};
		},

		computed: {
			
		},

		created() {
			this.addDefaultValue();
		},

		methods: {
			// 校验
			onValidate(callback) {
				this.$refs['formRef'].validate(valid => {
					if (valid) {
						callback();
					}
				});
			},
			// 提交
			onSubmit() {
				this.onValidate(() => {
					this.$emit("onSubmit", this.formData);
				});
			},
			// 重置
			onCancel() {
				this.$refs['formRef'].resetFields();
				this.$emit("onCancel", null);
			},
			// 添加初始值
			addDefaultValue() {
				const obj = {};
				this.dataSource.forEach(v => {
					if (v.defaultValue !== undefined) {
						obj[v.prop] = v.defaultValue;
					}
				});
				this.formData = obj;
			}
		},

		components: {
			formModelItem
		}
	};
</script>

<style lang="scss">
	.single-line {
		display: flex;
		
		.ant-form-item-label {
			width: 80px;
			text-align: left;
		}
		.ant-form-item-control-wrapper {
			white-space: nowrap;
		}
	}
	
</style>