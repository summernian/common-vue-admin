<!--
   @desc 详情弹窗组件
   使用方式:
    <DetailInfomation
		:detail-data="detailData"   //排列规则和数据label
		:form-value="formValue"     //数据的value
		:image-list="imageList"     //有附件图片时使用
		:file-list="fileList"       //有附件文件时使用
		:gutter="12"                //间隔
    >

	detailData 属性说明：
	subTitle: 内部标题(小标题)
	label: 标题
	value: 值
	col：同a-col
	
	format：      是否格式化 1.单选 2.多选 附加属性: enumsName // 枚举name
	isBoolean：   是否布尔值
	isDataRange： 是否时间区间 附加属性: separator // 间隔符
	isSelect：    是否下拉选择框
-->
<template>
	<div class="detail-container">
		<a-row class="detail-unit" v-for="(row, rowIndex) in detailData" :key="rowIndex" :gutter="gutter">
			<a-col v-for="(item, index) in row" :key="index" :span="item.col">
				<!-- 小标题 -->
				<div v-if="item.value === 'subTitle'" class="title-wrap">{{ item.label }}</div>
				<!-- 详情内容 -->
				<div v-else class="detail-info">
					<!-- label -->
					<div class="detail-label"><span class="text">{{ item.label }}：</span></div>
					<!-- content 判断 -->
					<div class="detail-content" v-if="item.format">
						<span class="text">{{ formValueFormat( item.enumsName ? item.enumsName : item.value, formValue[item.value], item.format ) }}</span>
					</div>
					<div class="detail-content" v-else-if="item.isBoolean">
						<span class="text">{{ formValue[item.value] ? '是' : '否' }}</span>
					</div>
					
					<div class="detail-content" v-else-if="item.isDataRange">
						<span class="text">{{ item.separator ? formValue[item.value].join(item.separator) : formValue[item.value].join(' ~ ') }}</span>
					</div>
					<div class="detail-content" v-else-if="item.isSelect">
						<a-select
							style="width: 100%;max-width: 160px;"
							:default-value="formValue[item.value]" 
							:options="getEnumList( item.value )" 
							disabled
						/>
					</div>
					
					<div class="detail-content" v-else>
						<span class="text">{{ formValue[item.value] }}</span>
					</div>
				</div>
				<div v-else-if="item.value === 'imageList'" class="file-wrap">
					<div style="color: #5d6b81">{{ item.label }}：</div>
					<!-- 图片列表 -->
					
				</div>
				<div v-else-if="item.value === 'fileList'" class="file-wrap">
					<div style="color: #5d6b81">{{ item.label }}：</div>
					<!-- 文件列表 -->
					
				</div>
			</a-col>
		</a-row>
	</div>
</template>

<script>
	import { enums } from '@/utils/enums';
	export default {
		name: 'DetailInfomation',
		props: {
			detailData: {
				type: Array,
				default: () => [],
			},
			formValue: {
				type: Object,
				default: () => ({}),
			},
			imageList: {
				type: Array,
				default: () => [],
			},
			fileList: {
				type: Array,
				default: () => [],
			},
			gutter: {
				type: Number,
				default: 12,
			},
		},
		data() {
			return {
				enums
			};
		},
		mounted() {
			
		},
		methods: {
			getEnumList(enumsName) {
				console.log(enums[enumsName].list);
				return enums[enumsName].list;
			},
			formValueFormat(enumsName, val, formatType) {
				if(formatType == 2) {
					return val.map( v => enums[enumsName].formater(v) ).join('、');
				} else {
					return enums[enumsName].formater(val);
				}
			},
		},
	};
</script>

<style scoped lang="scss">
	.detail-container {
		padding: 0 24px;
		height: 100%;
		// background-color: #ccc;
		// border-radius: 4px;
		
		.detail-unit {
			.title-wrap {
				position: relative;
				margin-top: 12px;
				height: 32px;
				line-height: 32px;
				color: $Color__title;
				font-size: 16px;
				font-weight: 600;
			
				&::before {
					content: '';
					position: absolute;
					top: 10px;
					left: -12px;
					width: 4px;
					height: 12px;
					background: #409eff;
				}
			}
			
			.detail-info {
				display: inline-flex;
				width: 100%;
				height: auto;
				
				.text {
					display: inline-block;
					margin: 6px 0;
					font-style: normal;
					line-height: 20px;
				}
				
				.detail-label {
					white-space: nowrap;
					.text {
						color: $Color__auxiliary-text;
					}
				}
				.detail-content {
					flex: 1;
					.text {
						color: $Color__subTitle;
					}
				}
			}
		}
		
		.file-wrap {
			display: flex;
			flex-wrap: wrap;

			.image {
				width: 94px;
				height: 94px;
				cursor: pointer;
				z-index: 9999;
				margin-right: 20px;

				img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	
</style>
