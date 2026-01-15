import NProgress from '@/config/nprogress.ts'

// 1.导入v-router
import {createRouter, createWebHashHistory} from 'vue-router'

// 2.定义一个路由地址

const routes = [
    {
        path: '/',
        name: 'Login',
        meta: {title: '后台管理'},
        component: () => import('../views/Login.vue')
    },
    {
        path: '/index',
        name: 'Index',
        component: () => import('../views/system/layout/Index.vue'),
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'Home',
                meta: {title: '首页', icon: 'House'},
                component: () => import('../views/system/home/Index.vue'),
            }
        ]
    },

]

// 3.创建路由实例
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

// 路由拦截守卫
router.beforeEach(async (_to, _from, next) => {
    // 1.NProgress开始
    NProgress.start()
    next()
})

// 路由跳转结束
router.afterEach(() => {
    NProgress.done()
})

// 路由跳转失败
router.onError(error => {
    NProgress.done()
    console.warn("路由错误：", error.message)
})

// 导出方法
export default router