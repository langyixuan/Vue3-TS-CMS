import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState } from './type'
import { IStoreType } from './type'
import login from './login/login'
import system from './main/system/system'
import { getPageListData } from '@/network/main/system/system'

const store = createStore<IRootState>({
  state() {
    return {
      name: '',
      password: '',
      departmentList: [], // 全部的部門
      roleList: [] // 全部的角色
    }
  },
  actions: {
    // 获取部门个角色数据
    async getInitialDataAction({ commit }) {
      // 获取部门列表
      const getDepartmentList = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = getDepartmentList.data
      commit('updateDepartmentList', departmentList)

      // 获取角色数据
      const getRoleList = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = getRoleList.data
      commit('updateRoleList', roleList)
    }
  },
  mutations: {
    updateDepartmentList(state, departmentList: any[]) {
      state.departmentList = departmentList
    },
    updateRoleList(state, roleList: any[]) {
      state.roleList = roleList
    }
  },
  modules: {
    login,
    system
  }
})

// 初始化vuex中的数据
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  store.dispatch('getInitialDataAction')
}

export default store

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
