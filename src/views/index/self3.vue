<template>
	<div class="inner">
		<div class="tip">
			<div>test: 防抖</div>
			<a-button type="primary" v-optimize:fd="{ fn: change, delay: 600 }">{{btn}}</a-button>
			<span class="ml5">{{ 'is:' + (isOpen ? '开' : '关')}}</span>
			<div class="mt10">test: 节流</div>
			<a-input style="width: 180px;" v-model="input" type="text" placeholder="按F12查看控制台打印"
				v-optimize:jl="{ fn: inputChange, emit: 'input', delay: 800 }" />
		</div>
		<c-table class="mt20 cm-table"
			:data-source="tableData" 
			:columns="columns"
			:loading="false"
			:pagination="pagination"
			:tableHeight="tableHeight"
			:sortable="true"
			:rowClassName="tableRowClass"
			@onStart="onStart"
			@onMove="onMove"
			@onEnd="onEnd"
			@change="pageChange"
		>
			<!-- slots -->
			<template #customTitle>
				<a>Name</a>
			</template>
			<!-- dataIndex传值,则scope绑定的是dataIndex的值 -->
			<template #name="scope, record">
				<!-- 加个hanlde类名, 只有点这个地方可以拖拽 -->
				<span class="handle" :data="scope">{{ '拖拽把手: ' + scope }}</span>
				<!-- <p :class="!i ? 'mt10' : ''" v-for="(v, i) in (Object.keys(record))">{{v + ' - ' + record[v]}}</p> -->
			</template>
			<!-- dataIndex不传,则scope绑定的是整行的数据 -->
			<template #action="scope, record ">
				<a href="javascript:;" @click="handleClick(scope, record)">操作按钮</a>
			</template>
		</c-table>
	</div>
</template>
<script>
	import CTable from "@/components/table";

	const columns = [
		{ dataIndex: "name",
			// 设置slots - title时， title不能设置， 为空也不行
			slots: {
				title: "customTitle"
			},
			scopedSlots: {
				customRender: "name"
			},
			width: 200
		},
		{ title: "年龄", dataIndex: "age",
			width: 200 ,
		},
		{ title: "地址", dataIndex: "address",
			width: 400 ,
		},
		{ title: '操作', dataIndex: '', 
			fixed: 'right',
			align: 'center',
			width: 100,
			scopedSlots: { 
				customRender: 'action',
			},
		},
	];
	const data = [{
			key: "1",
			name: "John Brown",
			age: 32,
			// address: "New York No. 1 Lake Park",
			address: "New York No. 1 Lake Park。New York No. 1 Lake Park。New York No. 1 Lake Park。New York No. 1 Lake Park。New York No. 1 Lake Park。New York No. 1 Lake Park。",
			tags: ["nice", "developer"],
		},
		{
			key: "2",
			name: "Jim Green",
			age: 42,
			address: "London No. 1 Lake Park",
			tags: ["loser"],
		},
		{
			key: "3",
			name: "Joe Black",
			age: 32,
			address: "Sidney No. 1 Lake Park",
			tags: ["cool", "teacher"],
		},
	];

	export default {
		name: 'self',
		components: { CTable },
		props: {
			isOpen: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				btn: '变换',
				input: '',
				tableData: data,
				columns,
				
				tableHeight: 400,
				pagination: false,
				pagination: { pageSize: 10, total: 100 },
			}
		},
		methods: {
			change() {
				console.log(this.isOpen ? '开' : '关');
				this.$emit('update:isOpen', !this.isOpen)
			},
			inputChange() {
				console.log(this.input)
			},
			handleClick(scope, record) {
				console.log(scope, record);
			},
			pageChange(pagination) {
				console.log(pagination);
			},
			// 给行添加class
			tableRowClass(record, index) {
				// age是dataSource的属性
				if (record.age == '32') {
					// 源自 @/components/table/dragTable.vue的配置,
					// 只有.dragger的元素可以被拖拽, 开发者根据项目需求自行配置
					return "dragger";
				}
				return "";
			},
			onStart(evt) {
				console.log('拖拽开始, 拖拽元素: ', evt, '参数:', this.tableData[evt.oldIndex]);
			},
			onMove(evt, originalEvent) {
				console.log('拖拽中, 拖拽元素: ', evt);
				console.log('event', originalEvent);
			},
			onEnd({oldIndex, newIndex}) {
				// 拖拽结束时, 固定列的数据并没有改变, 所以拖拽结束了之后要发起request请求, 然后重绘table
				// 如果拖拽结束时还不想发起请求, 比如还想再操作其他行, 最后再一起请求, 这种情况下, 如果用户点击固定列就会出现问题
				// 如果有这种需求, 又不想用户点击固定列出问题, 那么就直接在前端操作一下tabla的data-source.
				console.log('拖拽结束, 目标位值: ', newIndex);
				// 首先去掉被拖拽那个元素, 用其他元素组成一个新数组
				let arr = this.tableData.filter((v, i) => i != oldIndex);
				// 然后用数组的splice方法, 意为: 拼接, 通常我们用作移除
				// 第一个参数是移除操作的位置, 此处就是拖拽的目标位置newIndex
				// 第二个参数是需要移除的元素, 此处我们不需要移除, 所以是0
				// 第三个参数是拼接的新元素, 此处就是我们操作的拖拽元素 dataSource[oldIndex];
				arr.splice(newIndex, 0, this.tableData[oldIndex]);
				// 赋值
				this.tableData = arr;
				// 上面的方法是前端方法, 如果是后端去操作, 不需要那么麻烦, 直接传给后端需要的参数, 然后拿到返回值后赋值给dataSource即可
				// 至此, 一个简单的脱宅需求就结束了
			}
		}
	}
</script>
<style lang="scss" scoped>
	.dragger .handle {
		cursor: move;
	}
</style>