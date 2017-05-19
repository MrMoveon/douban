<template>
  <div class="page">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <m-tabbar v-model="select">
      <m-tabbar-item path="Index">
        <img src="../../assets/images/ic_tab_home_normal.png" alt="" slot="icon-normal">
        <img src="../../assets/images/ic_tab_home_active.png" alt="" slot="icon-active"> 首页
      </m-tabbar-item>
      <m-tabbar-item  path="Movie">
        <img src="../../assets/images/ic_tab_subject_normal.png" alt="" slot="icon-normal">
        <img src="../../assets/images/ic_tab_subject_active.png" alt="" slot="icon-active"> 电影
      </m-tabbar-item>
      <!--
      <m-tabbar-item path="Book">
        <img src="../../assets/images/ic_tab_status_normal.png" alt="" slot="icon-normal">
        <img src="../../assets/images/ic_tab_status_active.png" alt="" slot="icon-active"> 图书
      </m-tabbar-item>
      <m-tabbar-item  path="Me">
        <img src="../../assets/images/ic_tab_profile_normal.png" alt="" slot="icon-normal">
        <img src="../../assets/images/ic_tab_profile_active.png" alt="" slot="icon-active"> 我的
      </m-tabbar-item>
      -->
    </m-tabbar>
  </div>
</template>
<script>
  import mTabbar from '../../components/tabbar'
  import mTabbarItem from '../../components/tabbar-item'
  export default {
    name: 'Main',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
         transitionName: 'slide-right'
      }
    },
     components: {
      mTabbar,
      mTabbarItem
    }
    
  }
</script>
<style lang="less">

</style>