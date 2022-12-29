// charts 相关配置
// 颜色盘
export const CHART_COLORS = [
	'#00bebe', 
	'#ff8823', '#92ce22', 
	'#ae7bff', 
	'#2a8ff7', '#59c4e6', '#ee5e37', '#edafda', '#a5e7f0', '#516b91'];

// 默认tooltip样式
export const DEFAULT_TOOLTIP_STYLE = {
	// trigger: 'item',                          //触发类型,'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。 'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
	// triggerOn: "mousemove",                   //提示框触发的条件,'mousemove'鼠标移动时触发。'click'鼠标点击时触发。'mousemove|click'同时鼠标移动和点击时触发。'none'不在 'mousemove' 或 'click' 时触发
	// position: ['50%', '50%'],                 //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置,[10, 10],回掉函数，inside鼠标所在图形的内部中心位置，top、left、bottom、right鼠标所在图形上侧，左侧，下侧，右侧，
	// formatter: "{b0}: {c0}<br />{b1}: {c1}",  //提示框浮层内容格式器，支持字符串模板和回调函数两种形式,模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等
	showContent: true,                           //是否显示提示框浮层
	alwaysShowContent: false,                    //是否永远显示提示框内容
	showDelay: 0,                                //浮层显示的延迟，单位为 ms
	hideDelay: 0,                                //浮层隐藏的延迟，单位为 ms
	enterable: false,                            //鼠标是否可进入提示框浮层中
	confine: false,                              //是否将 tooltip 框限制在图表的区域内
	transitionDuration: 0.4,                     //提示框浮层的移动动画过渡时间，单位是 s,设置为 0 的时候会紧跟着鼠标移动
	backgroundColor: "#fff",                     //标题背景色
	borderColor: "#fff",                         //边框颜色
	borderWidth: 0,                              //边框线宽
	padding: 10,                                 //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
	textStyle: {                                 //文本样式
		fontSize: 12,
		color: 'rgba(0, 0, 0, .65)'
	},
};

// 默认类型坐标轴 x
export const DEFAULT_CATEGORY_AXIOS = {
	type: 'category',
	show: true,
	data: [],
	axisLine: {
		show: true,
		lineStyle: {
			color: '#aaa'
		}
	},
	axisTick: {
		// show: false,
		alignWithLabel: true, // 中线对齐
	},
	axisLabel: {
		show: true,
		color: 'rgba(0, 0, 0, .5)',
		// margin: 10,
		// interval: 1, // 间隔，间隔num个显示，设置0全部展示
		// rotate: -40, // 倾角
		formatter(val, index) {
			// console.log(val, index);
			return val
		},
	},
	splitLine: {
		show: false
	},
}

// 默认数值坐标轴 y
export const DEFAULT_VALUE_AXIOS = {
	type: 'value',
	show: true,
	min: 0,
	axisLine: {
		show: true,
		lineStyle: {
			color: '#aaa'
		}
	},
	axisTick: {
		show: false
	},
	axisLabel: {
		show: true,
		color: 'rgba(0, 0, 0, .5)'
	},
	splitNumber: 6, 
	splitLine: {
		// show: false,
		interval: 2, // 间隔，间隔num个显示，设置0全部展示
		lineStyle: {
			color: '#d9d9d9',
			type: 'dashed',
			opacity: .7
		}
	},
}

// 默认常规网格区域
export const DEFAULT_GRID = {
	top: 48,
	bottom: 48,
	left: 48,
	right: 24
}

// Bar
export const SIMPLE_BAR_OPTION = {
	color: CHART_COLORS,
	xAxis: {
		type: 'category',
		show: false
	},
	yAxis: {
		type: 'value',
		show: false,
		min: 0
	},
	tooltip: {
		...DEFAULT_TOOLTIP_STYLE
	},
	grid: {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	},
	series: [{
		type: 'bar',
		data: [],
		label: {
			show: false
		},
		labelLine: {
			show: false
		}
	}]
}

export const BASIC_BAR_OPTION = {
	color: CHART_COLORS,
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		},
		...DEFAULT_TOOLTIP_STYLE
	},
	xAxis: {
		...DEFAULT_CATEGORY_AXIOS
	},
	yAxis: {
		...DEFAULT_VALUE_AXIOS
	},
	grid: {
		...DEFAULT_GRID
	},
	series: [
		{
			type: 'bar',
			data: [],
			label: {
				show: false
			},
			labelLine: {
				show: false
			},
			itemStyle: {
				// borderRadius: [6, 6, 0, 0]
			},
			barMaxWidth: 24,
			barMinWidth: 12
		},
	]
}

// Line
export const SIMPLE_LINE_OPTION = {
	color: CHART_COLORS,
	xAxis: {
		type: 'category',
		data: [],
		show: false
	},
	yAxis: {
		type: 'value',
		show: false,
		min: 0
	},
	tooltip: {
		trigger: 'axis',
		confine: true,
		...DEFAULT_TOOLTIP_STYLE
	},
	grid: {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	},
	series: [{
		type: 'line',
		data: [],
		smooth: true,
		symbol: 'none',
		label: {
			show: false
		},
		labelLine: {
			show: false
		},
		lineStyle: {
			width: 3,
			shadowBlur: 8,
			shadowColor: 'rgba(0, 0, 0, .25)',
			shadowOffsetX: -3,
			shadowOffsetY: 5
		}
	}]
}

export const SIMPLE_AREA_LINE_OPTION = {
	color: CHART_COLORS,
	xAxis: {
		type: 'category',
		data: [],
		show: false
	},
	yAxis: {
		type: 'value',
		show: false,
		min: 0
	},
	tooltip: {
		trigger: 'axis',
		// confine: true,
		...DEFAULT_TOOLTIP_STYLE
	},
	grid: {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	},
	series: [{
		type: 'line',
		data: [],
		smooth: true,
		symbol: 'none',
		label: {
			show: false
		},
		labelLine: {
			show: false
		},
		lineStyle: {
			width: 2
		},
		areaStyle: {
			opacity: 0.5
		}
	}]
}

export const BASIC_LINE_OPTION = {
	color: CHART_COLORS,
	tooltip: {
		trigger: 'axis',
		...DEFAULT_TOOLTIP_STYLE,
		axisPointer: {
			show: true,
			type: 'cross',
			crossStyle: {
				type: 'dashed',
				color: '#d9d9d9',
				width: 1
			}
		}
	},
	xAxis: {
		...DEFAULT_CATEGORY_AXIOS
	},
	yAxis: {
		...DEFAULT_VALUE_AXIOS
	},
	grid: {
		...DEFAULT_GRID,
	},
	series: [{
		type: 'line',
		smooth: true,
		// symbol: 'none',
		// symbolSize: 8,   //设定实心点的大小
		itemStyle: {
			// normal: {
				// color: "#06c", //改变折线点的颜色
				// lineStyle: {
				// 	color: "#12C8EF", //改变折线颜色
				// },
			// },
		},
		data: [],
		label: {
			show: false
		},
		labelLine: {
			show: false
		},
		barMaxWidth: 24,
		barMinWidth: 12
	}]
}

// Pie
export const BASIC_PIE_OPTION = {
	color: CHART_COLORS,
	tooltip: {
		...DEFAULT_TOOLTIP_STYLE
	},
	series: [{
		type: 'pie',
		radius: ['45%', '80%'],
		center: ['50%', '50%'],
		data: [],
		label: {
			show: false, // 若要设置labelLine, 该属性设置true, position不设置或outside
			position: 'center', // pie类型 该属性设置center与labelLine冲突, 只有一个有效
		},
		// labelLine: {
		// 	normal: {
		// 		show: true,
		// 		// lineStyle: {  color: '#f00'   },
		// 		smooth: 0.2,
		// 		length: 20,//第一段线的长度
		// 		length2: 20,//第二段线的长度
		// 	}
		// },
		itemStyle: {
			borderRadius: 4,
			borderColor: '#fff',
			borderWidth: 4
		},
		emphasis: {
			focus: 'self',
			scale: false,
			label: {
				show: true,
				fontSize: 14,
				color: 'rgba(0, 0, 0, .65)'
			},
			itemStyle: {
				// borderWidth: 2,
				borderColor: 'rgba(0, 0, 0, .5)'
			}
		},
		blur: {
			itemStyle: {
				opacity: 0.5
			}
		}
	}]
}

// scatter
export const BASIC_SCATTER_OPTION = {
	color: CHART_COLORS,
	tooltip: {
		trigger: 'item',
		...DEFAULT_TOOLTIP_STYLE,
		axisPointer: {
			show: true,
			type: 'cross',
			crossStyle: {
				type: 'dashed',
				color: '#d9d9d9',
				width: 1
			}
		}
	},
	xAxis: {
		...DEFAULT_CATEGORY_AXIOS
	},
	yAxis: {
		...DEFAULT_VALUE_AXIOS
	},
	grid: {
		...DEFAULT_GRID
	},
	series: [{
		type: 'scatter',
		emphasis: {
			focus: 'series'
		},
		data: [],
		label: {
			show: false
		},
		labelLine: {
			show: false
		}
	}]
}
