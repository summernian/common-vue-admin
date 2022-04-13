import Vue from "vue";

// extend use
import directives from "@/plugin/directives";
import drawer from "@/extend/drawer";
import modal from "@/extend/modal";
Vue.use(directives);
Vue.use(drawer);
Vue.use(modal);

// component
import scrollBar from '@/components/scrollBar';
import '@/components/scrollBar/index.scss';
Vue.component('scroll-bar', scrollBar);

// prototype
import moment from "moment";
import request from '@/assets/utils/request';
import { Modal, message } from "ant-design-vue";
Vue.prototype.$moment = moment;
Vue.prototype.$message = message;
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$request = request;