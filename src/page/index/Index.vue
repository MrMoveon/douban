<template>
	<div class="page">
		<m-Header fixed title="首页" class="page-header"></m-Header>
		<div class="page-container">
			<m-swipe swipeid="swipe01" :autoplay="3000" paginationDirection="center">
				<div class="swiper-slide " slot="swiper-con"><img src="../../assets/images/01.jpg" alt=""></div>
				<div class="swiper-slide " slot="swiper-con"><img src="../../assets/images/02.jpg" alt=""></div>
				<div class="swiper-slide " slot="swiper-con"><img src="../../assets/images/03.jpg" alt=""></div>
			</m-swipe>
			<!--
			<m-cell title="提醒" icon>
				<img src="../../assets/images/ic_mine_notification.png" slot="icon">
				<a href="javascript:;" slot="cell-right"><img src="../../assets/images/ic_arrow_gray_small.png" alt=""></a>
			</m-cell>
			<m-cell title="设置">
				<a href="javascript:;" slot="cell-right"><img src="../../assets/images/ic_arrow_gray_small.png" alt=""></a>
			</m-cell>
			-->
			<!--热门-->
			<div class="hot-wrap">
				<m-cell title="热点" label="hot">
				<!--<a href="javascript:;" slot="cell-right">更多<img src="../../assets/images/ic_arrow_gray_small.png" alt=""></a>-->
				</m-cell>
				<m-cell-media :author="item.target.author.name" :column="item.source_cn" :img="item.target.cover_url" v-for="(item,index) in hotData"
				:key="item.id">

				<span slot="title">{{item.title}}</span>
				<span slot="describe">{{item.target.desc}}</span>
				</m-cell-media>
			</div>
		</div>
	</div>
</template>
<script>
	import { Header } from 'mint-ui'
	import mSwipe from '../../components/swipe'
	import mCell from '../../components/cell'
  	import mCellMedia from '../../components/cell-media'
	import RGBaster from 'rgbaster'
	export default {
		name: 'Index',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				recommendData: [],
        		hotData: []
			}
		},
		components: {
			'mHeader': Header,
			mSwipe,
			mCell,
      		mCellMedia
		},
		created () {
			this.fetchData();
			
		},
		methods: {
			fetchData() {
				this.axios.get('/api/homeData').then((response) => {
				let data = response.data.data.recommend_feeds;
				let recommend = [];
				let hot = [];
				for (var i in data) {
					if (data[i].card && data[i].card.name == '为你推荐') {
					recommend.push(data[i]);
					} else {
					hot.push(data[i]);
					}
				}

				this.recommendData = recommend;
				this.hotData = hot;

				})
			}
			
		}
	}
</script>
<style lang="less">
.hot-wrap{
	padding-top: 10px;
}
</style>