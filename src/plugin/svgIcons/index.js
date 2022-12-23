import Vue from 'vue';
import SvgIcon from './SvgIcon';
Vue.component('c-svg-icon', SvgIcon);

// 加载svg资源
const requireSvg = reqireContext => reqireContext.keys().map(reqireContext);
const req = require.context('./svg', false, /\.svg$/);
requireSvg(req);