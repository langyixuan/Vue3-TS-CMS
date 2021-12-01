/**
 * 根模块的状态类型
 */
import { ILoginState } from './login/type'
import { ISystemState } from './main/system/type'

export interface IRootState {
  name: string
  password: string
  departmentList: any[]
  roleList: any[]
  menuList: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

export type IStoreType = IRootState & IRootWithModule
