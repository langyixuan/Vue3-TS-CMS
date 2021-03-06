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
import { mapMenusToRoutes, mapMenusPermissions } from '@/utils/map-menus'

// Module类型需要传毒两个范型参数
// S: 当前模块的状态类型
// R: 根模块的状态类型
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: null,
      userMenus: [],
      permissions: []
    }
  },
  actions: {
    // 实现登录逻辑
    async accoutLoginAction({ commit, dispatch }, payload: any) {
      // 1. 获取用户token
      const loginRes = await accountLoginRequest(payload)
      const { id, token } = loginRes.data
      // 将用户Token进行本地缓存
      loaclCache.setLoaclStorage('userToken', token)
      commit('storeToken', token)
      // 因为请求初始化数据需要用户的token,防止没有存储用户token时就去请求初始化数据
      dispatch('getInitialDataAction', null, { root: true })

      // 2. 获取用户信息
      const userInfoRes = await getUserInfo(id)
      const userInfo = userInfoRes.data
      loaclCache.setLoaclStorage('userInfo', userInfo)
      commit('storeUserInfo', userInfo)

      // 3. 根据用户权限请求相应的用户菜单
      const userMenusRes = await getUserMenus(userInfo.role.id)
      const userMenus = userMenusRes.data
      loaclCache.setLoaclStorage('userMenus', userMenus)
      commit('storeUserMenus', userMenus)

      // 4. 跳转到首页
      router.push('/main')
    },
    // 每次刷新都会重新将localStorage中的数据再一次更新到vuex中
    loadLocalLogin({ commit, dispatch }) {
      const token = loaclCache.getLocalStorage('userToken')
      if (token) {
        commit('storeToken', token)
        dispatch('getInitialDataAction', null, { root: true })
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
      // 获取到用户对应的菜单后，动态的进行路由的匹配
      const roleRoutes = mapMenusToRoutes(userMenus)
      roleRoutes.forEach((route) => {
        router.addRoute('main', route)
      })
      // 匹配用户菜单的操作权限
      const permissions = mapMenusPermissions(userMenus)
      state.permissions = permissions
    }
  },
  getters: {}
}

export default loginModule
