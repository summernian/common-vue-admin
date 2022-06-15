// time是毫秒
const setCookie = (name, value, time) => {
	let exp = new Date();
	exp.setTime(exp.getTime() + time);
	document.cookie =
		name + "=" + escape(value) + ";expires=" + exp.toGMTString();
};
const getCookie = (name) => {
	let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	let arr = document.cookie.match(reg);
	if (arr && arr.length) return unescape(arr[2]);
	else return null;
};
const delCookie = (name) => {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};
const deepClone = (obj) => {
	var objClone = Array.isArray(obj) ? [] : {};
	// 进行深拷贝的不能为空，并且是对象或者是
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
const trim = (string) => {
	return (string || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "");
};
const hasClass = (el, cls) => {
	if (!el || !cls) return false;
	if (cls.indexOf(" ") !== -1)
		throw new Error("className should not contain space.");
	if (el.classList) {
		return el.classList.contains(cls);
	} else {
		return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
	}
};
const addClass = (el, cls) => {
	if (!el) return;
	let curClass = el.className;
	let classes = (cls || "").split(" ");

	for (let i = 0, j = classes.length; i < j; i++) {
		const clsName = classes[i];
		if (!clsName) continue;

		if (el.classList) {
			el.classList.add(clsName);
		} else if (!hasClass(el, clsName)) {
			curClass += " " + clsName;
		}
	}
	if (!el.classList) {
		el.setAttribute("class", curClass);
	}
};
const removeClass = (el, cls) => {
	if (!el || !cls) return;
	let classes = cls.split(" ");
	let curClass = " " + el.className + " ";

	for (let i = 0, j = classes.length; i < j; i++) {
		const clsName = classes[i];
		if (!clsName) continue;

		if (el.classList) {
			el.classList.remove(clsName);
		} else if (hasClass(el, clsName)) {
			curClass = curClass.replace(" " + clsName + " ", " ");
		}
	}
	if (!el.classList) {
		el.setAttribute("class", trim(curClass));
	}
};
const formatDate = (time, seperator) => {
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
const formatTime = (time, seperator) => {
	const date = time ? new Date(time) : new Date();
	const s = seperator ? seperator : "-";
	let hour = date.getHours();
	let min = date.getMinutes();
	let sec = date.getSeconds();
	if (hour < 10) hour = "0" + hour;
	if (min < 10) min = "0" + min;
	if (sec < 10) sec = "0" + sec;
	return hour + s + min + s + sec;
};
const getFileSize = (fileByte) => {
	let fileSizeByte = fileByte || 0;
	let fileSizeMsg = "";
	if (fileSizeByte < 1048576)
		fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + "KB";
	else if (fileSizeByte == 1048576) fileSizeMsg = "1MB";
	else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824)
		fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + "MB";
	else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824)
		fileSizeMsg = "1GB";
	else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776)
		fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + "GB";
	else fileSizeMsg = "文件超过1TB";
	return fileSizeMsg;
};
const merge = (target) => {
	for (let i = 1, j = arguments.length; i < j; i++) {
		let source = arguments[i] || {};
		for (let prop in source) {
			if (source.hasOwnProperty(prop)) {
				let value = source[prop];
				if (value !== undefined) target[prop] = value;
			}
		}
	}
	return target;
};
const deepMerge = (target, source) => { // 深度合并对象
	for (let key in source) {
		target[key] = target[key] && target[key].toString() === "[object Object]" ?
			deepMerge(target[key], source[key]) : target[key] = source[key];
	}
	return target;
}
const copyToClip = (content, fn) => {
	const aux = document.createElement("input");
	aux.setAttribute("value", content);
	document.body.appendChild(aux);
	aux.select();
	document.execCommand("copy");
	document.body.removeChild(aux);
	fn && fn();
};
const downloadAttachment = (res, fileName) => {
	const content = res;
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

export {
	setCookie,
	getCookie,
	delCookie,
	deepClone,
	hasClass,
	addClass,
	removeClass,
	formatDate,
	formatTime,
	getFileSize,
	merge,
	deepMerge,
	copyToClip,
	downloadAttachment
};
