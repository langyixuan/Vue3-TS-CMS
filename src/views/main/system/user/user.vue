<template>
  <div class="user">
    <LyxForm v-bind="searchFromConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LyxForm from '@/base-ui/form'
import { searchFromConfig } from './config/search.config'

export default defineComponent({
  name: 'User', // 用户管理页面
  components: { LyxForm },
  setup() {
    return {
      searchFromConfig
    }
  }
})
</script>

<style scoped></style>
