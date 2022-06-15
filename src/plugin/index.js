import Vue from "vue";

// extend use
import directives from "./directives";
Vue.use(directives);
import drawer from "../extend/drawer";
Vue.use(drawer);
import modal from "../extend/modal";
Vue.use(modal);

// component
import scrollBar from '../components/scrollBar';
import '../components/scrollBar/index.less';
Vue.component('scroll-bar', scrollBar);

// prototype
import {
	Modal,
	message
} from "ant-design-vue";
import moment from "moment";
import request from '../assets/utils/request';
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$message = message;
Vue.prototype.$moment = moment;
Vue.prototype.$request = request;
// Bus
Vue.prototype.$Bus = new Vue();
