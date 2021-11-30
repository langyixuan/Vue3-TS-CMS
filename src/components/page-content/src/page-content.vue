<template>
  <div class="page-content">
    <LyxTabel
      :listData="dataList"
      :listCount="listCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <template #headerHandler v-if="isCreate">
        <el-button
          type="primary"
          plain
          size="medium"
          icon="el-icon-plus"
          @click="handleCreateBtn"
          >新增</el-button
        >
        <el-button
          type="primary"
          plain
          size="medium"
          icon="el-icon-refresh"
        ></el-button>
      </template>
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
      <template #operate="scope">
        <div class="handle-btns">
          <el-button
            type="primary"
            plain
            icon="el-icon-edit"
            size="mini"
            v-if="isUpdate"
            @click="handleEditBtn(scope.row)"
          ></el-button>
          <el-button
            type="warning"
            plain
            icon="el-icon-delete"
            size="mini"
            v-if="isDelete"
            @click="handleDelete(scope.row)"
          ></el-button>
        </div>
      </template>
      <template
        v-for="item in otherPropsSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <slot :name="item.slotName" :row="scope.row"></slot>
      </template>
    </LyxTabel>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import LyxTabel from '@/base-ui/table'
import { isHasPermission } from '@/hooks/use-page-permission'

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
  emits: ['triggerCreateBtn', 'triggerEditBtn'],
  setup(props, { emit }) {
    const store = useStore()
    // 因为table组件和page-content组件中的每页显示数据数量和当前页面彼此会互相影响，
    //所以两个组件可以对该数据做双向绑定
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getpageContentData())

    // 获取用户操作当前页面的权限
    const isQuery = isHasPermission(props.pageName, 'query')
    const isCreate = isHasPermission(props.pageName, 'create')
    const isUpdate = isHasPermission(props.pageName, 'update')
    const isDelete = isHasPermission(props.pageName, 'delete')

    function getpageContentData(queryInfo: any = {}) {
      if (!isQuery) return
      // 将queryInfo参数直接展开放在请求参数中，如有空的value值会报错
      const hasValueQueryInfo: any = {}
      for (const item in queryInfo) {
        if (queryInfo[item].length) {
          hasValueQueryInfo[item] = queryInfo[item]
        }
      }
      // 请求当前模块数据
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...hasValueQueryInfo
        }
      })
    }
    getpageContentData()

    // 获取table列表显示数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    // 获取显示数据的总条数
    const listCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    // 插槽分为固定插槽和页面独有插槽
    const otherPropsSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'updateTime') return false
        if (item.slotName === 'createTime') return false
        if (item.slotName === 'operate') return false
        return true
      }
    )

    // 点击删除某条数据
    function handleDelete(item: any) {
      store.dispatch('system/deletePageItemAction', {
        pageName: props.pageName,
        id: item.id
      })
    }

    // 监听点击新增按钮
    function handleCreateBtn() {
      emit('triggerCreateBtn')
    }

    // 监听修改按钮的点击
    function handleEditBtn(item: any) {
      emit('triggerEditBtn', item)
    }

    return {
      dataList,
      listCount,
      getpageContentData,
      pageInfo,
      otherPropsSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDelete,
      handleCreateBtn,
      handleEditBtn
    }
  }
})
</script>

<style lang="scss" scoped></style>
