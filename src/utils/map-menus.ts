/**
 * 将菜单中的url映射成路由匹配相应组件的结构，方便动态加载路由
 */

import { RouteRecordRaw } from 'vue-router'

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  // 1. 加载所有的routes(就是不管任意权限的)
  const allRoutes: RouteRecordRaw[] = []
  // require.context是webpack的一个小插件，可以帮助获取文件路径
  // 参数一： 加载的文件根路径
  // 参数二： 是否递归进行查找
  // 参数三： 匹配的文件格式
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((path) => {
    // 通过Common.js中的require方法加载文件内容
    const route = require('../router/main' + path.split('.')[1])
    allRoutes.push(route.default)
  })
  // console.log(allRoutes)

  // 2. 根据不同用户返回的菜单，动态进行路由的匹配
  const roleRoutes: RouteRecordRaw[] = []
  function _recurseGetRoute(menus: any[]) {
    for (const menu of menus) {
      // type为2的时候代表改菜单不具有子菜单  type: 1代表该菜单具有子菜单
      // 当菜单可以继续展开的时候继续递归遍历深层菜单的url
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) roleRoutes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  // console.log(roleRoutes)
  return roleRoutes
}
