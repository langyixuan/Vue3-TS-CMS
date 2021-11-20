/**
 * 根模块的状态类型
 */
import { ILoginState } from './login/type'

export interface IRootState {
  name: string
  password: string
}

export interface IRootWithModule {
  login: ILoginState
}

export type IStoreType = IRootState & IRootWithModule
