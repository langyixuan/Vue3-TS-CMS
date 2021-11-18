/**
 * 本地缓存文件
 */

class LocalCache {
  // 设置缓存数据
  setLoaclStorage(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  setSessionStorage(key: string, value: any) {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  }

  // 取出缓存数据
  getLocalStorage(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  getSessionStorage(key: string) {
    const value = window.sessionStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  // 移除缓存数据
  removeLocalStorage(key: string) {
    window.localStorage.removeItem(key)
  }

  removeSessionStorage(key: string) {
    window.sessionStorage.removeItem(key)
  }

  // 清空缓存数据
  clearLocalStorage() {
    window.localStorage.clear()
  }

  clearSessionStorage() {
    window.sessionStorage.clear()
  }
}

export default new LocalCache()
