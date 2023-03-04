<!-- vue2.0需要根元素，vue3.0可以是代码片段-->
<template>
  <div>
    <button @click="fn">测试工具</button>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'APP',
  setup() {
    const fn = () => {
      console.log('222')
      request('/member/profile', 'get', { a: 10 })
    }
    return { fn }
  }

}
</script>
