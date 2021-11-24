<template>
  <div class="nav-header">
    <!-- 折叠Logo -->
    <i
      :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="changeMenuFold"
      class="collapse-logo"
    ></i>
    <BreadCrumb :breadcrumbs="breadcrumbs" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import BreadCrumb from '@/base-ui/breadcrumb'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'NavHeader',
  components: { BreadCrumb },
  emits: ['foldChange'],
  setup(props, { emit }) {
    let isFold = ref(false)
    function changeMenuFold() {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    // 获取面包屑数据
    const breadcrumbs = computed(() => {
      const userMenus = useStore().state.login.userMenus
      const currentPath = useRoute().path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    return {
      changeMenuFold,
      isFold,
      breadcrumbs
    }
  }
})
</script>

<style lang="scss" scoped>
.nav-header {
  display: flex;
  align-items: center;
  .collapse-logo {
    font-size: 20px;
  }
}
</style>
