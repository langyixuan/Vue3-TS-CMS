// 传入table组件的配置对象
export const contentTableConfig = {
  // 表格展示表头信息
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '100' },
    { prop: 'type', label: '类型', minWidth: '60' },
    { prop: 'url', label: '菜单url', minWidth: '100' },
    { prop: 'icon', label: '菜单icon', minWidth: '100' },
    { prop: 'permission', label: '按钮权限', minWidth: '100' },
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
  isShowIndex: false,
  // 是否显示表单项的选择框
  isShowSelection: false,
  // 表单标题
  title: '菜单列表',
  // 树形数据需要展示树形菜单
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  }
}

// export const contentTableConfig = {
//   title: '菜单列表',
//   propList: [
//     { prop: 'name', label: '菜单名称', minWidth: '100' },
//     { prop: 'type', label: '类型', minWidth: '60' },
//     { prop: 'url', label: '菜单url', minWidth: '100' },
//     { prop: 'icon', label: '菜单icon', minWidth: '100' },
//     { prop: 'permission', label: '按钮权限', minWidth: '100' },
//     {
//       prop: 'createAt',
//       label: '创建时间',
//       minWidth: '220',
//       slotName: 'createAt'
//     },
//     {
//       prop: 'updateAt',
//       label: '更新时间',
//       minWidth: '220',
//       slotName: 'updateAt'
//     },
//     { label: '操作', minWidth: '120', slotName: 'handler' }
//   ],
//   showIndexColumn: false,
//   showSelectColumn: false,
//   childrenProps: {
//     rowKey: 'id',
//     treeProp: {
//       children: 'children'
//     }
//   },
//   showFooter: false
// }
