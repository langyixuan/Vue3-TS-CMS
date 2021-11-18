/**
 * 登录相关请求
 */
import lyxRequest from '../index'
import { IAccount, ILoginRes, IDataType } from './type'

// 因为后期接口可能更改
enum LoginAPI {
  AccountLogin = '/login', // 请求用户token
  LoginUserInfo = '/users/', // 请求用户信息
  UserMenus = '/role/' // 请求用户菜单
}

/**
 * 用户账号方式登录
 * 接口说明：{{baseURL}}/login
 */
export const accountLoginRequest = (account: IAccount) =>
  lyxRequest.request<IDataType<ILoginRes>>({
    method: 'POST',
    url: LoginAPI.AccountLogin,
    data: account
  })

/**
 * 获取用户信息
 * 接口说明：{{baseURL}}/users/id
 */
export function getUserInfo(id: number): Promise<IDataType> {
  return lyxRequest.request<IDataType>({
    method: 'GET',
    url: LoginAPI.LoginUserInfo + id
  })
}

/**
 * 获取用户相依权限菜单
 * 接口说明：{{baseURL}}/role/id/menu
 */
export function getUserMenus(id: number): Promise<IDataType> {
  return lyxRequest.request<IDataType>({
    method: 'GET',
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
