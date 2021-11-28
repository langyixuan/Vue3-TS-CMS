<template>
  <div class="page-search">
    <LyxForm v-bind="searchFormConfig" v-model="formDataModel">
      <template #footer>
        <div class="footer-btns">
          <el-button type="primary" plain @click="clearFormData"
            >重置</el-button
          >
          <el-button type="primary" plain @click="searchFormData"
            >搜索</el-button
          >
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
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 因为v-model中的数据不能写死，而是根据不同页面的配置文件决定的
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.filed] = ''
    }
    const formDataModel = ref(formOriginData)

    // 清空表单的输入
    function clearFormData() {
      for (const key in formOriginData) {
        formDataModel.value[`${key}`] = formOriginData[key]
      }
      emit('resetBtnClick')
    }

    // 根据输入关键字搜索
    function searchFormData() {
      emit('queryBtnClick', formDataModel.value)
    }

    return {
      formDataModel,
      clearFormData,
      searchFormData
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
