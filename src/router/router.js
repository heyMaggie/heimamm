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
import date from "../views/index/date/date.vue"
import userlist from "../views/index/userlist/userlist.vue"
import item from "../views/index/item/item.vue"
import enterprise from "../views/index/enterprise/enterprise.vue"
import subject from "../views/index/subject/subject.vue"


// 4-路由规则
const routes = [
    { path: '/login', componenterprise: login },//登录页规则
    {
        path: '/index', component: index,
        children: [
            {
                path: 'date',
                component: date
            },
            {
                path: 'userlist',
                component: userlist
            },
            {
                path: 'item',
                component: item
            },
            {
                path: 'enterprise',
                component: enterprise
            },
            {
                path: 'subject',
                component: subject
            },
        ]
    },//首页规则
]

// 5-实例路由
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

// 6-暴露路由
export default router;