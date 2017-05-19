<template>
  <div class="page">
    <m-Header fixed title="豆瓣app Me" class="page-header"></m-Header>
  </div>
</template>
<script>
  import { Header } from 'mint-ui';
  export default {
    name: 'Me',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        
      }
    },
    components: {
      'mHeader': Header,
    }
  }
</script>
<style lang="less">

</style>