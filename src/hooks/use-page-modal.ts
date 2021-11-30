import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type callBackFn = () => void

export function usePageModal(
  createCallback?: callBackFn,
  editCallback?: callBackFn
) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  // 传递给page-modal对内部表单双向绑定的初始化的值
  const defaultInfo = ref({})

  // page-modal的新增按钮被触发
  function handleCreateData() {
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    defaultInfo.value = {}
    createCallback && createCallback()
  }

  // page-modal的修改按钮被触发
  function handleEditData(item: any) {
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    defaultInfo.value = { ...item }
    editCallback && editCallback()
  }

  return [pageModalRef, defaultInfo, handleCreateData, handleEditData]
}
