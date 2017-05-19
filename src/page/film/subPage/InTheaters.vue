<template>
  <div class="film-wrap">
    <div class="film">
      <ul class="film--list">
        <li class="film-item" v-for="(item,index) in data">
          <img class="thumb" :src="item.images.small" alt="">
          <div class="film-item--content">
            <h3>{{item.title}}</h3>
            <m-star :num="item.rating.average"></m-star>
            <p class="daoyan">导演：<span v-for="daoyan in item.directors">{{daoyan.name}} / </span></p>
            <p class="zhuyan">主演：<span v-for="zhuyan in item.casts">{{zhuyan.name}} / </span></p>
            <p class="kanguo">{{item.collect_count}}人看过</p>
          </div>
          <div class="film-item--right">
               <router-link :to="{name:'MovieDetail',params:{id:item.id}}" tag='a'  class="btn">
               详情
              </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import star from '../../../components/star'
  import {getInTheaters} from '../../../store/api'
  export default {
    name: 'InTheaters',
    components: {
      'mStar':star
    },
    data() {
      return {
        data:{}
        
      }
    },
    created () {
      this.initData();
    },
    methods: {
      initData(){
        getInTheaters().then((data)=>{
          this.data=data.subjects;
        })
      }
    }
   
  }
</script>
<style lang="less">


</style>