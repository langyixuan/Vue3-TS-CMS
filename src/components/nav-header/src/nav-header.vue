<template>
  <div class="nav-header">
    <!-- 折叠Logo -->
    <i
      :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="changeMenuFold"
      class="collapse-logo"
    ></i>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'NavHeader',
  emits: ['foldChange'],
  setup(props, { emit }) {
    let isFold = ref(false)
    function changeMenuFold() {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    return {
      changeMenuFold,
      isFold
    }
  }
})
</script>

<style lang="scss" scoped>
.nav-header {
  .collapse-logo {
    font-size: 20px;
  }
}
</style>
