<template>
  <div class="page">
    <m-Header fixed title="豆瓣电影" class="page-header"></m-Header>
    <div class="page-container">
      <m-movie-group :list="inTheaters" title="影院热映" path="InTheaters"></m-movie-group>
      <div class="line"></div>
      <m-movie-group :list="comingSoon" title="即将上映" path="ComingSoon" :star="false"></m-movie-group>
      <div class="line"></div>
      <m-selection-list :spaceBetween="15" :list="selectionList"></m-selection-list>
    </div>
  </div>
</template>
<script>
  import { Header } from 'mint-ui'
  import mCell from '../../components/cell'
  import mMovieGroup from './movie-components/MovieGroup'
  import mSelectionList from './movie-components/SelectionList'
  import { bus } from '../../bus.js'
  export default {
    name: 'Movie',
    data() {
      return {
        inTheaters:{},
        comingSoon:{},
        selectionList:[{
          img:'/static/img/jingxuan01.jpg',
          name:'Top250'
        },{
          img:'/static/img/jingxuan02.jpg',
          name:'Weekly'
        },{
          img:'/static/img/jingxuan03.jpg',
          name:'New_movies'
        },{
          img:'/static/img/jingxuan04.jpg',
          name:'Us_box'
        }]
      }
    },
    components: {
      'mHeader': Header,
      mCell,
      mMovieGroup,
      mSelectionList
    },
    created () {
      
    
      
    },
    mounted () {
       this.axios.all([this.getInTheaters(), this.getComingSoon()]).then(this.axios.spread((inTheaters, comingSoon)=> {
        this.inTheaters=inTheaters.data;
        this.comingSoon=comingSoon.data;
       
        // 两个请求现在都执行完成
        bus.$emit('initSwiper');
      }));
    },
    methods: {
        getInTheaters(){
          return this.axios.get('api/movie/in_theaters?count=10')
        },
        getComingSoon(){
          return this.axios.get('api/movie/coming_soon?count=10')
        }
    }

  }
</script>
<style lang="less" scoped>
@import "../../assets/less/var.less";
.page-header ~ div.page-container {
    bottom: 50px;
    
}
.movie-cell{
  &.m-cell:before{
    height: 0
  }
  .more{
   
    color: @defaultColor;
  }
}

</style>