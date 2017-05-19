<template>
  <div class="page">
    <m-Header fixed title="院线电影" class="page-header">
      <router-link :to="{name:'Movie'}" slot="left">
        <mt-button><img class="return-img" src="../../assets/images/ic_bar_back_green.png" alt=""></mt-button>
      </router-link>
    </m-Header>
    <div class="page-container">
      <!--nav tab-->
      <div class="nav-list">
        <ul class="nav-list--tab">
          <li class="nav-item">
            <router-link active-class="active" :to="{name:'InTheaters'}" tag="a">正在热映</router-link>
          </li>
          <li class="nav-item">
            <router-link active-class="active" :to="{name:'ComingSoon'}" tag="a">即将上映</router-link>
          </li>
        </ul>
      </div>
      <transition :name="transitionName">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
      
    </div>
  </div>
</template>

<script>
  import {
    Header
  } from 'mint-ui';
  export default {
    name: 'Fime',
    data() {
      return {
        transitionName: 'slide-right',
      }
    },
    watch: {
      '$route' (to, from) {
        if(to.name=='InTheaters'){
          this.transitionName = 'slide-right'
        }else{
          this.transitionName = 'slide-left'
        }
      //  const toDepth = to.path.split('/').length
      //   const fromDepth = from.path.split('/').length
      //  this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
     }
    },
    components: {
      'mHeader': Header,
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/less/var.less';
.page-header ~ .page-container{
    bottom: 0;
  }
</style>