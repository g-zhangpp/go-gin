import NProgress from '@/config/nprogress.ts'

// 1.导入v-router
import {createRouter, createWebHashHistory} from 'vue-router'
import {useMenuStore} from '@/store/modules/menu.ts'

// 定义路由和组件的映射关系
const modules = import.meta.glob('/src/views/**/*.vue')

function resolveComponent(name: string) {
    const key = `/src/views/${name}`   // 拼接成 glob key
    const comp = modules[key]
    if (!comp) {
        console.warn('找不到组件:', key)
    }
    return comp
}


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


// 防止首次刷新页面，路由失效问题
let registerRouteFresh = false
// 路由拦截守卫
router.beforeEach(async (to, _from, next) => {
    // 1.NProgress开始
    NProgress.start()

    const menuStore = useMenuStore()
    if (menuStore.routers.length == 0) {
        // 如果没有缓存路由，则调用后端api，进行缓存
        await menuStore.generateRouter()
    }

    // 2. 如果 Pinia 没有缓存路由，先调用后端接口
    if (!menuStore.routers.length) {
        await menuStore.generateRouter()
    }

    // 3. 动态生成路由（只执行一次）
    if (!registerRouteFresh) {
        const dynamicRoutes: any[] = []

        menuStore.routers.forEach((menu: any) => {
            // 父路由 Layout
            const parentRoute: any = {
                path: menu.path,
                name: menu.name,
                component: () => import('@/views/system/layout/Index.vue'),
                meta: {
                    title: menu.title,
                    icon: menu.web_icon,
                },
                children: [],
            }

            // 子菜单
            menu.sub_menus?.forEach((sub: any) => {
                if (!sub.component_name) return
                const pathParts = sub.path.split('/')
                const subPath = pathParts[pathParts.length - 1]
                let menuChildren = {
                    path: subPath,
                    name: sub.name,
                    component: resolveComponent(sub.component_name),
                    meta: {
                        title: sub.title,
                        icon: sub.web_icon,
                    },

                }
                // console.log(`/src/views/${sub.component_name}`)
                // console.log(menuChildren)
                parentRoute.children.push(menuChildren)
            })

            // 没有子菜单，但自己是页面
            if (!parentRoute.children.length && menu.component_name) {
                console.log(1111111111111)
                parentRoute.children.push({
                    path: '',
                    name: menu.name + 'Index',
                    component: modules[`/src/views/${menu.component_name}`],
                    meta: {
                        title: menu.title,
                        icon: menu.web_icon,
                    },
                })
            }

            // 只 add 合法路由
            if (parentRoute.children.length) {
                dynamicRoutes.push(parentRoute)
            }
        })

        // 注册动态路由
        dynamicRoutes.forEach(r => router.addRoute(r))
        console.log(dynamicRoutes)
        // console.log(router.getRoutes())

        // 标记已经注册
        registerRouteFresh = true

        // 确保刷新或首次访问页面时路由正确跳转
        next({...to, replace: true})
    } else {
        next()
    }

    // 生成动态路由start
    // menuStore.routers.forEach((item:any) => {
    //     // 组装动态路由start
    //     let myRoute: any = {}
    //     myRoute = {
    //         path: item.path,
    //         name: item.name,
    //         meta: {
    //             icon: item.web_icon,
    //             title: item.title,
    //         },
    //         component: ()=>import('@/views/system/layout/Index.vue'),
    //     }
    //     myRoute.children = []
    //     if (item.level ===1 && item.component_name.length!=0) {
    //         myRoute.children.push({
    //             path: item.path,
    //             name: item.name,
    //             meta: {
    //                 icon: item.web_icon,
    //                 title: item.title,
    //             },
    //             component: modules[`@/views/${item.component_name}`],
    //         })
    //     }
    //     if(item.sub_menus){
    //         item.sub_menus.forEach((subItem:any) => {
    //             if(subItem.path) {
    //
    //                 myRoute.children.push({
    //                     path: subItem.path,
    //                     name: subItem.name,
    //                     meta: {
    //                         icon: subItem.web_icon,
    //                         title: subItem.title,
    //                     },
    //                     component: modules[`@/views/${subItem.component_name}`]
    //                 })
    //             }
    //         })
    //     }
    //     routes.push(myRoute)
    //     // 组装动态路由end
    // })
    //
    // if(registerRouteFresh){
    //     routes.forEach(item => {
    //         router.addRoute(item)
    //     })
    //     next({...to, replace:true})
    //     registerRouteFresh = false
    // }else {
    //     next()
    // }
    // 生成动态路由end
})

// 路由跳转结束
router.afterEach(async () => {
    NProgress.done()

})

// 路由跳转失败
router.onError(error => {
    NProgress.done()
    console.warn("路由错误：", error.message)
})

// 导出方法
export default router