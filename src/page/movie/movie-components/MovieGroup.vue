<template>
  <div>
    <m-cell :title="title" size="large" class="movie-cell">
      <!--<a :href="link" slot="cell-right">-->
      <router-link :to="{name:path}" tag="a" slot="cell-right">  
        <span class="more">更多<img src="../../../assets/images/ic_arrow_green_right.png" alt=""></span>
      </router-link>  
      <!--</a>-->
    </m-cell>
    <m-movie-swiper :list="list" :star="star" :path="path"></m-movie-swiper>
  </div>
</template>
<script>
  import { Header } from 'mint-ui';
  import mCell from '../../../components/cell'
  import mMovieSwiper from './MovieSwiper'
  export default {
    name: 'MovieGroup',
    props:{
      star:{
        type:Boolean,
        default:true
      },
      list:{
        type:Object
      },
      title:{
        type:String,
        default:''
      },
      path:{
          type:String,
          default:'/'
      }
    },
    data() {
      return {

      }
    },
    components: {
      'mHeader': Header,
      mCell,
      mMovieSwiper
    }
  }
</script>
<style lang="less">
@import "../../../assets/less/var.less";
.movie-cell{
  &.m-cell:before{
    height: 0
  }
  .more{
   
    color: @defaultColor;
  }
}

</style>