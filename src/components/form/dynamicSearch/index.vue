<!-- 自定义动态搜索表单 -->
<template>
	<div class="custom-search-form">
		<a-row>
			<a-form-model 
				ref="formRef" 
				:layout="layout" :model="formData" 
				:label-col="labelCol" :wrapper-col="wrapperCol"
			>
				<a-col 
					v-bind="responsive" 
					v-for="(item, index) in dataSource" :key="index"
					v-show="index < maxItem || (index >= maxItem && collapsed)"
				>
					<a-form-model-item 
						:prop="item.prop" 
						:label="item.label ? item.label + '：' : ''"
						:rules="item.rules"
					>
						<formItem
							v-model="formData[item.prop]" 
							:itemOptions="item" 
							:globParams="globParams"
						/>
					</a-form-model-item>
				</a-col>
				<!-- 自定义插槽，可用于特殊表单块 -->
				<slot></slot>
				<a-col v-bind="responsive">
					<a-row>					
						<!-- 占位符 -->
						<a-col v-bind="labelCol"></a-col>
						<a-col v-bind="wrapperCol">
							<!-- 提交按钮 -->
							<div class="btn-box">
								<a-button type="primary" @click="onSearch">搜索</a-button>
								<a-button @click="onReset">重置</a-button>
								<a class="collapsed" v-if="showCollapsed" @click="togglecollapsed">{{ collapsed ? '收起 ' : '展开 ' }}<a-icon :type="collapsed ? 'up' : 'down'" /></a>
							</div>
						</a-col>
					</a-row>
				</a-col>
			</a-form-model>
		</a-row>
	</div>
</template>

<script>
	import formItem from "../components/form-item";
	export default {
		name: 'custom-search-form',
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
			maxItem: {
				// 超过多少个折叠
				type: Number,
				default: 2
			},
			layout: {
				// 控件的排列方式 horizontal vertical
				type: String,
				default: 'horizontal'
			},
			responsive: {
				type: Object,
				default: function() {
					return {
						xxl: 4,
						xl: 6,
						md: 8,
						sm: 12
					};
				}
			},
			labelCol: {
				type: Object,
				default: function() {
					return {
						xxl: 8,
						xl: 8,
						md: 8,
						sm: 8
					}
				}
			},
			wrapperCol: {
				type: Object,
				default: function() {
					return {
						xxl: 16,
						xl: 16,
						md: 16,
						sm: 16
					}
				}
			},
		},

		data() {
			return {
				// 高级搜索 展开/关闭
				collapsed: false,
				// form数据
				formData: {}
			};
		},

		computed: {
			showCollapsed() {
				// 显示展开搜索和收缩的判定
				return this.dataSource.length > this.maxItem;
			},
		},

		created() {
			this.addDefaultValue();
		},

		methods: {
			// 显隐
			togglecollapsed() {
				this.collapsed = !this.collapsed;
			},
			// 校验
			onValidate(callback) {
				this.$refs.formRef.validate(valid => {
					if (valid) {
						callback();
					}
				});
			},
			// 搜索
			onSearch() {
				this.onValidate(() => {
					this.$emit("onSearch", this.formData);
				});
			},
			// 重置
			onReset() {
				this.$refs.formRef.resetFields();
				this.$emit("onReset", null);
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
			formItem
		}
	};
</script>

<style lang="scss">
	.custom-search-form {
		.btn-box {
			margin-bottom: 10px;
			line-height: 40px;
			white-space: nowrap;
		}

		.ant-form-item {
			margin-bottom: 10px;
		}
		
		.collapsed {
			margin-left: 10px;
			user-select: none;
			// white-space: nowrap;
		}
	}
</style>