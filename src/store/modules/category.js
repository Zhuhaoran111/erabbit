// 分类模块
import { topCategory } from "@/api/constants"  //这是按需导入，还有一个默认导入
import { findAllCategory } from "@/api/category"
export default {
  namespaced: true,
  state () {
    return {
      // 分类信息,依赖topCategory，保证初始化也有数据
      // 所以：根据常量数据来生成一个默认的顶级分类数据，不会出现空白（没数据的情况）
      list: topCategory.map(item => ({ name: item }))  //[{name:美食}，{name:厨房}]这种形式的数组
    }
  },
    // 加载数据成功后需要修改list所以需要mutations函数
    mutations: {
      setList (state, headCategory) {
        state.list = headCategory
      }
    },

      // 需要向后台加载数据，所以需要actions函数获取数据  ?这个commit是个啥
  actions: {
    async getList ({commit}) {
      console.log(commit)
      const { result } = await findAllCategory()
      // 获取数据成功，提交mutations进行数据修改
      commit('setList', result)
    }
  }
}
