import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState } from './type'
import login from './login/login'
import { IStoreType } from './type'

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
    login
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
