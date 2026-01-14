import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import pinia from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//注册svg-icons
import 'virtual:svg-icons-register'

import SvgIcon from './components/SvgIcon/Index.vue'

const app = createApp(App)
// 启动服务时，注册路由
app.use(router)

// 启动服务时，注册pinia
app.use(pinia)

// 注册elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 注册
app.component('svg-icon', SvgIcon)

// 启动服务时，注册element-plus
app.use(ElementPlus)

app.mount('#app')
