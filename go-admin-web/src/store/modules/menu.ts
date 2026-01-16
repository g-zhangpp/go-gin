import { defineStore } from 'pinia'
import {getMenuListApi} from "@/api/system/menu/menu.ts";

export const useMenuStore = defineStore('menuState', {
    state:()=>({
        register: false, // 路由是否注册
        routers: [] // 路由数据
    }),
    getters: {},
    actions: {
        // 生成路由
        async generateRouter(){
            console.log('🔥 generateRouter 被调用了')
            const {data} = await getMenuListApi()
            this.routers = data.result
            return data.result
        }
    },
    persist: true
})