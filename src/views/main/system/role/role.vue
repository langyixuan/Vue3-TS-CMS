<template>
  <div class="role">
    <PageSearch :searchFormConfig="searchFormConfig" />
    <PageContent
      :contentTableConfig="contentTableConfig"
      :pageName="pageName"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'Role', // 用户管理页面
  components: { PageSearch, PageContent },
  setup() {
    // 当前页面名称(用于在page-content组件中发送相应的网络请求)
    const pageName = 'role'
    return {
      searchFormConfig,
      contentTableConfig,
      pageName
    }
  }
})
</script>

<style scoped lang="scss"></style>
