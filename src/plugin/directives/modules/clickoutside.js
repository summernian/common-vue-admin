const clickoutside = {
	bind(el, { expression, value }) {
		const documentHandler = (e) => {
			if (el.contains(e.target)) return false;
			if (expression) {
				value(e);
			}
		};
		el.documentHandler = documentHandler;
		document.addEventListener("click", documentHandler, false);
	},
	unbind(el) {
		document.removeEventListener("click", el.documentHandler, false);
		delete el.documentHandler;
	},
};

export default clickoutside;