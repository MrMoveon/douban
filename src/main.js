// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import Mint from 'mint-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from './components/loading'
import 'mint-ui/lib/style.css'
import './assets/less/style.less'
import './lib/swiper/css/swiper.css';
Vue.config.productionTip = false
Vue.use(Mint)
Vue.use(VueAxios,axios)
Vue.use(Loading);


axios.interceptors.request.use(function (config) {  //配置发送请求的信息
 store.dispatch('showLoading');
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => { //配置请求回来的信息
  store.dispatch('hideLoading');
  return response;
},(error) =>{
  return Promise.reject(error);
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
