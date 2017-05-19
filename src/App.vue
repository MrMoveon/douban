<template>
  <div id="app">
    <loading v-if="$store.state.loading"></loading>
    <transition :name="transitionName">
      <keep-alive>
          <router-view></router-view>
      </keep-alive>    
    </transition>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      transitionName: 'slide-left',
    }
  },
   watch: {
      '$route' (to, from) {
          const toDepth = to.path.split('/').length
          const fromDepth = from.path.split('/').length
          this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
     }
   }
}
</script>
