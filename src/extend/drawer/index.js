import Vue from "vue";
import { Drawer } from "ant-design-vue";


// 这里不能使用箭头函数
// 防止this指向问题
function drawer(options) {
  options = options || {}

  const {
    content,
    beforeClose
  } = options || {};

  const bind = Object.keys(options).filter((key) => !['content', 'beforeClose'].includes(key)).reduce((res, key) => {
    res[key] = options[key]
    return res;
  }, {})

  const el = document.createElement("div");
  el.setAttribute("class", "drawer-container");
  document.body.appendChild(el);
  let instance = new Vue({
    // 设置父级指向为调用环境
    // 为了共享vuex和语言环境
    parent: this,
    data: {
      visible: true
    },
    methods: {
      close() {
        beforeClose && typeof beforeClose === 'function' ? beforeClose(this) : '';
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
        Drawer,
        {
          props: {
            visible: self.visible,
            ...bind
          },
          on: {
            close: self.close,
          }
        },
        typeof content === "string"
          ? content
          : (
            typeof content === "function"
              ? [content(h)]
              : [h(content, null, null)]
          )
      );
    }
  });

  // 组件注销后需要注销抽屉
  if (this.$once && typeof this.$once === 'function') {
    this.$once("hook:destroyed", () => {
      if (instance) {
        instance.close()
      }
    });
  }

  instance.$mount(el);
  return instance;
}

export default {
  drawer: drawer,
  install(Vue) {
    Vue.prototype.$drawer = drawer;
  },
};