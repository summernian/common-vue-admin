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
				<!-- 自定义插槽 -->
				<slot></slot>
				<a-col v-bind="responsive">
					<a-row>
						<a-col v-bind="btnsWrapCol">
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
			 *   rules: [], // antd组件属性 表单搜索一般不需要验证
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
				default: 1
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
						// 注：xxl: 4 <=> xxl: { span: 4 } 二者等价，为简写方式，如果设置offset则要写全，参考下面的btnsWrapCol
						xxl: 4,
						xl: 6,
						// lg: 6,
						md: 8,
						sm: 12,
						// xs: 24,
					};
				}
			},
			labelCol: {
				type: Object,
				default: function() {
					return {
						// xxl: 8,
						// xl: 8,
						// lg: 8,
						// md: 8,
						sm: 8,
						xs: 24,
					}
				}
			},
			wrapperCol: {
				type: Object,
				default: function() {
					return {
						// xxl: 16,
						// xl: 16,
						// lg: 16,
						// md: 16,
						sm: 16,
						xs: 24,
					}
				}
			},
			btnsWrapCol: {
				type: Object,
				default: function() {
					return {
						// xxl: {
						// 	span: 16,
						// 	offset: 8
						// },
						// xl: {
						// 	span: 16,
						// 	offset: 8
						// },
						// lg: {
						// 	span: 16,
						// 	offset: 8
						// },
						// md: {
						// 	span: 16,
						// 	offset: 8
						// },
						sm: {
							span: 16,
							offset: 8
						},
						xs: {
							span: 24,
							offset: 0
						},
					}
				}
			}
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
				this.$refs['formRef'].validate(valid => {
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
				this.$refs['formRef'].resetFields();
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