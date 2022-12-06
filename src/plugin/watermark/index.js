import moment from "moment";

// 获取元素
const getEl = (el) => {
	return typeof el === "string" ?
		document.querySelector(el) :
		el;
};

let time = moment().format("YYYY-MM-DD HH:mm:ss");

function Watermark(options) {
	this.options = Object.assign({
		text: "水印",
		scroll: false,
		zIndex: 9999,
		width: 300,
		height: 140,
		fontSize: 12,
		fontWeight: 400,
		fontFamily: '微软雅黑', //水印字体
		color: "#aaa",
		opacity: 0.25,
		rotate: -20,
	}, options);
	const el = this.options.el;
	this.domNode = el ? getEl(el) : document.body;
	this.initWaterMarker();
	this.monitor();
}

Watermark.prototype.initWaterMarker = function() {
	this.maskDiv = document.createElement("div");
	this.maskDiv.style.position = this.options.scroll ? "absolute" : "fixed";
	this.maskDiv.style.zIndex = this.options.zIndex;
	this.maskDiv.id = "watermark";
	this.maskDiv.style.top = "0";
	this.maskDiv.style.bottom = "0";
	this.maskDiv.style.left = "0";
	this.maskDiv.style.right = "0";
	this.maskDiv.style.height = "100%";
	this.maskDiv.style.width = "100%";
	this.maskDiv.style.pointerEvents = "none";
	const svgStr = `<svg 
						width="${this.options.width}" 
						height="${this.options.height}"
						xmlns="http://www.w3.org/2000/svg" version="1.1"
					>
						<text
							fill="${this.options.color}" 
							style="
								opacity:${this.options.opacity};
								font-family: ${this.options.fontFamily};
								font-weight: ${this.options.fontWeight};
								font-size: ${this.options.fontSize}px;
								transform: rotate(${this.options.rotate}deg);
								transform-origin: center;
							"
						>
							<tspan x="120" y="60">${this.options.text}</tspan>
							<tspan x="116" y="80">${time}</tspan>
						</text>
					</svg>`;
	const base64Url = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgStr)))}`;
	this.maskDiv.style.background = "URL(" + base64Url + ")";
	this.domNode.appendChild(this.maskDiv);
};

Watermark.prototype.monitor = function() {
	let body = document.getElementsByTagName("body")[0];
	let options = {
		childList: true,
		attributes: true,
		characterData: true,
		subtree: true,
		attributeOldValue: true,
		characterDataOldValue: true
	};
	this.observer = new MutationObserver(callback);
	let self = this;
	this.observer.observe(body, options); // 监听body节点

	function callback(mutations) {
		if (mutations[0].target.id === "watermark") {
			self.domNode.removeChild(self.maskDiv);
		}
		if (mutations[0].attributeName === "id") {
			self.domNode.removeChild(self.maskDiv);
			self.initWaterMarker();
		}
		if (mutations[0].removedNodes[0] && mutations[0].removedNodes[0].id === "watermark") {
			self.initWaterMarker();
		}
	}
};

Watermark.prototype.clear = function() {
	if (this.observer) {
		this.observer.disconnect();
	}
	this.domNode.removeChild(this.maskDiv);
};

function watermark(options = {}) {
	if (!options.el) {
		options.el = this.$el;
	}
	let watermark = new Watermark(options);

	this.$once("hook:destroyed", () => {
		if (watermark) {
			watermark.clear();
			watermark = null;
		}
	});

}

export default {
	watermark: watermark,
	install(Vue) {
		Vue.prototype.$watermark = watermark;
	},
};
