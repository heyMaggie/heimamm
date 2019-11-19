import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

// 一.导入路由-7
import router from "./router/router.js"
// 二.导入Element-ui;
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 三.导入全局css样式
import "../src/style/base.css"



// 
new Vue({
  router,//一.挂载路由-8
  render: h => h(App),
}).$mount('#app')
