<template>
  <div class="page-search">
    <LyxForm v-bind="searchFormConfig" v-model="formDataModel">
      <template #footer>
        <div class="footer-btns">
          <el-button type="primary" plain>重置</el-button>
          <el-button type="primary" plain>搜索</el-button>
        </div>
      </template>
    </LyxForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LyxForm from '@/base-ui/form'

export default defineComponent({
  name: 'PageSearch',
  components: { LyxForm },
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  setup() {
    const formDataModel = ref({
      id: '',
      name: '',
      password: '',
      sports: '',
      creatTime: ''
    })

    return {
      formDataModel
    }
  }
})
</script>

<style lang="scss" scoped>
.footer-btns {
  text-align: right;
  margin: 0 20px 10px 0;
  padding-bottom: 20px;
}
</style>
