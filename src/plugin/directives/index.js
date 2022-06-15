import clickoutside from "./clickoutside";
import title from "./title";

const directives = {
  clickoutside,
  title,
};

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key]);
    });
  },
};
