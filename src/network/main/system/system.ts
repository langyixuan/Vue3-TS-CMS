import lyxRequest from '@/network'
import { IDataType } from '@/network/type'

/**
 * 获取查询系统管理列表数据
 * 接口说明：{{baseURL}}/users/list
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
