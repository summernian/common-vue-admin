import Vue from "vue";
// Api
import api from '@/api';
Vue.prototype.$api = api;
// Bus
Vue.prototype.$Bus = new Vue();
// Component
import scrollBar from '../components/scrollBar';
import '../components/scrollBar/index.less';
Vue.component('scroll-bar', scrollBar);
// Extend Use
import directives from "./directives";
Vue.use(directives);
import drawer from "../extend/drawer";
Vue.use(drawer);
import modal from "../extend/modal";
Vue.use(modal);
// Prototype
import { Modal, message } from "ant-design-vue";
import moment from "moment";
import request from '../utils/request';
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$message = message;
Vue.prototype.$moment = moment;
Vue.prototype.$request = request;