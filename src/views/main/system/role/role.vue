<template>
  <div class="role">
    <PageSearch :searchFormConfig="searchFormConfig" />
    <PageContent
      :contentTableConfig="contentTableConfig"
      :pageName="pageName"
      ref="pageContentRef"
      @triggerCreateBtn="handleCreateData"
      @triggerEditBtn="handleEditData"
    />
    <PageModal
      :modalConfig="modalConfig"
      createTitle="新建用户"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :pageName="pageName"
      :otherInfo="otherInfo"
    >
      <el-tree
        class="el-tree"
        ref="elTreeRef"
        :data="menuList"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        @check="handleTreeItem"
      />
    </PageModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { handlePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { getMenuLeafKeys } from '@/utils/map-menus'
import { ElTree } from 'element-plus'

export default defineComponent({
  name: 'Role', // 用户管理页面
  components: { PageSearch, PageContent, PageModal },
  setup() {
    // 当前页面名称(用于在page-content组件中发送相应的网络请求)
    const pageName = 'role'
    const store = useStore()
    const elTreeRef = ref<InstanceType<typeof ElTree>>()

    // 点击编辑按钮时，表单数据回显。需要在use=page-modal中拿到编辑的该条数据的中的menuList
    function editCallback(item: any) {
      const leafKeys = getMenuLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }

    // 调用page-modal中的hook
    const [pageModalRef, defaultInfo, handleCreateData, handleEditData] =
      usePageModal(undefined, editCallback)

    // 调用page-content中的hook
    const [pageContentRef, handelResetClick, handleSearchClick] =
      handlePageSearch()

    // 获取全部菜单列表
    const menuList = computed(() => store.state.menuList)

    // 传递给page-modal的其他配置数据
    const otherInfo = ref({})

    // 监听EL-Tree的选中情况
    /**
     * 默认接收两个参数：第一个参数传递给el-tree中data属性的数组中该节点所应用的第项
     * 第二个参数：树当前选中的状态对象
     */
    function handleTreeItem(data1: any, data2: any) {
      const checkedKeys = data2.checkedKeys // 完全选中的状态
      const halfCheckedKeys = data2.halfCheckedKeys // 半选中的状态
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageName,
      pageModalRef,
      defaultInfo,
      handleCreateData,
      handleEditData,
      pageContentRef,
      handelResetClick,
      handleSearchClick,
      menuList,
      handleTreeItem,
      otherInfo,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="scss">
.el-tree {
  padding: 10px 20px;
}
</style>
