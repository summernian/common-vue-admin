<!-- 包围元素用 a-form-model-item ，因为需要自动触发验证， 而验证只对 a-form-model-item 下的第一个表单元素做拦截 -->
<template>
	<a-form-model-item 
		class="form-item"
		:prop="itemOptions.prop"
		:label="itemOptions.label ? itemOptions.label + '：' : ''"
		:rules="itemOptions.rules"
		:class="itemOptions.className"
	>
		<!-- input -->
		<a-input
			style="width: 100%;"
			v-if="itemOptions.type === 'input'"
			v-model="currentVal" v-bind="bindProps" v-on="bindEvents"
			allowClear 
		/>
		
		<!-- textarea -->
		<a-textarea
			style="width: 100%;"
			v-if="itemOptions.type === 'textarea'"
			v-model="currentVal" v-bind="bindProps" v-on="bindEvents"
			allowClear 
		/>
		
		<!-- number -->
		<a-input-number
			style="width: 100%;"
			v-if="itemOptions.type === 'number'"
			v-model="currentVal" v-bind="bindProps" v-on="bindEvents"
			allowClear 
		/>
		
		<!-- select -->
		<a-select
			style="width: 100%;"
			v-if="itemOptions.type === 'select'"
			v-model="currentVal" v-bind="bindProps" v-on="bindEvents"
			allowClear
		>
			<a-select-option 
				v-for="item in itemOptions.options" 
				:key="item.value" :label="item.label"
				:value="item.value"
			/>
		</a-select>

		<!-- datetimerange/daterange -->
		<a-range-picker 
			style="width: 100%;"
			v-if="itemOptions.type === 'range-picker'" 
			v-model="currentVal" v-bind="bindProps" v-on="bindEvents"
			:default-time="['00:00:00', '23:59:59']"
			:placeholder="['开始日期', '结束日期']" 
			valueFormat="YYYY-MM-DD" separator="至" 
			allowClear
		/>

		<!-- monthrange -->
		<a-date-picker
			style="width: 100%;"
			v-if="itemOptions.type === 'month-range'"
			v-model="currentVal" v-bind="bindProps" v-on="bindEvents"
			:placeholder="['开始日期', '结束日期']"
			valueFormat="YYYY-MM" range-separator="至"
			type="monthrange"
			allowClear
		/>

		<!-- others date -->
		<a-date-picker
			style="width: 100%;"
			v-if="itemOptions.type === 'date-picker'"
			v-model="currentVal" v-bind="bindProps" v-on="bindEvents" 
			placeholder="请选择日期"
			valueFormat="YYYY-MM-DD"
			allowClear
		/>
		
		<!-- switch -->
		<a-switch
			v-if="itemOptions.type === 'switch'"
			v-model="currentVal"  v-bind="bindProps" v-on="bindEvents"
		/>
		
		<!-- checkbox -->
		<a-checkbox-group
			style="width: 100%;"
			v-if="itemOptions.type === 'checkbox'"
			v-model="currentVal" v-bind="bindProps" v-on="bindEvents" 
		>
			<a-checkbox
				v-for="item in itemOptions.options"
				:key="item.value"
				:value="item.value"
			>{{item.label}}</a-checkbox>
		</a-checkbox-group>
		
		<!-- radio -->
		<a-radio-group
			style="width: 100%;"
			v-if="itemOptions.type === 'radio'"
			v-model="currentVal" v-bind="bindProps" v-on="bindEvents" 
		>
			<a-radio
				v-for="item in itemOptions.options"
				:key="item.value"
				:value="item.value"
			>{{item.label}}</a-radio>
		</a-radio-group>
		
		<!-- 级联选择器 -->
		<a-cascader
			style="width: 100%;"
			v-if="itemOptions.type === 'cascader'"
			v-model="currentVal" v-bind="bindProps" v-on="bindEvents"
			:options="itemOptions.options"
			allowClear 
		/>
	</a-form-model-item>
</template>

<script>
	import request from "@/utils/request";
	export default {
		name: 'form-item',
		inheritAttrs: false,
		props: {
			value: {},
			itemOptions: {
				type: Object,
				default () {
					return {};
				}
			},
			globParams: {
				type: Object,
				default: () => ({})
			}
		},
		computed: {
			// 双向绑定数据值
			currentVal: {
				get() {
					const value = this.value ? this.value : null;
					const { type } = this.itemOptions;
					
					// 下拉框对于antd来说，undefined才算没有值
					if(type == 'select') {
						return value || undefined;
					}
					
					// 日期格式，null才算没有值
					else if(['range-picker','date-picker'].includes(type)) {
						return value || null;
					}
					
					// 级联选择、checkbox, 空数组才是没值
					else if(['cascader', 'checkbox'].includes(type)) {
						return value || [];
					}
					
					// 开关, 值为布尔值
					else if(['switch'].includes(type)) {
						return value || false;
					}
					
					return value;
				},
				set(val) {
					this.$emit("input", val);
				}
			},
			// 绑定属性
			bindProps() {
				let obj = {
					...this.itemOptions
				};
				// 移除冗余属性
				delete obj.label;
				delete obj.prop;
				delete obj.type;
				delete obj.defaultValue;
				delete obj.rules;
				delete obj.events;
				if (obj.type === "select") {
					delete obj.options;
				}
				return obj;
			},
			// 绑定方法
			bindEvents() {
				return this.itemOptions.events || {};
			},
			// 获取请求参数
			requestParams() {
				let params = {
					...this.globParams
				};
				let results = {};
				if (Array.isArray(this.itemOptions.dicParamsList)) {
					this.itemOptions.dicParamsList.forEach(item => {
						if (item.value) {
							results[item.key] = item.value;
						} else {
							results[item.key] = params[item.key];
						}
					});
				}
				return results;
			},
		},

		created() {
			// select 动态添加options
			if (this.itemOptions.url) {
				request({
					url: this.itemOptions.url,
					method: this.itemOptions.method,
					params: this.requestParams,
				}).then(res => {
					this.itemOptions.options = res.data;
				}).catch(res => {
					// 某个没有code的
					this.itemOptions.options = res.data;
				})
			}
		},

		methods: {},
	};
</script>

<style lang="less" scoped></style>