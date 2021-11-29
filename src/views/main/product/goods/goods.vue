<template>
  <div class="user">
    <!-- <PageSearch :searchFormConfig="searchFormConfig" /> -->
    <PageContent :contentTableConfig="contentTableConfig" :pageName="pageName">
      <template #image="scope">
        <el-image
          style="width: 80px; height: 100px; border-radius: 3px"
          fit="cover"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        >
        </el-image>
      </template>
      <template #oldPrice="scope">
        <span>{{ '￥' + scope.row.oldPrice }}</span>
      </template>
      <template #newPrice="scope">
        <span>{{ '￥' + scope.row.newPrice }}</span>
      </template>
    </PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

// import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'Goods', // 用户管理页面
  components: { PageContent },
  setup() {
    // 当前页面名称(用于在page-content组件中发送相应的网络请求)
    const pageName = 'goods'
    return {
      // searchFormConfig,
      contentTableConfig,
      pageName
    }
  }
})
</script>

<style scoped lang="scss"></style>
