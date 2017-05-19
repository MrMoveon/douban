<template>
  <div class="filmInfo">
    <div class="filmInfo__header">
      <a class="filmInfo__close" @click="goBack">
        <img class="filmInfo__closeimg" src="../../../assets/images/ic_group_history_delete.png" alt="">
      </a>
    </div>
    <div class="filmInfo__content">
      <h3>影片信息</h3>
      <div class="filmInfo__item">
        <div class="filmInfo__label">导演：</div>
        <div class="filmInfo__con"><span v-for="(item,index) in data.directors"><i v-if="index==data.directors.length-1">{{item.name}}</i><i v-else>{{item.name}} / </i></span></div>
      </div>
     
      <div class="filmInfo__item">
        <div class="filmInfo__label">主演：</div>
        <div class="filmInfo__con"><span v-for="(item,index) in data.casts"><i v-if="index==data.casts.length-1">{{item.name}}</i><i v-else>{{item.name}} / </i></span></div>
      </div>
      <div class="filmInfo__item">
        <div class="filmInfo__label">又名：</div>
        <div class="filmInfo__con"><span v-for="(item,index) in data.aka"><i v-if="index==data.aka.length-1">{{item}}</i><i v-else>{{item}} / </i></span></div>
      </div>
    
      <div class="filmInfo__item">
        <div class="filmInfo__label">类型：</div>
        <div class="filmInfo__con"><span v-for="(item,index) in data.genres"><i v-if="index==data.genres.length-1">{{item}}</i><i v-else>{{item}} / </i></span></div>
      </div>
      
      <div class="filmInfo__item">
        <div class="filmInfo__label">地区：</div>
        <div class="filmInfo__con"><span v-for="(item,index) in data.countries"><i v-if="index==data.countries.length-1">{{item}}</i><i v-else>{{item}} / </i></span></div>
      </div>
     
    </div>
  </div>
</template>
<script>
import {

  getMovieDetail

} from '../../../store/api'

export default {
  name: 'FilmInfo',
  data() {
    return {
      data: []
    }
  },
  created() {
   this.initData();
  },

  methods: {
    initData() {
      getMovieDetail(this.$route.params.id).then((data) => {
        this.data = data;
      });
    },
    goBack(){
      this.$router.go(-1);
      setTimeout(()=>{
        this.$parent.showInfo=false;
      },500)
      
    }

  }
}
</script>
<style lang="less">
.filmInfo{
  background: #fff;
  height: 100%;
  width: 100%;
  position:absolute;
  left:0;
  top:0;
  right:0;
  transition: all .8s cubic-bezier(.55,0,.1,1);
  &__header{
    padding:15px;
  }
  &__close{
    display: block;
    width: 20px;
    height: 20px;
  }
  &__closeimg{
    width:100%;
    height:100%;
  }
  &__content{
    padding: 15px;
  }
  &__item{
    display: flex;
    flex-direction: row;
  }
  &__label{
    color: #9b9b9b;
    font-size: 14px;
    width: 50px;
  }
  &__con{
    flex: 1;
    color:#555;
    font-size: 14px;
    i{
      font-style: normal;
    }
  }
}
</style>