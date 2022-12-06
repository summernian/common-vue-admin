import Vue from "vue";
import {
	Modal
} from "ant-design-vue";

const Extend = Vue.extend();
// 这里不能使用箭头函数
// 防止this指向问题
function modal(options) {
	options = options || {}

	const {
		content,
		cancelType,
	} = options || {};

	const bind = Object.keys(options).filter(key => !['content', 'cancelType'].includes(key)).reduce((res, key) => {
		res[key] = options[key]
		return res;
	}, {})

	if (!bind.cancelButtonProps) {
		bind.cancelButtonProps = {
			props: {
				type: cancelType
			}
		};
	}
	const el = document.createElement("div");
	el.setAttribute("class", "modal-container");
	document.body.appendChild(el);
	let instance = new Extend({
		// 设置父级指向为调用环境
		// 为了共享vuex和语言环境
		parent: this,
		data: {
			visible: true
		},
		methods: {
			close() {
				this.$data.visible = false;
				setTimeout(async () => {
					this.$destroy();
				}, 400);
			}
		},
		render(h) {
			const self = this;
			return h(
				Modal, {
					props: {
						visible: self.visible,
						...bind,
					},

					on: {
						cancel: self.close,
						ok: bind.onOk || (() => '')
					}
				},

				typeof content === "string" ?
				content :
				(
					typeof content === "function" ?
					[content(h)] :
					[h(content, null, null)]
				)
			);
		}
	});
	instance.$mount(el);
	return instance;
}

export default {
	modal: modal,
	install(Vue) {
		Vue.prototype.$modal = modal;
	},
};
