<script>
import DragTable from "./components/dragTable";

const CustomTable = {
	name: 'custom-table',
	
	// inheritAttrs 默认为true
	// 释义: 父作用域的 不被认作 props 的 attribute 绑定 (attribute bindings) 将会作为普通的 HTML attribute 应用在子组件的根元素上。
	// 示例：
	// Parent: 
	// <div class="parent">
	// 	<child :inner="'innerHTML'">,
	// </div>
	// Child: (注: inner不作为props传入)
	// <div class="child">{{$attrs.inner}}</div> 
	// 最终呈现(inheritAttrs: true)  : <div class="parent"><div class="child" inner="innerHTML">innerHTML</div></div>
	// 最终呈现(inheritAttrs: false) : <div class="parent"><div class="child">innerHTML</div></div>
	inheritAttrs: false,
	
	computed: {
		_height() {
			return  this.$attrs.tableHeight || 600;
		}
	},
	
	watch: {
		$attrs: {
			handler(newVal, oldVal) {
				// 高度改变时
				if(newVal?.tableHeight !== oldVal?.tableHeight
				// 分页类型切换时（pagination: true <=> pagination: {...}）
				|| typeof (newVal?.pagination) !== typeof (oldVal?.pagination) 
				// 有或无分页时（pagination: true <=> pagination: false）
				|| (typeof (newVal?.pagination) === 'boolean' && newVal?.pagination !== oldVal?.pagination) ) {
					this.$nextTick(() => {
						// 固定table高度
						let tableContent = document.querySelector('.custom-table .ant-table-content .ant-table-scroll');
						// console.log(tableContent);
						let pageDomHeight = 0;
						if(!!newVal.pagination) {
							// 64是page的高度
							pageDomHeight = 64;
						}
						tableContent.style.height = `${this._height - pageDomHeight}px`; 
					});
				}
			},
			immediate: true,
			deep: true,
		}
	},
	
	render(h) {
		const attrs = {
			// 设置默认值
			pagination: { pageSize: 10 },
			scroll: {
				x: 'max-content',
				// x: true,
				// head: 47, pagination: 64
				y: (this._height - (!!this.$attrs.pagination ? 111 : 47)), 
			},
			// 默认值
			...this.$props,
			// 绑定值
			...this.$attrs,
		};
		
		const on = {
			...this.$listeners,
		};
		
		const slots = Object.keys(this.$slots).map((slot) => {
			return <template slot={slot}>{this.$slots[slot]}</template>;
		});
		
		const scopedSlots = {
			...this.$scopedSlots
		};
		
		const style = {
			height: `${this._height}px`
		};
		
		// 基于 antd 的 Table 的简单封装
		// 添加了一些默认参数:
		// 0、配置了默认高度, tableHeight: 600
		// 1、监听高度变化重绘列表(包括 pagination 分页模块的高度), 开发者只需要修改传入的高度 tableHeight 即可
		// 2、默认分页 pageSize: 10 条, 因 pagination 是作为 Object 传入, 此处未做合并, 设置分页的时候还是要传 pageSize (开发者可自行合并)
		// 注:
		// DragTable 也是基本封装, 在原本的 Table 上加了拖拽功能, 没有其他的默认配置
		// 如果用不到, 此处可直接 return h( 'a-table', { attrs, style, on, scopedSlots }, slots )
		// 两个组件也可以直接写在一起, 不用像现在这样多套一层, 自行决定, 此处为了区分, 故写两处封装
		return h( DragTable, { attrs, style, on, scopedSlots }, slots );
	}
}

export default CustomTable;
</script>