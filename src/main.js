import { createApp } from 'vue'
// 饿了么内置动画
// collapse
import { ElCollapseTransition } from 'element-plus'
// fade/zoom
import '../node_modules/element-plus/theme-chalk/base.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import  pinia from '@/stores/modules/index'
// 引入饿了么组件的国际化
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/theme-chalk/dark/css-vars.css'
import axios from 'axios'
axios.defaults.baseURL = '/api'

import 'animate.css'  
// 导入elm暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'



const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})
app.mount('#app')
app.component(ElCollapseTransition.name, ElCollapseTransition)
