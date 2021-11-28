/**
 * 抽离表单搜索组件中的公共代码
 */
import { ref } from 'vue'
import PageContent from '@/components/page-content'

export function handlePageSearch() {
  // 通过ref获取子组件page-content
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  // 监听page-search中重置按钮的点击
  function handelResetClick() {
    pageContentRef.value?.getpageContentData()
    console.log('我被调用了')
  }
  // 监听page-search中搜索按钮的点击
  function handleSearchClick(queryInfo: any) {
    pageContentRef.value?.getpageContentData(queryInfo)
    console.log('我被调用了')
  }
  return [pageContentRef, handelResetClick, handleSearchClick]
}
