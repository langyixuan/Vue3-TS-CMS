<template>
  <!-- 登录界面 -->
  <div id="login">
    <img
      src="../../assets/bg-img/neon2.png"
      alt="登录页面背景图片"
      class="bg-img"
    />
    <LoginPanel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './login-panel.vue'

export default defineComponent({
  name: 'Login',
  components: { LoginPanel },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
#login {
  width: 100vw;
  height: 100vh;
  background-color: $black;
  @include flex-b;
  overflow: hidden;
  padding-right: 10vw;
}

.bg-img {
  width: 65vw;
  object-fit: cover;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: scale3d(0.9, 0.9, 0.9) rotate(20deg);
  }
}
</style>
