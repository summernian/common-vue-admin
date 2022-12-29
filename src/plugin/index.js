import Vue from "vue";

// Api
import api from '@/api';
Vue.prototype.$api = api;

// Bus
Vue.prototype.$Bus = new Vue();

// Component
import scrollBar from './scrollBar';
import './scrollBar/index.less';
Vue.component('c-scroll', scrollBar);

// Extend Use
import directives from "./directives";
Vue.use(directives);
import drawer from "../extend/drawer";
Vue.use(drawer);
import modal from "../extend/modal";
Vue.use(modal);

// Prototype
import { Modal, message } from "ant-design-vue";
Vue.prototype.$confirm = Modal.confirm;

message.config({
	duration: 2,// 提示时常单位为s
  	maxCount: 3, // 最多显示提示信息条数(后面的会替换前面的提示)
});
Vue.prototype.$message = message;

import request from '../utils/request';
Vue.prototype.$request = request;

import moment from "moment";
Vue.prototype.$moment = moment;

// SvgIcon
import './svgIcons';

// WaterMarker
import watermark from './watermark';
Vue.use(watermark);