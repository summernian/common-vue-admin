import clickoutside from "./clickoutside";
import waterMarker from "./waterMarker";
import title from "./title";
import lazy from "./lazy";

const directives = {
  clickoutside,
  waterMarker,
  title,
  lazy,
};

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key]);
    });
  },
};
