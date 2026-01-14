// 1.导入v-router
import {createRouter, createWebHashHistory} from 'vue-router'

// 2.定义一个路由地址

const routes = [{
    path: '/',
    name: 'Login',
    meta:{title: '后台管理'},
    component: ()=>import('../views/Login.vue')
}]

// 3.创建路由实例
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

// 导出方法
export default router