/**
 * network统一出口
 */
import LYXRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

const lyxRequest = new LYXRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors: (config: any) => {
      // 携带token进行拦截
      const token = localCache.getLocalStorage('userToken')
      if (token) {
        config.headers.Authorization = token
      }
      return config
    },
    responseInterceptors: (res) => {
      return res
    }
  }
})

export default lyxRequest
