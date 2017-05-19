<template>
<div>
  <m-cell title="影人" size="large" class="movie-cell">
  </m-cell>
  <div class="swiper-container" ref="carousel">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in list" :key="index">
            <router-link :to="{name:'Movie'}" tag="a">
              <img :src="item.avatars.small" alt="">
              <p class="name">{{item.name}}</p>
            </router-link>
         </div>
    </div>
  </div>
 </div> 
</template>
<script>
  import '../../../lib/swiper/js/swiper.js'
  import mCell from '../../../components/cell'
  export default {
    name:'Starring',
    components:{
      mCell
    },
    props: {
      list:{
        type:Array,
        default:[]
      },
      spaceBetween:{
        type:Number,
        default:15
      }
    },
    mounted() {
      var That = this;
      new Swiper(That.$refs.carousel, {
        freeMode:true,
        slidesPerView: 'auto',
        paginationClickable: true,
        spaceBetween: That.spaceBetween
      })
    }
  }

</script>
<style lang="less" scoped>
@import "../../../assets/less/var.less";
  .movie-cell{
    &.m-cell:before{
      height: 0
    }
    .more{
      color: @defaultColor;
    }
     .m-cell-title{
      font-size: 12px;
      color: #aeaeae;
    }
  }
    .swiper-container {
        width: 100%;
        height: 177px;
    }
   
    .swiper-slide {
        background: #fff;
        width: 105px;
       
        &:nth-of-type(1){
          margin-left:15px;
        }
        a{
          display: block;
          position: relative;
          color: #333;
        }
        img{
          display: block;
          height: 150px;
        }
        .name{
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          color: #999;
          padding-top:5px;
          padding-bottom: 5px;
        }
        
    }

</style>