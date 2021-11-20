/**
 * 按需引入Element-Plus组件
 */
import { App } from 'vue'
import 'element-plus/lib/theme-chalk/base.css'
import {
  ElAside,
  ElButton,
  ElCheckbox,
  ElContainer,
  ElForm,
  ElFormItem,
  ElHeader,
  ElInput,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElRadio,
  ElSubmenu,
  ElTabPane,
  ElTabs,
  ElIcon
} from 'element-plus'

const components = [
  ElAside,
  ElButton,
  ElCheckbox,
  ElContainer,
  ElForm,
  ElFormItem,
  ElHeader,
  ElInput,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElRadio,
  ElSubmenu,
  ElTabPane,
  ElTabs,
  ElIcon
]

// 通过createApp所创建的app实例对象实际上是一个App类型的
export default function (app: App): void {
  for (const component of components) {
    // 将每个引入element-plus组件注册成全局组件
    app.component(component.name, component)
  }
}
