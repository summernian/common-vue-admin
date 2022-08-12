import defaultImage from '@/assets/images/logo.png';
const lazy = {
	bind(el, binding) {
		el.setAttribute('data-src', binding.value);
		el.setAttribute('src', defaultImage);
	},
	inserted(el) {
		if(!!window.ActiveXObject || "ActiveXObject" in window) {
			// ie环境
			lazy.listenerScroll(el);
		} else {
			lazy.observe(el);
		}
	},
	// 利用IntersectionObserver监听el
	observe(el) {
		let realSrc = el.dataset.src;
		let observer = new IntersectionObserver((entries, self) => {
			// 遍历
			for (let i of entries) {
				// 如果改元素处于可视区
				if (i.isIntersecting || i.intersectionRatio > 0) {
					// 获取该元素
					let img = i.target;
					// 重新设置src值
					img.src = realSrc;
					img.onerror = () => {
						img.src = defaultImage;
						console.error('图片加载失败, 图片路径：', realSrc);
					}
					img.removeAttribute('data-src');
					//取消对该元素的观察
					self.unobserve(img);
				}
			}
		})
		observer.observe(el)
	},
	// 监听scroll事件
	listenerScroll(el) {
		const handler = lazy.throttle(lazy.load, 300);
		// 页面加载就执行一次， 否则懒加载不生效
		lazy.load(el); 
		// 监听滚动事件，vue需要增加第三个函数true，否则监听不到
		window.addEventListener('scroll', () => void handler(el), true);
	},
	// 加载真实图片 
	load(el) {
		const windowHeight = document.documentElement.clientHeight;
		const elTop = el.getBoundingClientRect().top;
		const elBtm = el.getBoundingClientRect().bottom;
		let realSrc = el.dataset.src;
		if (elTop - windowHeight < 0 && elBtm > 0) {
			if (realSrc) {
				el.src = realSrc;
				el.onerror = () => {
					el.src = defaultImage;
					console.error('图片加载失败, 图片路径：', realSrc);
				}
				el.removeAttribute('data-src');
			}
		}
	},
	// 节流 
	throttle(fn, delay) {
		let timer;
		let prevTime;
		return function(...args) {
			const currTime = Date.now();
			const context = this;
			if (!prevTime) prevTime = currTime;
			clearTimeout(timer);
	
			if (currTime - prevTime > delay) {
				prevTime = currTime;
				fn.apply(context, args);
				clearTimeout(timer);
				return
			}
			
			timer = setTimeout(function() {
				prevTime = Date.now();
				timer = null;
				fn.apply(context, args);
			}, delay);
		}
	},
}
export default lazy