/**
 * 设置sessionStorage
 * @param {string} key
 * @param {any} value
 */
export function setCache(key, value) {
	if (value == undefined || value == null) {
		window.sessionStorage.setItem(key, value);
	} else {
		window.sessionStorage.setItem(key, JSON.stringify(value));
	}
}

/**
 * 获取sessionStorage
 * @param {string} key
 * @returns {any}
 */
export function getCache(key) {
	if (window.sessionStorage.getItem(key) == 'undefined' || window.sessionStorage.getItem(key) == null) {
		return undefined;
	}
	return JSON.parse(window.sessionStorage.getItem(key));
}

/**
 * 清除指定sessionStorage
 * @param {string} key
 */
export function removeCache(key) {
	return window.sessionStorage.removeItem(key);
}

/**
 * 清除所有sessionStorage
 */
export function removeAll(key) {
	return window.sessionStorage.clear();
}


/**
 * 设置cookie
 * @param {string} key
 * @param {number} time: ms
 * @param {any} value
 */
export function setCookie(key, value, time) {
	time = seconds || 0; //seconds有值就直接赋值，没有为0，这个根php不一样。
	let expires = "";
	if (time != 0) { //设置cookie生存时间
		let exp = new Date();
		exp.setTime(exp.getTime() + time);
		expires = "; expires=" + exp.toGMTString();
	}
	document.cookie = name + "=" + escape(value) + expires + "; path=/"; //转码并赋值
}

/**
 * 获取cookie
 * @param {string} key
 * @param {any} value
 */
export function getCookie(key) {
	let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	let arr = document.cookie.match(reg);
	if (arr && arr.length) return unescape(arr[2]);
	else return null;
}

/**
 * 删除cookie
 * @param {string} key
 */
export function delCookie(key) {
	let exp = new Date();
	exp.setTime(exp.getTime() - 1);
	let cval = getCookie(name);
	if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
