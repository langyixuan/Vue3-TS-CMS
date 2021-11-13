/**
 * 根据服务器返回的状态码判断错误类型
 */

export default (status: number, other: string): any => {
  switch (status) {
    case 400:
      console.log('请求的参数错误')
      break
    case 401:
      console.log('用户信息验证失败')
      break
    case 403:
      console.log('服务器拒绝本次访问')
      break
    case 404:
      console.log('请求资源没有找到')
      break
    case 500:
      console.log('内部服务器错误')
      break
    case 501:
      console.log('服务器不支持该请求中使用的方法')
      break
    case 502:
      console.log('网关错误')
      break
    case 504:
      console.log('网管超时')
      break
    default:
      console.log(other)
      break
  }
}
