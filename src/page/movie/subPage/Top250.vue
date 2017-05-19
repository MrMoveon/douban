<template>
 <div class="page">
    <m-Header fixed title="TOP250" class="page-header">
      <div slot="left">
        <mt-button @click="goBack"><img class="return-img" src="../../../assets/images/ic_bar_back_green.png" alt=""></mt-button>
      </div>
    </m-Header>
    <div class="page-container">

        <div class="film" :style="{height:wrapperHeight+'px'}">
          <ul class="film--list" v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="0">
            <li class="film-item film-item-choice" v-for="(item,index) in data">
              <div class="film-item--index">{{index+1}}</div>
              <!--<div class="film-item--box">-->
              <router-link :to="{name:'MovieDetail',params:{id:item.id}}" tag='div'  class="film-item--box">
                <img class="thumb" :src="item.images.small" alt="">
                <div class="film-item--content">
                  <h3>{{item.title}}</h3>
                  <m-star :num="item.rating.average"></m-star>
                  <p class="daoyan">导演：<span v-for="daoyan in item.directors">{{daoyan.name}} / </span></p>
                  <p class="zhuyan">主演：<span v-for="zhuyan in item.casts">{{zhuyan.name}} / </span></p>
                </div>
              </router-link>  
               <!--</div>-->
            </li>
          </ul>
          <p v-show="loading" class="page-infinite-loading">
            <m-spinner type="fading-circle"></m-spinner>
            加载中...
          </p>
        </div>

    </div>
  </div>
  
</template>
<script>
  import {Header,InfiniteScroll,Spinner} from 'mint-ui';
  import {getTop250} from '../../../store/api'
  import star from '../../../components/star'
  let requestNum=0;
  export default {
    name: 'Top250',
     components: {
      'mStar':star,
      'mHeader':Header,
      'mSpinner':Spinner
    },
    data() {
      return {
        data:[],
        loading:false,
        wrapperHeight:0,
        list:[1,2,3,4,5,6,7,8,9,10]
      }
    },
    created () {
      this.initData(0,10);
    },
    mounted () {
      this.loading = false;
      this.wrapperHeight = document.documentElement.clientHeight -50;
    },
    methods: {
      initData(start,count){
        getTop250(start,count).then((data)=>{
           this.data=data.subjects;
           
           requestNum++;
        })
       
      },
      loadMore() {
        this.loading = true;
        var params=this.$route.params.id;
        var start=10*requestNum;
        var count=10;
        getTop250(start,count).then((data)=>{
           this.data=this.data.concat(data.subjects);
           requestNum++;
           this.loading = false;
        })
      },
      goBack(){
        this.$router.go(-1);
      }
    }
   
  }
</script>
<style lang="less">
.page-header ~ div.page-container{
  bottom: 0;
 
}
.page-infinite-loading{
    text-align: center;
    height: 50px;
    line-height: 50px;
    div {
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
</style>