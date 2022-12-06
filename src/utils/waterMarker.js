import moment from "moment";

export function addWaterMarker(opts) {
	let time = moment().format("YYYY-MM-DD HH:mm:ss");

	//默认设置
	let defaultSettings = {
		text: "is the watermarker",
		rows: 0, //水印行数
		cols: 0, //水印列数
		x: 120, //水印起始位置x轴坐标
		y: 0, //水印起始位置Y轴坐标
		x_space: 10, //水印x轴间隔
		y_space: 10, //水印y轴间隔
		color: '#aaa', //水印字体颜色
		opacity: 0.25, //水印透明度
		fontSize: '12px', //水印字体大小
		fontFamily: '微软雅黑', //水印字体
		width: 200, //水印宽度
		height: 100, //水印长度
		angle: 20 //水印倾斜度数
	};

	// 设置整合
	let options;
	if (Object.prototype.toString.call(opts).slice(8, -1) === "Object") {
		options = Object.assign(defaultSettings, opts);
	} else {
		console.error('arguments error');
		return false
	}

	let oTemp = document.createDocumentFragment();

	//获取节点最大宽度
	let _width = Math.max(document.body.scrollWidth, document.body.clientWidth);
	let cutWidth = _width * 0.0150;
	let nodeWidth = _width - cutWidth;
	//如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
	if (options.cols == 0 
	|| (parseInt(options.x + options.width * options.cols + options.x_space * (options.cols - 1)) > nodeWidth)) {
		options.cols = parseInt( (nodeWidth - options.x + options.x_space) / (options.width + options.x_space) - 1 );
		options.x_space = parseInt( (nodeWidth - options.x - options.width * options.cols) / (options.cols - 1) - 10 );
	}
	
	// //获取节点最大高度
	let nodeHeight = Math.max(document.body.scrollHeight, document.body.clientHeight);
	//如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
	if (options.rows == 0 
	|| (parseInt(options.y + options.height * options.rows + options.y_space * (options.rows - 1)) > nodeHeight)) {
		options.rows = parseInt( (options.y_space + nodeHeight - options.y) / (options.height + options.y_space) );
		options.y_space = parseInt( ((nodeHeight - options.y) - options.height * options.rows) / (options.rows - 1) );
	}
	
	// 循环
	let x;
	let y;
	for (let i = 0; i < options.rows; i++) {
		y = options.y + (options.y_space + options.height) * i;
		for (let j = 0; j < options.cols; j++) {
			x = options.x + (options.width + options.x_space) * j;
			let waterMarker = document.createElement('div');
			waterMarker.id = `water-marker-${i}-${j}`;
			waterMarker.className = 'water-marker';
			waterMarker.appendChild(document.createTextNode(`${options.text}\n${time}`));
			//设置水印div倾斜显示
			waterMarker.style.webkitTransform = "rotate(-" + options.angle + "deg)";
			waterMarker.style.MozTransform = "rotate(-" + options.angle + "deg)";
			waterMarker.style.msTransform = "rotate(-" + options.angle + "deg)";
			waterMarker.style.OTransform = "rotate(-" + options.angle + "deg)";
			waterMarker.style.transform = "rotate(-" + options.angle + "deg)";
			waterMarker.style.visibility = "";
			waterMarker.style.position = "absolute";
			waterMarker.style.left = x + 'px';
			waterMarker.style.top = y + 'px';
			waterMarker.style.overflow = "hidden";
			waterMarker.style.zIndex = "9999";
			waterMarker.style.pointerEvents = 'none'; //pointer-events:none  让水印不遮挡页面的点击事件
			// waterMarker.style.border="solid #eee 1px";
			waterMarker.style.opacity = options.opacity;
			waterMarker.style.fontSize = options.fontSize;
			waterMarker.style.fontFamily = options.fontFamily;
			waterMarker.style.color = options.color;
			waterMarker.style.textAlign = "left";
			waterMarker.style.whiteSpace = "pre-line";
			waterMarker.style.width = options.width + 'px';
			waterMarker.style.height = options.height + 'px';
			waterMarker.style.display = "block";
			oTemp.appendChild(waterMarker);
		};
	};
	
	document.body.appendChild(oTemp);
}