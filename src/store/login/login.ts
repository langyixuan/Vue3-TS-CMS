/**
 * 登录相关的store模块
 */

import { Module } from 'vuex'
import { IRootState } from '../type'
import {
  accountLoginRequest,
  getUserInfo,
  getUserMenus
} from '@/network/login/login'
import { ILoginState } from './type'
import loaclCache from '@/utils/cache'
import router from '@/router'

// Module类型需要传毒两个范型参数
// S: 当前模块的状态类型
// R: 根模块的状态类型
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: null,
      userMenus: []
    }
  },
  actions: {
    // 实现登录逻辑
    async accoutLoginAction({ commit }, payload: any) {
      // 1. 获取用户token
      const loginRes = await accountLoginRequest(payload)
      const { id, token } = loginRes.data
      // 将用户Token进行本地缓存
      loaclCache.setLoaclStorage('userToken', token)
      commit('storeToken', token)

      // 2. 获取用户信息
      const userInfoRes = await getUserInfo(id)
      const userInfo = userInfoRes.data
      loaclCache.setLoaclStorage('userInfo', userInfo)
      commit('storeUserInfo', userInfo)

      // 3. 根据用户权限请求相应的用户菜单
      const userMenusRes = await getUserMenus(userInfo.role.id)
      const userMenus = userMenusRes.data
      commit('storeUserMenus', userMenus)
      console.log(userMenusRes)

      // 4. 跳转到首页
      router.push('/main')
    },
    // 每次刷新都会重新将localStorage中的数据再一次更新到vuex中
    loadLocalLogin({ commit }) {
      const token = loaclCache.getLocalStorage('token')
      if (token) {
        commit('storeToken', token)
      }
      const userInfo = loaclCache.getLocalStorage('userInfo')
      if (userInfo) {
        commit('storeUserInfo', userInfo)
      }
      const userMenus = loaclCache.getLocalStorage('userMenus')
      if (userMenus) {
        commit('storeUserMenus', userMenus)
      }
    }
  },
  mutations: {
    storeToken(state, token: string) {
      state.token = token
    },
    storeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    storeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
    }
  },
  getters: {}
}

export default loginModule
