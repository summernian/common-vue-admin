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
export function debounce(fn, delay = 200, immediate = false) {
	let timer,
		context = this;
	return (...args) => {
		// immediate 为 true 立即执行
		if (immediate && !timer) {
			fn.apply(context, args);
		}
		timer && clearTimeout(timer);
		timer = setTimeout(() => {
			// 加上if判断，当立即执行时，后续延迟时间内不再执行
			// 即immediate为true时，点击立即执行fn，delay内勿论点击多少次都不会再执行函数，仅执行最开始的一次。
			// 该操作可防止多次点击，但不符合操作习惯，因为用户操作时，只有最开始操作有效，后续的操作都会无效，会对用户产生操作误解。
			// 故不作if判断
			// if(!immediate) {
			// 	fn.apply(context, args);
			// }
			// timer = null;
			
			// 不加if判断，immediate为true时，立即执行，delay内勿论点击多少次都不会再执行函数，delay后再执行一次，该操作会执行两次fn。
			// 若需要只执行一次，那么immediate设为false，只在最后那次触发。本操作为适用场景如：防止二次点击。
			fn.apply(context, args);
			timer = null;
			
			// 若系统有此类适用场景
			// 即老子特么就是要设置immediate为true，但老子即想它只执行最开始那次，后续都不执行，又想某些地方它执行两次
			// 那再加个参数做相应判断。
			// 此处不做处理，因为没这种智障需求。
		}, delay);
	};
}

/**
 * 函数节流
 * @param {Function} fn
 * @param {number} wait 延迟执行毫秒数
 * @param {boolean} immediate
 */
export function throttle(fn, wait = 200, immediate = true) {
	let timer, context, args;
	//延迟函数
	const later = () => {	
		timer = setTimeout(() => {
			//使用之前缓存的参数和上下文
			fn.apply(context, args);
			// 清除缓存的参数和上下文
			context = args = null;
			//清除定时器
			clearTimeout(timer); 
			//延迟函数执行完毕，清空缓存的定时器序号
			timer = null; 
		}, wait)
	}
	//返回的是每次实际调用的函数
	return function(...params) { 
		context = this;
		args = params
		if (!timer) { //没有创建的延迟函数，就创建一个
			if (immediate) { //立即执行，调用函数
				fn.apply(this, params)
			}
			//如果不是立即执行函数或者刚调用完函数，缓存函数，调用上下文
			later();
		}
	}
}

/**
 * 去除前后空格
 * @param {String} str
 * @return {String}
 */
export function trim(str) {
	return (str || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "");
};

/**
 * 深拷贝
 * @param {Array、Object} obj
 * @return {*}
 */
export function deepClone(obj) {
	let objClone = Array.isArray(obj) ? [] : {};
	// 进行深拷贝的不能为空，并且是对象或者是数组
	if (obj && typeof obj === "object") {
		for (let key in obj) {
			if (key in obj) {
				if (obj[key] && typeof obj[key] === "object") {
					objClone[key] = deepClone(obj[key]);
				} else {
					objClone[key] = obj[key];
				}
			}
		}
	}
	return objClone;
};

/**
 * 格式化日期
 * @param {String} time
 * @param {String} seperator
 * @return {*}
 */
export function formatDate(time, seperator) {
	const date = time ? new Date(time) : new Date();
	const s = seperator ? seperator : "-";
	const year = date.getFullYear();
	let month = date.getMonth() + 1;
	let strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	return year + s + month + s + strDate;
};

/**
 * 格式化时间
 * @param {String} time
 * @param {String} seperator
 * @return {*}
 */
export function formatTime(time, seperator) {
	const date = time ? new Date(time) : new Date();
	const s = seperator ? seperator : ":";
	let hour = date.getHours();
	let min = date.getMinutes();
	let sec = date.getSeconds();
	if (hour < 10) hour = "0" + hour;
	if (min < 10) min = "0" + min;
	if (sec < 10) sec = "0" + sec;
	return hour + s + min + s + sec;
};

// 自定义格式化
/**
 * @param {*} date
 * @param {*} format
 * @return {*}
 * YYYY -年
 * MM -月
 * dd -日
 * HH -24小时
 * mm -分钟
 * ss -秒
 */
export function dateFormat(date, format) {
  if (!date) return date
  const datetime = new Date(date)
  const opt = {
    'Y+': datetime.getFullYear().toString(),
    'M+': (datetime.getMonth() + 1).toString(),
    'd+': datetime.getDate().toString(),
    'H+': datetime.getHours().toString(),
    'm+': datetime.getMinutes().toString(),
    's+': datetime.getSeconds().toString()
  }
  Object.keys(opt).forEach(k => {
    const ret = new RegExp('(' + k + ')').exec(format)
    if (ret) {
      format = format.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    }
  })
  return format
}

// 获取时间戳
export function getDateTime(date) {
  if (!date) return date
  return new Date(date).getTime()
}

// 日期参数
const timeUnit = {
  d: 24 * 60 * 60 * 1000,
  h: 60 * 60 * 1000,
  m: 60 * 1000,
  s: 1000
}

/**
 * 获取xxx后的时间
 * @param {*} date
 * @param {*} exp 表达式，数字 加 单位后缀 d、h、m、s
 * @returns unix
 */
export function addDate(date, exp) {
  if (!date) return date;
  
  const datetime = getDateTime(date);
  const type = exp.slice(-1);
  if (!exp || Object.keys(timeUnit).indexOf(type) === -1) return datetime;
  
  return datetime + parseFloat(exp) * timeUnit[type];
}

/**
 * 获取xxx前的时间
 * @param {*} date
 * @param {*} exp 表达式，数字 加 单位后缀 d、h、m、s
 * @returns unix
 */
export function subDate(date, exp) {
  if (!date) return date;
  
  const datetime = getDateTime(date);
  const type = exp.slice(-1);
  if (!exp || Object.keys(timeUnit).indexOf(type) === -1) return datetime;
  
  return Math.max(0, datetime - parseFloat(exp) * timeUnit[type]);
}

/**
 * 千分位转换  10000 => 10,000
 * @param {Number} number
 * @param {String} split 千分号
 * @return {*}
 */
export function toThousand(number, split = ',') {
  return typeof number !== 'number' ? number : String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 小数点转百分号
 * @param {*} decimal 小数
 * @param {*} point 保留小数点
 * @param {*} type 转换的类型 1-字符串 0-数字
 */
export function toPercentage(decimal, point = 1, type = 1) {
	if (typeof decimal !== 'number' || point < 0) return decimal;
	const percentage = decimal === 0 ? 0 : (Math.round(decimal * Math.pow(10, 2 + point)) / Math.pow(10, point)).toFixed(point);
	return type === 1 ? percentage.toString() + '%' : point > 0 ? parseFloat(percentage) : parseInt(percentage, 10);
}

/**
 * json 对象转FormData
 * @param val
 * @returns {FormData}
 */
export function toFormData(obj) {
  const formData = new FormData()
	Object.keys(obj).forEach((key) => {
		if (obj[key] instanceof Array) {
			obj[key].forEach((item) => {
				formData.append(key, item)
			});
			return
		}
		formData.append(key, obj[key])
	})
	return formData;
}

/**
 * 剪切板
 * @param {String} content
 * @param {Function} fn
 * @return {*}
 */
export function clipboards(content, fn) {
	const aux = document.createElement("input");
	aux.setAttribute("value", content);
	document.body.appendChild(aux);
	aux.select();
	document.execCommand("copy");
	document.body.removeChild(aux);
	fn && fn();
};

/**
 * 下载文件
 * @param {files} file 文件流
 * @param {String} fileName 文件名
 * @return {? or file} 
 */
export function dowloadFile(file, fileName) {
	const content = file;
	const blob = new Blob([content]);
	let userAgent = navigator.userAgent;
	let isEdge = userAgent.indexOf("Edge") > -1; // 判断是否IE的Edge浏览器
	if (isEdge) {
		// Edge下载
		navigator.msSaveBlob(blob, fileName);
	} else {
		// 非Edge下载
		const elink = document.createElement("a");
		elink.download = fileName;
		elink.style.display = "none";
		elink.href = URL.createObjectURL(blob);
		document.body.appendChild(elink);
		elink.click();
		window.URL.revokeObjectURL(elink.href); // 释放URL blob对象
		document.body.removeChild(elink);
	}
	return content;
};

/**
 * 获取标题
 * @param {String} pageTitle
 * @return {String}
 */
export function getPageTitle(pageTitle) {
	const title = process.env.VUE_APP_BASE_NAME || 'Vue Antdv Admin App';
	if (pageTitle) {
		return `${pageTitle} - ${title}`;
	}
	return title;
}

/**
 * 全屏
 */
export function fullScreen() {
	let el = document.documentElement; // 获取需要全屏显示的元素
	let rfs = el.requestFullScreen
	|| el.webkitRequestFullScreen
	|| el.mozRequestFullScreen
	|| el.msRequestFullScreen;
	// 获取实现全屏的方法，此处兼容了火狐、谷歌、IE、safari浏览器
	if (typeof rfs != "undefined" && rfs) {
		rfs.call(el)
		return
	}
	if (typeof window.ActiveXObject != "undefined") {
		let wscript = new ActiveXObject("WScript.Shell") // 取得系统目录 
		if (wscript) {
			wscript.SendKeys("{F11}") 
		}
	}
}

/**
 * 退出全屏
 */
export function exitFullScreen() {
	let el = document;
	let cfs = el.cancelFullScreen
	|| el.webkitExitFullscreen
	|| el.mozCancelFullScreen
	|| el.oRequestFullscreen
	|| el.msExitFullscreen
	|| el.exitFullscreen;
	if (typeof cfs != "undefined" && cfs) {
		cfs.call(el)
		return
	}
	if (typeof window.ActiveXObject != "undefined") {
		let wscript = new ActiveXObject("WScript.Shell")
		if (wscript != null) {
			wscript.SendKeys("{F11}")
		}
	}
}
