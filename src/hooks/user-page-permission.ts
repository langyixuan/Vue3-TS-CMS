/**
 * 判断当前用户是否有操作某页面的某项权限
 */
import { useStore } from '@/store'
export function isHasPermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  const vertifyPermission = `system:${pageName}:${handleName}`
  return !!permissions.find((item) => item === vertifyPermission)
}
