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
      roleList: [], // 全部的角色
      menuList: [] // 全部的菜单
    }
  },
  actions: {
    // 获取部门个角色数据
    async getInitialDataAction({ commit }) {
      // 获取全部部门列表
      const getDepartmentList = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = getDepartmentList.data
      commit('updateDepartmentList', departmentList)

      // 获取全部角色数据
      const getRoleList = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = getRoleList.data
      commit('updateRoleList', roleList)

      // 获取全部菜单数据
      const getMenuList = await getPageListData('/menu/list', {
        offset: 0,
        size: 1000
      })
      const { list: menuList } = getMenuList.data
      commit('updateMenuList', menuList)
    }
  },
  mutations: {
    updateDepartmentList(state, departmentList: any[]) {
      state.departmentList = departmentList
    },
    updateRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    updateMenuList(state, menuList: any[]) {
      state.menuList = menuList
    }
  },
  modules: {
    login,
    system
  }
})

// 初始化vuex中的数据
export function setupStore() {
  // 因为这两者dispatch都是异步操作，所以不能确定谁先执行完毕，
  // 因为获取初始化数据(角色列表和部门列表)是需要用户的token的，
  // 如果login中的action没有将token请求回来时，是没有办法去获取初始化数据的
  store.dispatch('login/loadLocalLogin')
  store.dispatch('getInitialDataAction')
}

export default store

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
