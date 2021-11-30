/**
 * 系统管理store模块
 */
import { Module } from 'vuex'
import { ISystemState } from './type'
import { IRootState } from '@/store/type'
import {
  getPageListData,
  deletePageItem,
  createPageItem,
  editPageItem
} from '@/network/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  actions: {
    // 获取当前页面的列表显示数据
    async getPageListAction({ commit }, payload) {
      const pageUrl = `/${payload.pageName}/list`
      const pageListRes = await getPageListData(pageUrl, payload.queryInfo)

      // totalCount请求结果总数
      const changePageName =
        payload.pageName.slice(0, 1).toUpperCase() + payload.pageName.slice(1)
      const { list, totalCount } = pageListRes.data
      commit(`update${changePageName}List`, list)
      commit(`update${changePageName}Count`, totalCount)
    },

    // 删除当前页面列表中的数据
    async deletePageItemAction({ dispatch }, payload) {
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await deletePageItem(pageUrl)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    // 新增当前页面列表中的数据
    async createPageItemAction({ dispatch }, payload) {
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageItem(pageUrl, newData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    // 修改当前页面列表中的数据
    async editPageItemAction({ dispatch }, payload) {
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageItem(pageUrl, editData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
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
    },
    updateGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    updateGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    updateMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    updateMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.userList
          case 'role':
            return state.roleList
          case 'goods':
            return state.goodsList
          case 'menu':
            return state.menuList
        }
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.userCount
          case 'role':
            return state.userCount
          case 'goods':
            return state.goodsCount
          case 'menu':
            return state.menuCount
        }
      }
    }
  }
}

export default systemModule
