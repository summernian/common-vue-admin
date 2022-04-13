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
 * @param {Function} func
 * @param {number} delay
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, delay, immediate = false) {
	let timer,
		context = this;
	return (...args) => {
		if (immediate) {
			func.apply(context, args);
			immediate = false;
			return;
		}
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(context, args);
		}, delay);
	};
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