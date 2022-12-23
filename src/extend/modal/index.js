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
	
	let instance = new Extend({
		// 设置父级指向为调用环境, 为了共享vuex和语言环境
		parent: this,
		data: {
			visible: true
		},
		methods: {
			close() {
				this.$data.visible = false;
				setTimeout(async () => {
					this.$destroy();
					instance = null;
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
	
	// 组件注销后需要注销modal (场景： 点开弹层后，路由回退，如果不注销，弹框就会一直存在)
	if (this.$once && typeof this.$once === 'function') {
		this.$once("hook:destroyed", () => {
			if (instance) {
				instance.close()
			}
		});
	}
	
	const el = document.createElement("div");
	el.setAttribute("class", "modal-container");
	document.body.appendChild(el);
	
	instance.$mount(el);
	return instance;
}

// 接收参数及函数调用
// 例：this.$modal.fn({a: 1}) => 则：console: ({a: 1}, 'aaa')
// 此类用法可全局调用，比如多个弹窗统一关闭（ modal.closeAll() ）
// 有需求再改，暂时用不到，标记一下
// modal.fn = (opt) => {
// 	console.log(opt, 'aaa');
// }

export default {
	modal: modal,
	install(Vue) {
		Vue.prototype.$modal = modal;
	},
};
