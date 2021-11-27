<template>
  <div class="page-content">
    <LyxTabel :listData="dataList" v-bind="contentTableConfig">
      <template #status="scope">
        <el-button
          :type="scope.row.enable ? 'success' : 'warning'"
          plain
          size="mini"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createTime="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateTime="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #operate>
        <div class="handle-btns">
          <el-button
            type="primary"
            plain
            icon="el-icon-edit"
            size="mini"
          ></el-button>
          <el-button
            type="warning"
            plain
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </div>
      </template>
    </LyxTabel>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import LyxTabel from '@/base-ui/table'

export default defineComponent({
  name: 'PageContent',
  components: { LyxTabel },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    // const userCount = computed(() => store.state.system.userCount)

    return {
      dataList
    }
  }
})
</script>

<style lang="scss" scoped></style>
