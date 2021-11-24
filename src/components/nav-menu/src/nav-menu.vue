<template>
  <div class="nav-menu">
    <!-- 顶部Logo -->
    <div class="logo" v-if="!collapse">
      <img src="~@/assets/logo.png" alt="logo" class="logo-img" title="logo" />
      <span class="logo-title">Dashnect.</span>
    </div>
    <div class="logo-collapse" v-else>
      <img src="~@/assets/logo.png" alt="logo" class="logo-img" title="logo" />
    </div>

    <!-- 菜单 -->
    <el-menu
      :default-active="currentHighLightMenu.id"
      class="el-menu-vertical"
      :collapse="collapse"
      background-color="#010319"
      text-color="#ffffff"
      active-text-color="#db3c71"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单的可以展开的标题 -->
          <el-submenu :index="item.id + ''">
            <template #title>
              <i v-if="item.icon" :class="item.icon" class="item-icon"></i>
              <span class="item-title">{{ item.name }}</span>
            </template>
            <!-- 遍历里面的item -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleRouteChange(subitem)"
              >
                <i
                  v-if="subitem.icon"
                  :class="subitem.icon"
                  class="sub-icon"
                ></i>
                <span class="sub-title">{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon" class="item-icon"></i>
            <span class="item-title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { pathMapToMenu } from '@/utils/map-menus'

export default defineComponent({
  name: 'NavMenu',
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const userMenus = computed(() => store.state.login.userMenus)
    const currentPath = route.path
    const currentHighLightMenu = pathMapToMenu(userMenus.value, currentPath)

    function handleRouteChange(menu: any) {
      router.push({
        path: menu.url ?? '/not-found'
      })
    }
    return {
      userMenus,
      handleRouteChange,
      currentHighLightMenu
    }
  }
})
</script>

<style lang="scss" scoped>
.nav-menu {
  width: 100%;
  color: $white;
  .logo {
    padding: 40px 20px;
    display: flex;
    align-items: center;
    .logo-img {
      width: 50px;
      object-fit: cover;
    }
    .logo-title {
      color: $white;
      font-weight: 700;
      font-size: 18px;
      margin-left: 10px;
    }
  }

  .logo-collapse {
    padding: 40px 15px;
    .logo-img {
      width: 30px;
      object-fit: cover;
    }
  }
}
.el-menu {
  border-right: none;
  // font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC,
  //   Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei,
  //   sans-serif;
  // font-weight: 700;
}

.item-title {
  color: $white;
  font-size: 13px;
  font-weight: 700;
}
.item-icon {
  color: $red;
  margin-right: 10px;
  font-size: 16px;
  // font-weight: 700;
}

.el-submenu {
  // 二级菜单 ( 默认背景 )
  .el-menu-item {
    font-size: 12px;
    padding-left: 50px !important;
    background: $black !important;
    font-weight: 700;
    transition: all 0.4s ease-in-out;
  }
}

// hover 高亮
.el-menu-item:hover {
  color: #fff !important; // 菜单
}

.el-menu-item.is-active {
  color: $red !important;
  background: linear-gradient(
    -90deg,
    rgba(7, 12, 59, 0.1),
    rgba(255, 255, 255, 0.2)
  ) !important;

  border-right: 4px solid $red;
}
</style>
