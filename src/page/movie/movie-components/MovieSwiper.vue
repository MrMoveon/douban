<template>
  <div class="swiper-container" ref="movie">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in list.subjects" :key="index">
              <router-link :to="{name:'MovieDetail',params:{id:item.id}}" tag='a'>
                <img :src="item.images.medium" alt="">
                <div class="text">{{item.title}}</div>
                <m-star :num="item.rating.average" v-if="star"></m-star>
                <span class="collect_count" v-else>{{item.collect_count}} 人想看</span>
              </router-link>
            </div>
            <div class="swiper-slide" v-if="isShow">
              <router-link :to="{name:path}" tag="a" slot="cell-right">  
                <img src="../../../assets/images/movie-all-gray.png" alt="">
                <div class="text-all">全部<br />{{list.total}}部</div>
                </router-link>  
            </div>
        </div>
    </div>
</template>
<script>
  import { bus } from '../../../bus.js'
  import '../../../lib/swiper/js/swiper.js'
  import mStar from '../../../components/star'
  export default {
    name: 'MovieSwiper',
     props:{
      list:{
        type:Object
      },
      star:{
        type:Boolean,
        default:true
      },
      path:{
          type:String,
          default:'/'
      }
    },
    data() {
      return {
        isShow:false
      }
    },
    components: {
     mStar
    },
    created () {
      bus.$on('initSwiper',()=>{
        this.isShow=true;
        this.$nextTick(()=>{
          this.initSwier();
        })
      })
      
    },
    mounted () {
      
    },
    methods: {
      initSwier(){
         var swiper = new Swiper(this.$refs.movie, {
            freeMode:true,
            slidesPerView: 'auto',
            paginationClickable: true,
            spaceBetween: 15
        });
      }
    }
  }
</script>
<style lang="less" scoped>
    .swiper-container {
        width: 100%;
        height: 200px;
    }
   
    .swiper-slide {
        background: #fff;
        width: 100px;
       
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
          height: 147px;
        }
        .text{
          display: block;
          width: 100%;
          font-size: 14px;
          font-weight: bold;
          padding-top: 5px;
         
          white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
        }
        .star{
          font-size: 12px;
        }
        /* Center slide text vertically */
        .collect_count{
          color: #999;
          font-size: 12px;
        }
        .text-all{
          position: absolute;
          left: 0;
          top: 0;
          width: 100px;
          height: 142px;
          display: flex;
          flex: 1;
          align-items:center;
          justify-content: center;
          color: #999;
        }
    }

</style>