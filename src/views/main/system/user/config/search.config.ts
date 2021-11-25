// 传入form组件的配置对象类型
import { IForm } from '@/base-ui/form/type'

export const searchFormConfig: IForm = {
  formItems: [
    {
      filed: 'id',
      type: 'input',
      label: 'id',
      placeholder: '请输入id'
    },
    {
      filed: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      filed: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码'
    },
    {
      filed: 'sports',
      type: 'select',
      label: '喜欢的运动',
      placeholder: '请选择喜欢的运动',
      options: [
        { title: '篮球', value: 'basketball' },
        { title: '足球', value: 'football' }
      ]
    },
    {
      filed: 'createTime',
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}
