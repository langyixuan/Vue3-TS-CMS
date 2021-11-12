import { createApp } from 'vue'
// 引入全局配置
import { globalRegister } from '@/global/index'

import App from './App.vue'
import router from './router'
import store from './store'
import './http/axios' // 引入axios

const app = createApp(App)

globalRegister(app) // 注册全局组件
app.use(store)
app.use(router)

app.mount('#app')
