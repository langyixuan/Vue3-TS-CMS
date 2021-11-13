/**
 * 对请求中类型及接口的声明
 */

import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface LYXRequestInterceptors {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (error: any) => any
  // responseInterceptors?: (config: AxiosResponse) => AxiosResponse
  responseInterceptors?: (config: any) => any
  responseInterceptorsCatch?: (error: any) => any
}

// 对AxiosRequestConfig类型做一个扩展，因为AxiosRequestConfig上不含有我们可以传入的interceptors
export interface LYXRequestConfig extends AxiosRequestConfig {
  interceptors?: LYXRequestInterceptors
}
