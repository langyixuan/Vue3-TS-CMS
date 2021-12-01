<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      destroy-on-close
      center
      :title="createTitle"
    >
      <LyxForm v-bind="modalConfig" v-model="formDataModel" />
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmBtn">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'
import LyxForm from '@/base-ui/form'

export default defineComponent({
  name: 'PageModal',
  components: { LyxForm },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    createTitle: {
      type: String,
      default: ''
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formDataModel = ref<any>({})
    const store = useStore()

    watch(
      () => props.defaultInfo,
      (newValue: any) => {
        for (const item of props.modalConfig.formItems) {
          formDataModel.value[`${item.filed}`] = newValue[`${item.filed}`]
        }
      }
    )

    // 监听确认按钮的点击
    function handleConfirmBtn() {
      dialogVisible.value = false
      // 在新增中点击确定按钮(defaultInfo是表单的回显数据，编辑的时候才有值)
      if (!Object.keys(props.defaultInfo).length) {
        store.dispatch('system/createPageItemAction', {
          pageName: props.pageName,
          newData: { ...formDataModel.value, ...props.otherInfo }
        })
      } else {
        // 在编辑中点击确定按钮
        store.dispatch('system/editPageItemAction', {
          pageName: props.pageName,
          editData: { ...formDataModel.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      }
    }
    return {
      dialogVisible,
      formDataModel,
      handleConfirmBtn
    }
  }
})
</script>

<style lang="scss" scoped>
.createTitle {
  text-align: center;
  font-weight: 700;
  font-size: 20px;
}
</style>
