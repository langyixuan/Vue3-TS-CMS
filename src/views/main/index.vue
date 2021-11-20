<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <NavMenu :collapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <NavHeader @foldChange="foldChange" />
        </el-header>
        <el-main class="page-content"> </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'

export default defineComponent({
  name: 'Main',
  components: { NavMenu, NavHeader },
  setup() {
    let isCollapse = ref(false)
    function foldChange(isFold: boolean) {
      isCollapse.value = isFold
    }

    return {
      foldChange,
      isCollapse
    }
  }
})
</script>

<style scoped lang="scss">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // margin: 0 auto;
}
.main-content,
.page {
  height: 100%;
}
.page-content {
  height: calc(100% - 58px);
  .page-info {
    background-color: #fff;
    border-radius: 5px;
  }
}
.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}
.el-header {
  height: 58px !important;
}
.el-aside {
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: auto;
  // line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: $black;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none;
  }
}
.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
