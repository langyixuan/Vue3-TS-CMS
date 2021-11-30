import lyxRequest from '@/network'
import { IDataType } from '@/network/type'

/**
 * 获取当前页面的列表展示数据
 * 接口案例：{{baseURL}}/pageName/list
 * 请求体query参数：{
    "offset": 0,
    "size": 10,
    "name": "w",
    "cellphone": 4
}
 */
export function getPageListData(
  url: string,
  queryInfo: any
): Promise<IDataType> {
  return lyxRequest.request<IDataType>({
    method: 'POST',
    url: url,
    data: queryInfo
  })
}

/**
 * 接口说明：删除某个页面的展示列表中的某个数据
 * 接口案例：{{baseURL}}/pageName/id
 */
export function deletePageItem(url: string) {
  return lyxRequest.request<IDataType>({
    method: 'DELETE',
    url: url
  })
}

/**
 * 接口说明：新增某个页面展示列表中的数据
 * 接口案例：{{baseURL}}/users
 */
export function createPageItem(url: string, queryInfo: any) {
  return lyxRequest.request({
    method: 'POST',
    url: url,
    data: queryInfo
  })
}

/**
 * 接口说明：修改某个页面展示列表中的某条数据
 * 接口案例：{{baseURL}}/users/3 =>  {{baseURL}}/pageName/userId
 */
export function editPageItem(url: string, editData: any) {
  return lyxRequest.request({
    method: 'PATCH',
    url: url,
    data: editData
  })
}
