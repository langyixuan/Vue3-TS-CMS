type IFormType = 'input' | 'password' | 'select' | 'datepicker'

// 每一项表单元素中的属性类型
export interface IFormItem {
  type: IFormType
  filed: string
  label: string
  placeholder?: any
  rules?: any[]
  options?: any[]
  otherOptions?: any // 其他配置选项
  isHidden?: boolean // 判断当前项是否显示
}

// 复用表单组件时，接收的表单配置对象类型
export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  formItemStyle?: any
  colLayout?: any
}
