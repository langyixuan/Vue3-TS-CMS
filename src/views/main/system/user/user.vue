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
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

import { handlePageSearch } from '@/hooks/user-page-search'

export default defineComponent({
  name: 'User', // 用户管理页面
  components: { PageSearch, PageContent },
  setup() {
    // 当前页面名称(用于在page-content组件中发送相应的网络请求)
    const pageName = 'users'
    const [pageContentRef, handelResetClick, handleSearchClick] =
      handlePageSearch()

    return {
      searchFormConfig,
      contentTableConfig,
      pageName,
      pageContentRef,
      handelResetClick,
      handleSearchClick
    }
  }
})
</script>

<style scoped lang="scss"></style>
