// 定义登录时参数类型
export interface IAccount {
  name: string
  password: string
}

// 因为不能确定登录成功后的返回结果中data的类型，可以传一个泛型
export interface ILoginRes {
  id: number
  name: string
  token: string
}

// 定义登录成功后返回结果的类型
export interface IDataType<T = any> {
  code: number
  data: T
}
