// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import moment from 'moment'//时间管理器
import router from '@/common/router.js';//路由
import store from '@/common/vuex.js'//全局仓储
import https from '@/common/https.js' //http请求
import global from '@/common/global.js' //全局方法
import Antd from 'ant-design-vue';

import 'ant-design-vue/dist/antd.css';
import '@/common/style/global.scss';
// import '../config.scss';

Vue.config.productionTip = false
Vue.prototype.$http = https;
Vue.prototype.$global = global;
Vue.prototype.$store = store;
Vue.prototype.$moment = moment;

Vue.use(Antd);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
