<template>
 <div class="page">
    <m-Header fixed title="新片榜" class="page-header">
      <div slot="left">
        <mt-button @click="goBack"><img class="return-img" src="../../../assets/images/ic_bar_back_green.png" alt=""></mt-button>
      </div>
    </m-Header>
    <div class="page-container">

        <div class="film">
          <ul class="film--list">
            <li class="film-item film-item-choice" v-for="(item,index) in data">
              <div class="film-item--index">{{index+1}}</div>
              <router-link :to="{name:'MovieDetail',params:{id:item.subject.id}}" tag='div'  class="film-item--box">
                <img class="thumb" :src="item.subject.images.small" alt="">
                <div class="film-item--content">
                  <h3>{{item.subject.title}}</h3>
                  <m-star :num="item.subject.rating.average"></m-star>
                  <p class="daoyan">导演：<span v-for="daoyan in item.subject.directors">{{daoyan.name}} / </span></p>
                  <p class="zhuyan">主演：<span v-for="zhuyan in item.subject.casts">{{zhuyan.name}} / </span></p>
                </div>
              </router-link>
              <div class="film-item--amount">票房 {{box[index].box}} 万美元</div>
            </li>
          </ul>
         
        </div>

    </div>
  </div>
  
</template>
<script>
  import {Header} from 'mint-ui'
   import {getUsBox} from '../../../store/api'
  import star from '../../../components/star'
  let requestNum=0;
  export default {
    name: 'New_movies',
     components: {
      'mStar':star,
      'mHeader':Header
    },
    data() {
      return {
        data:[]
      }
    },
    created () {
      this.initData();
    },
    computed:{
      box(){
        var data=this.data;
        var newData=[];
        for(var item in data){
         newData[item]={
           box:Math.ceil(data[item].box/10000),
           subject:data[item].subject
         }
        }
        return newData;
      }
    },
    methods: {
      initData(){
       getUsBox().then((data)=>{
           this.data=data.subjects;
        });
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