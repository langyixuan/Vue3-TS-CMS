<template>
  <div class="lyx-table">
    <header>
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handle-btn">
          <slot name="headerHandler">
            <el-button type="primary" plain size="medium" icon="el-icon-plus"
              >新增</el-button
            >
            <el-button
              type="primary"
              plain
              size="medium"
              icon="el-icon-refresh"
            ></el-button>
          </slot>
        </div>
      </slot>
    </header>
    <el-table
      :data="listData"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="isShowSelection"
        type="selection"
        align="center"
        width="40"
      ></el-table-column>
      <el-table-column
        v-if="isShowIndex"
        type="index"
        label="序号"
        align="center"
        width="60"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
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
          v-model:currentPage="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
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
    }
  },
  setup() {
    function handleSelectionChange(value: any) {
      console.log(value)
    }

    return {
      handleSelectionChange
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
