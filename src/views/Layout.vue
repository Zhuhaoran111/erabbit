<template>
  <!-- 顶部导航栏 -->
  <appNavbar></appNavbar>

  <!-- 头部组件 -->
  <appHeader></appHeader>
  <!-- 内容容器 -->
  <div class="app-body">
    <!-- 二级路由 -->
    <RouterView />
  </div>
  <!-- 底部组件 -->
  <appFooter></appFooter>
</template>
<script>
import appNavbar from '@/components/app-navbar.vue';
import appHeader from '@/components/app-header.vue';
import appFooter from '@/components/app-footer.vue';
import { useStore } from 'vuex';
export default {
  name: 'layout',
  components: { appNavbar, appHeader, appFooter },

  //获取分类数据
  setup() {
    const store = useStore()
    store.dispatch('category/getList')
  }


}
</script>
<style scoped lang="less">
.app-body {
  min-height: 600px
}
</style>
