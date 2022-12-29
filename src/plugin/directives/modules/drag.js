const drag = {
	bind(el) {
		const dragHead = el.querySelector('.dragger-handler');
		const dragDom = el.querySelector('.dragger-wrapper') || el;
		dragHead.style.cursor = 'move';
		dragDom.style.position = 'absolute';
		// dragDom.style.zIndex = 9999;
		dragDom.style.zIndex = 1;
		// dragHead.style.cssText += ';cursor: move;';
		// dragDom.style.cssText += ';position: fixed;z-index: 9999;';

		// 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
		const sty = (function() {
			if (window.document.currentStyle) {
				return (dom, attr) => dom.currentStyle[attr];
			} else {
				return (dom, attr) => getComputedStyle(dom, false)[attr];
			}
		})();

		dragHead.onmousedown = (e) => {
			// 鼠标按下，计算当前元素距离可视区的距离
			const disX = e.clientX - dragHead.offsetLeft;
			const disY = e.clientY - dragHead.offsetTop;

			// 区域宽度，未设置则为body当前宽度
			const screenWidth = dragDom.parentNode.clientWidth || document.body.clientWidth; 
			// 区域高度，未设置则是body高度，可某些环境下无法获取)
			const screenHeight = dragDom.parentNode.clientHeight || document.documentElement.clientHeight; 

			const dragDomWidth = dragDom.offsetWidth; // 对话框宽度
			const dragDomheight = dragDom.offsetHeight; // 对话框高度

			const minDragDomLeft = dragDom.offsetLeft;
			const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

			//距离头部距离
			const topGap = 0;

			const minDragDomTop = dragDom.offsetTop - topGap;
			const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;

			// 获取到的值带px 正则匹配替换
			let styL = sty(dragDom, 'left');
			let styT = sty(dragDom, 'top');

			// 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
			if (styL.includes('%')) {
				styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100);
				styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100);
			} else {
				styL = +styL.replace(/\px/g, '');
				styT = +styT.replace(/\px/g, '');
			}

			document.onmousemove = function(e) {
				// 通过事件委托，计算移动的距离
				let left = e.clientX - disX;
				let top = e.clientY - disY;

				// 边界处理
				if (-left > minDragDomLeft) {
					left = -minDragDomLeft;
				} else if (left > maxDragDomLeft) {
					left = maxDragDomLeft;
				}

				if (-top > minDragDomTop) {
					top = -minDragDomTop;
				} else if (top > maxDragDomTop) {
					top = maxDragDomTop;
				}

				// 移动当前元素
				dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
			};

			document.onmouseup = function(e) {
				document.onmousemove = null;
				document.onmouseup = null;
			};
			return false;
		};
	}
}

export default drag;