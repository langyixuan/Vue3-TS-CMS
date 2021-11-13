import { createApp } from 'vue'
// 引入全局配置
import { globalRegister } from './global'

import App from './App.vue'
import router from './router'
import store from './store'
import lyxRequest from './network' // 引入网络请求

const app = createApp(App)

globalRegister(app) // 注册全局组件
app.use(store)
app.use(router)

app.mount('#app')

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

lyxRequest
  .request<DataType>({
    url: '/home/multidata',
    method: 'GET',
    interceptors: {
      requestInterceptors: (config) => {
        console.log('对于单个请求的拦截')
        return config
      },
      responseInterceptors: (res) => {
        console.log('对于单个响应的拦截')
        return res
      }
    }
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.returnCode)
    console.log(res.success)
  })
