import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

// 一.从router文件里导入路由-7
import router from "./router/router.js"

// 
new Vue({
  router,//一.挂载路由-8
  render: h => h(App),
}).$mount('#app')
