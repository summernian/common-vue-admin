import Vue from "vue";
import nioLoading from "@/components/common/nio-loading";

let NioLoadingConstructor = Vue.extend(nioLoading);

let instance;

const NioLoading = (options) => {
  options = options || {};
  if (typeof options === "string") {
    options = {
      nioLoading: options,
    };
  }
  instance = new NioLoadingConstructor({
    data: options,
  });
  instance.$mount();
  const loading = document.getElementsByClassName("nio-loading")[0];
  if (loading && loading.parentNode) loading.parentNode.removeChild(loading);
  if (instance.teleport) instance.teleport.appendChild(instance.$el);
  else document.body.appendChild(instance.$el);
  return instance;
};
NioLoading.close = () => {
  if (instance && instance.$el) {
    instance.$el.parentNode &&
      instance.$el.parentNode.removeChild(instance.$el);
  }
};
export default {
  nioLoading: NioLoading,
  install(Vue) {
    Vue.prototype.$nioLoading = NioLoading;
    Vue.nioLoading = NioLoading;
  },
};
