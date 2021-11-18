/**
 * 请求入口文件
 */
import axios from 'axios'
import { AxiosInstance } from 'axios'
import { LYXRequestInterceptors, LYXRequestConfig } from './type'
import { ElLoading } from 'element-plus/lib/components'
import { ILoadingInstance } from 'element-plus'
import errorHandel from './errorHandel'

class LYXRequest {
  instance: AxiosInstance // 定义axios实例的类型
  interceptors?: LYXRequestInterceptors // 定义请求
  loading?: ILoadingInstance

  constructor(config: LYXRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors // 可以根据创建的axios实例对象传入不同的拦截器

    // 请求拦截器(axios实例)
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    // 响应拦截器(axios实例)
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )

    // 给所有axios实例添加拦截器(全局拦截器)
    // 全局请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 设置请求的loading交互
        this.loading = ElLoading.service({
          lock: true,
          text: '正在疯狂加载中...',
          background: 'rgba(0, 0, 0, 0.3)'
        })
        return config
      },
      (error) => {
        this.loading?.close()
        console.log(error)
        return error
      }
    )
    // 全局响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        // 响应到结果后，移除loading
        this.loading?.close()
        return res.data
      },
      (error) => {
        this.loading?.close()
        // 在全局响应拦截器中，拦截如果请求报错根据请求报错的HTTP状态码，判断当前的错误类型
        const { response } = error
        if (response) {
          errorHandel(response.status, response.data)
          return error
        } else {
          console.log('请求被中断')
        }
      }
    )
  }

  // 封装请求方法
  request<T>(config: LYXRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 对单个请求的拦截
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      // 对单个响应的拦截
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          // 将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          reject(err)
          return err
        })
    })
  }
}

export default LYXRequest
