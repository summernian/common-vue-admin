import moment from "moment";

function addWaterMarker(str, parentNode, font, color) {
	let time = moment().format("YYYY-MM-DD HH:mm:ss");
	// 水印文字，父元素，字体，文字颜色
	var can = document.createElement('canvas')
	parentNode.appendChild(can);
	can.width = 280;
	can.height = 100;
	can.style.display = 'none';
	var cans = can.getContext('2d');
	
	cans.rotate((-20 * Math.PI) / 180);
	cans.textAlign = 'left';
	cans.textBaseline = 'Middle';
	cans.font = font || "bold 18px 楷体";
	
	// fillText、strokeText第三个参数限制宽度 
	// canvas.strokeText('xxx', 0, 80, 100);
	
	// 填充字体
	cans.fillStyle = color || 'rgba(180, 180, 180, .2)';
	cans.fillText(str, 6, 60);
	cans.fillText(time, 0, 80);
	
	// 空心字体
	// cans.lineWidth = .1;
	// cans.strokeStyle = "rgba(180, 180, 180, .2)";
	// cans.strokeText(time, 0, 80);
	
	//渐变字体
	// let linearGrad = cans.createLinearGradient(0, 0, 140, 0)
	// linearGrad.addColorStop(0, "black");
	// linearGrad.addColorStop(0.25, "yellow");
	// linearGrad.addColorStop(0.5, "green");
	// linearGrad.addColorStop(0.75, "blue");
	// linearGrad.addColorStop(1, "black");
	// cans.fillStyle = linearGrad;
	// cans.fillText(time, 0, 90);

	//图像背景字体
	// let backgroundImage = new Image();
	// backgroundImage.src = "xxx.jpg";
	// backgroundImage.οnlοad = () => {
	// 	var pattern = cans.createPattern(backgroundImage,"repeat");
	// 	cans.fillStyle = pattern;
	// 	cans.font = "bold 100px Arial";
	// 	cans.fillText("背景图字体："+str,40,600);//填充字体
	// 	cans.strokeText("背景图字体："+str,40,600);//对已经填充好的字体进行描边
	// 	//上面的两个位置必须一致，才能出现既有背景图又有描边效果的字体，否则
	// 	//第一个只有填充了背景图的字体，没有描边。第二个没有背景图，只是个空心的即有描边的字体。
	// };
	
	parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')';
}

const waterMarker = {
	bind: function(el, binding) {
		addWaterMarker(binding.value.text, el, binding.value.font, binding.value.color);
	},
}

export default waterMarker
