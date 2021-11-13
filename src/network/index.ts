/**
 * network统一出口
 */
import LYXRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const lyxRequest = new LYXRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors: (config) => {
      // 携带token进行拦截
      // const token = ''
      // if (token) {
      //   config.headers.Authorization = token
      // }
      console.log('请求拦截器')
      return config
    },
    responseInterceptors: (res) => {
      console.log('响应拦截器')
      return res
    }
  }
})

export default lyxRequest
