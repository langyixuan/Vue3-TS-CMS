import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    // 登录页面
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    // 首页
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/index.vue')
  },
  {
    // 当路径没有匹配到相应的组件时，匹配not-found页面
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  const token = localCache.getLocalStorage('userToken')
  if (to.path !== '/login') {
    if (!token) {
      return '/login'
    }
  }
})

export default router
