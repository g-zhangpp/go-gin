import {defineStore} from 'pinia'

export const useSettingStore = defineStore('settingState', {
    state: () => ({
        isCollapse: false,
    }),
    getters: {},
    actions:{
        //切换Collapse
        setCollapse(value: boolean) {
            this.isCollapse = value
        }
    }
})