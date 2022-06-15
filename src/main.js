import Vue from 'vue';
import App from './App.vue';

// css 全局
import './assets/css/index.less'; 

// antd全局引入
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
// Vue.use(Antd);

// antd按需加载
import "./assets/js/antd";
// extend、component; use、prototype;
import "./plugin";

// 路由 + vuex
import router from './router';
import store from './store';

// 路由导航守卫+权限判断
import './permission'; 

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
