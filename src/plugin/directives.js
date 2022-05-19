import clickoutside from "@/plugin/clickoutside";

const directives = {
  clickoutside,
};

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key]);
    });
  },
};
