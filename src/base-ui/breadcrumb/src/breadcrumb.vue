<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadCrumb } from '../type'

export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreadCrumb[]>,
      default: () => []
    }
  }
})
</script>

<style lang="scss" scoped></style>
