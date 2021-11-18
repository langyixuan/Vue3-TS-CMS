import { createStore } from 'vuex'
import { IRootState } from './type'
import login from './login/login'

export default createStore<IRootState>({
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
// export function setupStore() {}
