// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './utils/createStore'; // 引入全局store

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store, // store 会在每一个component中注入
  router,
  components: { App },
  template: '<App/>',
});
