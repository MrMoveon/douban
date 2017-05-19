<template>
 <div class="page" v-if="data.images">
    <m-Header fixed :title="title" class="page-header detail-header" :style="{background:dominant}">
      <div slot="left">
        <mt-button @click="goBack"><img class="return-img" src="../../../assets/images/ic_bar_back_white.png" alt=""></mt-button>
      </div>
    </m-Header>
    <div class="page-container movieDetail" id="movieDetail">
      <div class="movieThumb" :style="{background:dominant}">
       <img class="movieThumb__img" :src="data.images.large" alt="" />
       <!--<img class="movieThumb__img" src="static/img/movie01.jpg" alt="" />-->
      </div>
      <div class="movieInfo">
        <div class="movieInfo__text" @click="handleInfo">
          <h3 class="movieInfo__title">{{data.title}}</h3>
          <p class="movieInfo__directors">导演：<span v-for="daoyan in data.directors"><i v-if="index==data.directors.length-1">{{daoyan.name}}</i><i v-else>{{daoyan.name}} / </i> </span></p>
          <p class="movieInfo__casts">主演：<span v-for="(zhuyan,index) in data.casts"><i v-if="index==data.casts.length-1">{{zhuyan.name}}</i><i v-else>{{zhuyan.name}} / </i> </span></p>
        </div>
        <div class="movieInfo__rating">
          <span class="movieInfo__num">4.8</span>
          <div class="movieInfo__star">
            <span v-for="(item,index) in starNum">
              <img class="movieInfo__img" v-if="item==1" src="../../../assets/images/rating_star_small_on.png" alt="">
              <img class="movieInfo__img" v-else src="../../../assets/images/rating_star_small_off.png" alt="">
            </span>
          </div>
          <span class="movieInfo__count">
            {{data.ratings_count}} 人
          </span>
        </div>
      </div>
      <div class="movieIntro">
        <h4 class="movieIntro__title">简介{{scrollHeight}}</h4>
        <p class="movieIntro__content" @click="intro_open"><span class="is_open">{{newSummary}}</span> <span class="movieIntro__open" v-if="is_more">{{is_open==false?'展开':'< 隐藏'}}</span></p>
      </div>
      <div class="movieStarre">
        <m-starring :list="data.casts"></m-starring>
      </div>
    </div>
    <div class="mask" v-if="showInfo" @click.self="showInfo=!showInfo">
      <transition :name="transitionName">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
  import {Header} from 'mint-ui'
  import {getMovieDetail} from '../../../store/api'
  import Star from '../../../components/star'
  import Starring from '../movie-components/Starring'
  import RGBaster from 'rgbaster'
 // import Vibrant from 'vibrant'
  let requestNum=0;
  export default {
    name: 'MovieDetail',
     components: {
      'mStar':Star,
      'mHeader':Header,
      'mStarring':Starring
    },
    data() {
      return {
        title:'电影',
        data:{},
        newSummary:'',
        dominant:'',
        is_open:false,
        is_more:false,
        showInfo:false
      }
    },
    created () {
      this.initData();
      
    },
    mounted () {
       
    },
    //  路由跳转之前获取数据
    beforeRouteEnter (to, from, next) {
      getMovieDetail(to.params.id).then((data)=>{
          next(vm=>{
            vm.data = data
            vm.getRgba(data.images.large);
            vm.summarySlice();
            vm.is_open=false;
            vm.$nextTick(()=>{
              vm.scrollY();
            })
          })
        });
    },
    watch: {
        '$route' (to, from) {
          if(to.name=='film_info'){
            this.transitionName = 'slide-bottom'
          }else{
            this.transitionName = 'slide-top'
          }
        //  const toDepth = to.path.split('/').length
        //   const fromDepth = from.path.split('/').length
        //  this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    },
    computed: {
      starNum(){
        // 向上去整，计算有多少科星
        let num=Math.ceil(this.data.rating.average)/2;
        let arr=[];
        for(let i=0;i<5;i++){
          if(i<num){
            arr.push(1);
          }else{
            arr.push(0);
          }
          
        }
        return arr;
      },
      scrollHeight(){
       return 0
      }
    },
    methods: {
      initData(){
        var id=this.$route.params.id;
        var vm=this;
        getMovieDetail(id).then((data)=>{
            vm.data = data
            vm.getRgba(data.images.large);
            vm.summarySlice();
            vm.is_open=false;
            vm.$nextTick(()=>{
              vm.scrollY();
            })
           //Vibrant图片取色插件，跨域占不能用
            // var img = document.createElement('img');
            // img.setAttribute('src', 'static/img/movie01.jpg')
            // img.addEventListener('load', function() {
            //   var vibrant = new Vibrant(img);
            //   var swatches = vibrant.swatches()
            //   vm.dominant=swatches['DarkVibrant'].getHex();
            //   console.log(swatches['DarkVibrant'].getHex())
            // });
        });
      },
      getRgba(url){
        var vm=this;
        // var temp="static/img/movie01.jpg";
        var img = document.createElement('img');
        img.setAttribute('src', url)
        img.addEventListener('load',()=>{
          RGBaster.colors(img, {
            exclude: [ 'rgb(255,255,255)', 'rgb(0,0,0)' ,'rgb(254,254,254)','rgb(254,255,255)'],
            paletteSize: 15,
            success: function(payload) {
              vm.dominant=payload.dominant;
              vm.setRgb(payload.dominant);
              console.log(payload)
            }
          });
        })
				
			},
      setRgb(RGB){
        var RgbValue = RGB.replace("rgb(", "").replace(")", "");
        var RgbValueArry = RgbValue.split(",");
        var grayLevel = RgbValueArry[0] * 0.299 + RgbValueArry[1] * 0.587 + RgbValueArry[2] * 0.114;
        if (grayLevel >= 192) { 
        　　console.log(grayLevel+"浅色")
            for(var i=0;i<RgbValueArry.length;i++){
              RgbValueArry[i]=RgbValueArry[i]-70;
            }
           this.dominant="rgb("+RgbValueArry[0]+","+RgbValueArry[1]+","+RgbValueArry[2]+")";
        } else {
        　　console.log(grayLevel+"深色")
        }
      },
      summarySlice(){
        var summary=this.data.summary;
        var len=summary.length;
        if(len>70){
          this.is_more=true;
          this.newSummary=summary.slice(0,70)+'...';
        }else{
          this.newSummary=this.data.summary;
          this.is_more=false;
        }
       
      },
      intro_open(){
        this.newSummary=this.data.summary;
        if(this.is_open){
          this.summarySlice();
        }
        this.is_open=!this.is_open;
        
      },
      handleInfo(){
        this.showInfo=true;
        this.$nextTick(()=>{
          this.$router.push({ name: 'FilmInfo' })
        })
        
      },
      scrollY(){
        var box=document.querySelector('#movieDetail')
         box.addEventListener('scroll', ()=>{
            if(box.scrollTop>350){
              this.title=this.data.title;
            }else{
              this.title='电影'
            }
          })
      },
      goBack(){
        this.$router.go(-1);
      }
    }
   
  }
</script>
<style lang="less">
@import '../../../assets/less/var.less';
.page-header ~ div.page-container{
  bottom: 0;
}
.page-header.detail-header{
  color: #fff;
  border-bottom: none;
  transition: all 1s;
  .mint-header-title{
    color: #fff;
    font-size: 16px;
  }
}
.movieThumb{
  height:290px;
  box-sizing: border-box;
  padding:20px;
  text-align: center;
  transition: all 1s;
}
.movieThumb__img{
  height: 100%;
}
.movieInfo{
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding: 25px 15px;
}
.movieInfo__text{
  flex: 1;
  box-sizing: border-box;
  padding-right: 50px;
}
.movieInfo__title{
  font-size: 27px;
  font-weight: bold;
}
.movieInfo__directors{
  font-size: 12px;
  color: #999;
  i{font-style: normal}
}
.movieInfo__casts{
font-size: 12px;
color: #999;
i{font-style: normal}
}
.movieInfo__rating{
  width: 85px;
  height: 85px;
  box-shadow:0 0 10px #e9e8e5;
  text-align: center;
  justify-content: center;
}
.movieInfo__num{
  display: block;
  font-size: 17px;
  color: #333;
  font-weight: bold;
  text-align: center;
  padding-top:16px;
}
.movieInfo__star{
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  align-items: center;
}
.movieInfo__img{
  width: 10px;
  height: 10px;
}
.movieInfo__count{
  display: block;

}
// movieIntro
.movieIntro{
  padding:15px;
  position: relative;
  &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      background: @line;
      transform: scaleY(0.5);
  }
  &__title{
    padding:15px 0;
    font-size: 17px;
    font-weight: normal;
    color: #333;
  }
  &__content{
    font-size:15px;
  }
  &__open{
    color: @defaultColor;
  }
}
.mask{
  position: absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
  background: rgba(0,0,0,0.5);
  z-index: 10;
}
</style>