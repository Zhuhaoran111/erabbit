import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import cart from './modules/cart'
import category from './modules/category'
import user from './modules/user'

// 2.0  创建仓库  new Vuex.Store({})
// 3.0 创建仓库  createStore({})

export default createStore({
  modules: {
    cart,
    category,
    user
  },

  // 配置插件(默认存储在localStorage)
  plugins: [createPersistedState({
    // 本地存储名字
    key: 'erabbit-zhu',
    // 指定缓存的模块
    paths: ['user', 'cart']
  })]
})
