<template>
  <div class="user">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handelResetClick"
      @queryBtnClick="handleSearchClick"
    />
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
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { handlePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'User', // 用户管理页面
  components: { PageSearch, PageContent, PageModal },
  setup() {
    // 当前页面名称(用于在page-content组件中发送相应的网络请求)
    const pageName = 'users'
    const [pageContentRef, handelResetClick, handleSearchClick] =
      handlePageSearch()

    // 需求：点击新增按钮时显示密码， 点击编辑不显示密码
    function createCallback() {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.filed === 'password'
      )
      passwordItem!.isHidden = false
    }

    function editCallback() {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.filed === 'password'
      )
      passwordItem!.isHidden = true
    }
    const [pageModalRef, defaultInfo, handleCreateData, handleEditData] =
      usePageModal(createCallback, editCallback)

    const store = useStore()
    // 获取部门以及角色列表
    const departmentList = store.state.departmentList
    const roleList = store.state.roleList
    // 将部门以及角色列表动态的设置到modal.config中对应的部门以及角色的options中
    const departmentItem = modalConfig.formItems.find(
      (item) => item.filed === 'departmentId'
    )
    departmentItem!.options = departmentList.map((item) => ({
      title: item.name,
      value: item.id
    }))
    const roleItem = modalConfig.formItems.find(
      (item) => item.filed === 'roleId'
    )
    roleItem!.options = roleList.map((item) => ({
      title: item.name,
      value: item.id
    }))

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageName,
      pageContentRef,
      handelResetClick,
      handleSearchClick,
      handleCreateData,
      handleEditData,
      pageModalRef,
      defaultInfo
    }
  }
})
</script>

<style scoped lang="scss"></style>
