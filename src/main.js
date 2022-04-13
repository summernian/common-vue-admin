import Vue from 'vue';
import App from './App.vue';

import '@/assets/css/index.less'; // css 全局

import './permission'; // 路由导航守卫

// antd全局引入
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
// Vue.use(Antd);

// antd按需加载
import "@/plugin/antd";
// extend、component; use、prototype;
import "@/plugin/init";

// 路由 + vuex
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
