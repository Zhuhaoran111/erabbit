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
      },
        
    //控制当前分类下的二级分类的显示和隐藏
    // 修改当前一级分类下的open数据为true
    show (state, id) {
      const category = state.list.find(item => item.id === id)  //这里是返回一个
      category.open = true
    },
    // 修改当前一级分类下的open数据为false
    hide (state, id) {
      const category = state.list.find(item => item.id === id)
      category.open = false
    }
    },

      // 需要向后台加载数据，所以需要actions函数获取数据  ?这个commit是个啥
  actions: {
    async getList ({commit}) {
      console.log(commit)
      const { result } = await findAllCategory()
      // 获取数据成功，提交mutations进行数据修改

       //跳转的时候不会关闭二级分类，通过数据来控制
       //提供显示和隐藏函数，修改open数据
       //组件中使用vuex数据，使用时间来绑定
      result.forEach(item => {
       item.open = false
      })
      commit('setList', result)
    }
  }
}
