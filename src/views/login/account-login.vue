<template>
  <form action="" class="account-login" autocomplete="off">
    <div class="input-box">
      <label for="account">账号 / Account</label>
      <input
        type="text"
        name="account"
        id="account"
        v-model="form.account"
        @blur="checkAccount"
      />
      <span class="error-msg" ref="accountEl"></span>
    </div>
    <div class="input-box">
      <label for="password">密码 / Password</label>
      <input
        type="password"
        name="password"
        id="password"
        v-model="form.password"
        @blur="checkPassword"
      />
      <span class="error-msg" ref="passwordEl"></span>
    </div>
    <div class="password-handel">
      <el-checkbox label="记住密码" v-model="isKeepPassword"></el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import Schema from 'async-validator'
import localChche from '@/utils/cache'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'AccountLogin',
  setup() {
    const store = useStore()
    const form = reactive({
      name: localChche.getLocalStorage('name') ?? '',
      password: localChche.getLocalStorage('password') ?? ''
    })

    const accountEl: any = ref(null)
    const passwordEl: any = ref(null)

    // 是否记住密码
    let isKeepPassword = ref(true)

    // 表单的校验规则
    const rules = {
      // 用户名验证
      name: [
        // 1. 校验是否必传
        {
          required: true, // 是否必传
          message: '请输入用户名！', // 不满足要求的信息提示
          trigger: 'blur' // 什么机制下进行验证
        },
        // 2. 校验输入的内容长度及字符限制
        {
          pattern: /^[a-z0-9]{5,10}$/, // 可以输入字符a-z,数字0-9，限制输入5-10个字符
          message: '用户名必须是5~10个字母或则数字',
          trigger: 'blur'
        }
      ],
      // 密码验证
      password: [
        // 1. 校验是否必传
        {
          required: true, // 是否必传
          message: '请输入密码！', // 不满足要求的信息提示
          trigger: 'blur' // 什么机制下进行验证
        },
        // 2. 校验输入的内容长度及字符限制
        {
          pattern: /^[a-z0-9]{3,}$/,
          message: '密码必须由3个以上的字母或数字构成',
          trigger: 'blur'
        }
      ]
    }

    // 初始化表单验证的插件
    let validator = new Schema(rules)
    // 进行表单账户校验
    function checkAccount() {
      validator
        .validate(form, {
          firstFields: true
        })
        .then(() => {
          // 校验通过
          accountEl.value.innerText = ''
          console.log('ok')
        })
        .catch(({ errors }) => {
          const accountErr = errors.filter((err: any) => {
            return err.field === 'name'
          })
          if (accountErr.length) {
            accountEl.value.innerText = accountErr[0].message
          }
        })
    }
    // 进行表单密码验证
    function checkPassword() {
      validator
        .validate(form, {
          firstFields: true
        })
        .then(() => {
          // 验证通过
          passwordEl.value.innerText = ''
        })
        .catch(({ errors }) => {
          const passwordErr = errors.filter((err: any) => {
            return err.field === 'password'
          })
          if (passwordErr.length) {
            passwordEl.value.innerText = passwordErr[0].message
          }
        })
    }

    // 账户登录
    function loginAction() {
      // 首先验证登录信息格式是否正确
      validator.validate(form, (vaild) => {
        // vaild返回的是出错信息
        if (vaild) {
          // 有输出格式错误
          vaild.forEach((item) => {
            if (item.field === 'account') {
              // 输入信息格式错误
              accountEl.value.innerText = item.message
            } else {
              // 输入信息格式正确
              passwordEl.value.innerText = item.message
              // 将信息发送给服务器进行验证
            }
          })
        } else {
          // 没有输入格式的错误
          accountEl.value.innerText = ''
          passwordEl.value.innerText = ''
          loginLogic(isKeepPassword.value)
        }
      })
    }

    // 登录逻辑
    function loginLogic(keeppassword: boolean) {
      // 判断是否需要记住密码
      if (keeppassword) {
        // 通过localStorage进行本地缓存
        localChche.setLoaclStorage('name', form.name)
        localChche.setLoaclStorage('password', form.password)
      }
      console.log('登录成功', keeppassword)
      store.dispatch('login/accoutLoginAction', { ...form })
    }

    return {
      form,
      rules,
      checkAccount,
      checkPassword,
      accountEl,
      passwordEl,
      loginAction,
      isKeepPassword
    }
  }
})
</script>

<style lang="scss" scoped>
.account-login {
  color: $white;
  height: 35%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .input-box {
    font-weight: 700;
    margin-bottom: 1.5rem;

    label {
      display: block;
      font-size: 1.2rem;
      margin-bottom: 1.2rem;
    }
    input {
      width: 100%;
      height: 4rem;
      background-color: $white;
      outline: none;
      border: none;
      border-radius: 5px;
      padding: 0 2rem;
      color: $black;
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
    span {
      display: block;
      width: 100%;
      height: 1.5rem;
      font-size: 1rem;
      color: #db3c71;
      background-color: $black;
    }
  }

  .password-handel {
    width: 100%;
    height: 1rem;
    @include flex-b;
    font-weight: 700;
  }
}
</style>
