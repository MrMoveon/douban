<template>
  <div class="star">
    <span class="star-left" v-for="(item,index) in starNum">
      <img v-if="item==1" class="star-img" src="../assets/images/rating_star_small_on.png" alt="">
      <img v-else class="star-img" src="../assets/images/rating_star_small_off.png" alt="">
    </span>
    <span class="num">{{num}}</span>
  </div>
</template>

<script>
  export default {
    name: 'star',
    props: {
      num:{
        type:Number,
        default:0
      }
    },
    computed: {
      starNum(){
        // 向上去整，计算有多少科星
        let num=Math.ceil(this.num)/2;
        let arr=[];
        for(let i=0;i<5;i++){
          if(i<num){
            arr.push(1);
          }else{
            arr.push(0);
          }
          
        }
        return arr;
      }
    }
  }
</script>


<style lang="less" scoped>
.star{
  display: flex;
  flex-direction: row;
  font-size: 12px;
  color: #999;
  .num{
    margin-left:5px;
  }
  .star-left{
    font-size: 0;
    padding-top:3px;
  }
}
.star-img{
  width: 12px;
  height: 12px;
 
}
</style>