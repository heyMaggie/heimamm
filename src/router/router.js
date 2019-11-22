// 一 
//1-导入
import Vue from 'vue'
import VueRouter from 'vue-router'

// 2-使用
Vue.use(VueRouter)

// 3-导入组件
//01-首页组件
import login from "../views/login/login.vue"
//02-登录组件
import index from "../views/index/index.vue"


// 4-路由规则
const routes = [
    { path: '/login', component: login },//登录页规则
    { path: '/index', component: index },//首页规则
]

// 5-实例路由
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

// 6-暴露路由
export default router;