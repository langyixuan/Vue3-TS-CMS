import { createApp } from 'vue'
// 引入全局配置
import { globalRegister } from './global'

import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css' // 对样式做一些重置，抹平浏览器之间样式的差别
import './style/main.scss' // 引入样式文件
import { setupStore } from '@/store/index'

const app = createApp(App)

globalRegister(app) // 注册全局组件t
app.use(store)
app.use(router)

app.mount('#app')

// 初始化vuex中的数据，防止每次刷新页面丢失vuex中的数据
setupStore()

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// lyxRequest
//   .request<DataType>({
//     url: '/home/multidata',
//     method: 'GET',
//     interceptors: {
//       requestInterceptors: (config) => {
//         console.log('对于单个请求的拦截')
//         return config
//       },
//       responseInterceptors: (res) => {
//         console.log('对于单个响应的拦截')
//         return res
//       }
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })
