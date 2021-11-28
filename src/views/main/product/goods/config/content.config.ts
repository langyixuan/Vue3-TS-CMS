// 传入table组件的配置对象
export const contentTableConfig = {
  // 表格展示表头信息
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '80' },
    { prop: 'oldPrice', label: '原价格', minWidth: '80', slotName: 'oldPrice' },
    { prop: 'newPrice', label: '现价格', minWidth: '80' },
    { prop: 'imgUrl', label: '商品图片', minWidth: '100', slotName: 'image' },
    { prop: 'status', label: '状态', minWidth: '100', slotName: 'status' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '160',
      slotName: 'createTime'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '160',
      slotName: 'updateTime'
    },
    {
      label: '操作',
      minWidth: '100',
      slotName: 'operate'
    }
  ],
  // 是否显示表单项的索引
  isShowIndex: true,
  // 是否显示表单项的选择框
  isShowSelection: true,
  // 表单标题
  title: '权限列表'
}
