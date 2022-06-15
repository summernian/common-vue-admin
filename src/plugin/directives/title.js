const title = {
	bind(el) {
		const {
			className
		} = el;
		el.className = className + " title";
	},
	inserted(el) {
		const {
			clientWidth,
			scrollWidth,
			title
		} = el;
		if (!title && scrollWidth > clientWidth) el.title = el.innerText;
	},
	componentUpdated(el) {
		const {
			clientWidth,
			scrollWidth,
			title
		} = el;
		if (!title && scrollWidth > clientWidth) el.title = el.innerText;
	}
}
export default title;
