/**
 * 按需引入Element-Plus组件
 */
import { App } from 'vue'
import 'element-plus/dist/index.css'
import {
  ElButton,
  ElCheckbox,
  ElForm,
  ElFormItem,
  ElInput,
  ElLink,
  ElRadio,
  ElTabPane,
  ElTabs
} from 'element-plus'

const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElLink
]

// 通过createApp所创建的app实例对象实际上是一个App类型的
export default function (app: App): void {
  for (const component of components) {
    // 将每个引入element-plus组件注册成全局组件
    app.component(component.name, component)
  }
}
