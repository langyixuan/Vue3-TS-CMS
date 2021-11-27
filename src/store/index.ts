import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState } from './type'
import { IStoreType } from './type'
import login from './login/login'
import system from './main/system/system'

const store = createStore<IRootState>({
  state() {
    return {
      name: '78787',
      password: '78787878'
    }
  },
  mutations: {},
  actions: {},
  modules: {
    login,
    system
  }
})

// 初始化vuex中的数据
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
