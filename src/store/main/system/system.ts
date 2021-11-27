/**
 * 系统管理store模块
 */
import { Module } from 'vuex'
import { ISystemState } from './type'
import { IRootState } from '@/store/type'
import { getPageListData } from '@/network/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  actions: {
    async getPageListAction({ commit }, payload) {
      const pageUrl = `/${payload.pageName}/list`
      // 获取系统管理搜索结果数据
      const pageListRes = await getPageListData(pageUrl, payload.queryInfo)
      // totalCount请求结果总数
      const changePageName =
        payload.pageName.slice(0, 1).toUpperCase() + payload.pageName.slice(1)
      const { list, totalCount } = pageListRes.data
      commit(`update${changePageName}List`, list)
      commit(`update${changePageName}Count`, totalCount)
    }
  },
  mutations: {
    updateUsersList(state, userList: any[]) {
      state.userList = userList
    },
    updateUsersCount(state, userCount: number) {
      state.userCount = userCount
    },
    updateRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    updateRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    }
  },
  getters: {}
}

export default systemModule
