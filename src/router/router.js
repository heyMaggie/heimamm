// 一 
//1-导入
import Vue from 'vue'
import VueRouter from 'vue-router'

// 2-使用
Vue.use(VueRouter)

// 3-导入组件
import login from "../views/login/login.vue"

// 4-路由规则
const routes = [
    { path: '/login', component: login },
]

// 5-实例路由
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

// 6-暴露路由
export default router;