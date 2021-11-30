<template>
  <div class="lyx-form">
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :style="formItemStyle"
              v-if="!item.isHidden"
            >
              <!-- 当表单类型是input或者passwiord类型时 -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :show-password="item.type === 'password'"
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  v-model="formDataModel[`${item.filed}`]"
                ></el-input>
              </template>
              <!-- 当表单类型是select下拉选择框时 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  :label="item.label"
                  v-bind="item.otherOptions"
                  v-model="formDataModel[`${item.filed}`]"
                  style="width: 100%"
                >
                  <el-option
                    v-for="optionItem in item.options"
                    :value="optionItem.value"
                    :key="optionItem.value"
                    >{{ optionItem.title }}</el-option
                  >
                </el-select>
              </template>
              <!-- 当表单是datepicker时间选择器的时候 -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  v-model="formDataModel[`${item.filed}`]"
                  style="width: 100%"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormItem } from '../type'

export default defineComponent({
  props: {
    // 需要通过v-model绑定到表单上的数据
    modelValue: {
      type: Object,
      required: true
    },
    // 复用该组件时传递进行来的配置项
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    // 表单的label宽度
    labelWidth: {
      type: String,
      default: '90px'
    },
    // 表单的样式
    formItemStyle: {
      type: Object,
      default: () => ({ padding: '5px 20px' })
    },
    // 响应式布局
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >= 1920px
        lg: 8, // >= 1200px
        md: 12, // >=992px
        sm: 24, // >= 768px
        xs: 24 // < 768px
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const formDataModel = ref({ ...props.modelValue })

    watch(
      formDataModel,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      { deep: true }
    )
    return {
      formDataModel
    }
  }
})
</script>

<style lang="scss" scoped>
.lyx-form {
  width: 100%;
  background-color: $white;
  border-radius: $br-10;
  padding-top: 20px;
}
</style>
