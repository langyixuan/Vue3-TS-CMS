<template>
  <div class="lyx-table">
    <header>
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handle-btn">
          <slot name="headerHandler"> </slot>
        </div>
      </slot>
    </header>
    <el-table
      :data="listData"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <!-- 是否需要展示选框 -->
      <el-table-column
        v-if="isShowSelection"
        type="selection"
        align="center"
        width="40"
      ></el-table-column>
      <!-- 是否需要展示序号 -->
      <el-table-column
        v-if="isShowIndex"
        type="index"
        label="序号"
        align="center"
        width="60"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <footer>
      <slot name="footer">
        <el-pagination
          :page-sizes="[10, 20, 30]"
          :page-size="page.pageSize"
          :current-page="page.currentPage"
          :total="listCount"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LyxTable',
  props: {
    listData: {
      type: Array,
      required: true
    },
    propList: {
      type: Array,
      required: true
    },
    isShowIndex: {
      type: Boolean,
      default: true
    },
    isShowSelection: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      required: true
    },
    listCount: {
      type: Number,
      required: true
    },
    // 双向绑定pageInfo的数据
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    // 树形数据，需要树形菜单展示
    childrenProps: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    function handleSelectionChange(value: any) {
      console.log('---', value)
    }
    // 监听分页器每页显示数量的改变
    function handleSizeChange(pageSize: number) {
      emit('update:page', { ...props.page, pageSize })
    }
    // 监听分页器当前页数的改变
    function handleCurrentChange(currentPage: number) {
      emit('update:page', { ...props.page, currentPage })
    }

    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style lang="scss" scoped>
.lyx-table {
  padding: 5px 0;
  border-radius: $br-10;
  background-color: $white;
  margin-top: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ebebeb;
  .title {
    font-size: 2rem;
    font-weight: 700;
  }
}

footer {
  margin-top: 10px;
  padding: 20px;
  text-align: right;
}
</style>
