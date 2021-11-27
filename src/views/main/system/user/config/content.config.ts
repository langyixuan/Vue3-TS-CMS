// 传入table组件的配置对象
export const contentTableConfig = {
  // 表格展示表头信息
  propList: [
    { prop: 'name', label: '用户名', minWidth: '90' },
    { prop: 'realname', label: '真实姓名', minWidth: '90' },
    { prop: 'cellphone', label: '手机号码', minWidth: '90' },
    { prop: 'enable', label: '状态', minWidth: '80', slotName: 'status' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '140',
      slotName: 'createTime'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '140',
      slotName: 'updateTime'
    },
    {
      label: '操作',
      minWidth: '90',
      slotName: 'operate'
    }
  ],
  // 是否显示表单项的索引
  isShowIndex: true,
  // 是否显示表单项的选择框
  isShowSelection: true,
  // 表单标题
  title: '用户列表'
}
