// 定义首页需要的接口函数
import request from '@/utils/request'

/**
 * 获取首页头部分类数据(顶级，二级，三级)
 */
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}
// export function findAllCategory(){
//   return request({
//       url:'/home/category/head',
//       method:'get'
//   })
// }