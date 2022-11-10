/**
 * 用于将地址后面的参数转换成对象返回
 * @param {string} url
 * @returns {Object}
 */
export function paramObj(url) {
	const search = url.split('?')[1];
	if (!search) {
		return {};
	}
	return JSON.parse(
		'{"' +
		decodeURIComponent(search)
		.replace(/"/g, '\\"')
		.replace(/&/g, '","')
		.replace(/=/g, '":"')
		.replace(/\+/g, ' ') +
		'"}'
	);
}

/**
 * 函数防抖
 * @param {Function} fn
 * @param {number} delay
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(fn, delay = 600, immediate = false) {
	let timer,
		context = this;
	return (...args) => {
		if (immediate) {
			fn.apply(context, args);
			immediate = false;
			return;
		}
		timer && clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(context, args);
		}, delay);
	};
}

/**
 * 函数节流
 * @param {Function} fn
 * @param {number} wait 延迟执行毫秒数
 * @param {boolean} immediate
 */
export function throttle(fn, wait = 200, immediate = false) {
	let timer,
		previous = 0,
		context = this;
	return (...args) => {
		if (immediate) {
			let now = Date.now();
			if (now - previous > wait) {
				fn.apply(context, args);
				previous = now;
			}
		} else {
			// 定时器不存在时，才会执行
			if (!timer) {
				timer = setTimeout(() => {
					fn.apply(context, args)
					timer = null;
					// 不能使用这个清除，因为清除定时器，但是timer值还是不变，不是null
					// clearTimeout(timer)  
				}, wait);
			}
		}
	}
}

/**
 * 获取标题
 * @param {String} pageTitle
 * @return {*}
 */
export function getPageTitle(pageTitle) {
	const title = process.env.VUE_APP_BASE_NAME || 'Vue Antdv Admin App';
	if (pageTitle) {
		return `${pageTitle} - ${title}`;
	}
	return title;
}
