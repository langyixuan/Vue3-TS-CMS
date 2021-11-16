<template>
  <!-- 登录面板 -->
  <div id="login-panel">
    <h1 class="title"><span>Welcome Back!</span> 欢迎回来</h1>

    <AccountLogin v-if="isAccountLogin" ref="accountEl" />
    <PhoneLogin ref="ploneEl" v-else />

    <div class="btn">
      <button class="login-btn" @click="handleLogin">立即登录</button>
      <button class="other" @click="changeLoginWay" ref="otherbtn">
        使用手机号登录
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AccountLogin from './account-login.vue'
import PhoneLogin from './phone-login.vue'

export default defineComponent({
  name: 'LoginPanel',
  components: { AccountLogin, PhoneLogin },
  setup() {
    // 是否使用账户登录
    const isAccountLogin = ref(true)
    const otherbtn: any = ref(null)
    const accountEl = ref<InstanceType<typeof AccountLogin>>()
    const phoneEl = ref<InstanceType<typeof PhoneLogin>>()

    function changeLoginWay() {
      isAccountLogin.value = !isAccountLogin.value
      if (!isAccountLogin.value) {
        otherbtn.value.innerText = '使用账号登录'
      } else {
        otherbtn.value.innerText = '使用手机号登录'
      }
    }

    function handleLogin() {
      console.log(accountEl.value?.loginAction())
    }

    return {
      isAccountLogin,
      changeLoginWay,
      otherbtn,
      handleLogin,
      accountEl,
      phoneEl
    }
  }
})
</script>

<style lang="scss" scoped>
#login-panel {
  width: 30vw;
  height: 70vh;
  border-radius: $br-10;
  transition: all 0.4s ease-in-out;
  font-weight: 700;
  padding: 2rem 3rem;
  position: relative;

  &:hover {
    box-shadow: #48c0ce 0px 0px 0px 2px inset, $gray 10px -10px 0px -3px,
      #3002c6 10px -10px, $gray 20px -20px 0px -3px, #87199f 20px -20px,
      $gray 30px -30px 0px -3px, #db3c71 30px -30px, $gray 40px -40px 0px -3px,
      #f47270 40px -40px;
  }

  .title {
    font-size: 1.8rem;
    color: $white;
    margin-bottom: 5rem;
    span {
      font-size: 3rem;
    }
  }

  .btn {
    position: absolute;
    bottom: 4rem;
    left: 3rem;
    right: 3rem;

    .login-btn,
    .other {
      width: 100%;
      height: 4rem;
      background-color: $dark-blue;
      border: none;
      font-weight: 700;
      font-size: 1.4rem;
      color: $white;
      border-radius: 5px;
      margin-bottom: 2rem;
      outline: none;
      cursor: pointer;
    }

    .other {
      margin-bottom: 0;
    }
  }
}
</style>
