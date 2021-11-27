// 定义登录成功后返回结果的类型
export interface IDataType<T = any> {
  code: number
  data: T
}
