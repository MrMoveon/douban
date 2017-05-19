<template>
  <div class="page">
    <m-Header fixed title="豆瓣app Book" class="page-header"></m-Header>
  </div>
</template>
<script>
  import { Header } from 'mint-ui';
  export default {
    name: 'Book',
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