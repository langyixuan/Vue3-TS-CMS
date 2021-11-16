<template>
  <form action="" class="phone-login" autocomplete="off">
    <div class="input-box">
      <label for="account">手机号 / Phone</label>
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
      <label for="password">验证码 / Verification Code</label>
      <input
        type="password"
        name="password"
        id="password"
        v-model="form.password"
        @blur="checkPassword"
      />
      <span class="error-msg" ref="passwordEl"></span>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import Schema from 'async-validator'

export default defineComponent({
  name: 'AccountLogin',
  setup() {
    const form = reactive({
      account: '',
      password: ''
    })

    const accountEl: any = ref(null)
    const passwordEl: any = ref(null)

    // 表单的校验规则
    const rules = {
      // 用户名验证
      account: [
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
            return err.field === 'account'
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

    return {
      form,
      rules,
      checkAccount,
      checkPassword,
      accountEl,
      passwordEl
    }
  }
})
</script>

<style lang="scss" scoped>
.phone-login {
  color: $white;
  height: 35%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .input-box {
    font-weight: 700;
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
      width: 100%;
      height: 1.5rem;
      font-size: 1rem;
      color: #db3c71;
      background-color: $black;
    }
  }
}
</style>
