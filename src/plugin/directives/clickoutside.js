const clickoutside = {
	bind(el, binding) {
		const documentHandler = (e) => {
			if (el.contains(e.target)) return false;
			if (binding.expression) {
				binding.value(e);
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
