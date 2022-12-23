<!-- 基于 antd 的 Table + Sortable 的简单封装, 可直接引用, 用于需要拖拽排序的基础页面, 其他配置参见 antd 官方文档-->
<script>
import Sortable from "@/utils/sortable";
export default {
	name: "DragTable",
	inheritAttrs: false,
	mounted() {
		if (this.$attrs.sortable) this.handleRowDrop();
	},
	render() {
		const on = {
			...this.$listeners,
		};
		const props = {
			...this.$attrs,
			...this.$props,
			...{
				dataSource: this.$attrs["data-source"],
				columns: this.$attrs.columns,
			},
		};
		// slots循环
		const slots = Object.keys(this.$slots).map((slot) => {
			return <template slot={slot}>{this.$slots[slot]}</template>;
		});
		const table = (
			<a-table props={props} scopedSlots={this.$scopedSlots} on={on}>
				{slots} // 放这里
			</a-table>
		);
		return <div class="custom-table">{table}</div>;
	},
	methods: {
		handleRowDrop() {
			const tbody = document.querySelector(".ant-table-content tbody");
			const that = this;
			Sortable.create(tbody, {
				// 把手, 点击该元素的时候才能拖拽, 如果点击整行都能拖拽则不配置, 设置在a标签或button按钮上无效
				// handle: '.handle',
				// 可拖拽的元素, 规定只有某些元素可以被拖拽
				// draggable: '.dragger',
				// 开始拖拽的时候
				onStart: function (evt) {
					that.$emit("onStart", evt);
				},
				// 拖拽移动的时候
				onMove: function (evt, originalEvent) {
					that.$emit("onMove", evt, originalEvent);
				},
				// 拖拽结束的时候
				onEnd({ newIndex, oldIndex }) {
					that.$emit("onEnd", { newIndex, oldIndex });
				},
			});
		},
	},
};
</script>
