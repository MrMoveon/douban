import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/page/main/Main'
import Index from '@/page/index/Index'
import Movie from '@/page/movie/Movie'
import Book from '@/page/book/Book'
import Me from '@/page/me/Me'

import Film from '@/page/film/Film'
import InTheaters from '@/page/film/subPage/InTheaters'
import ComingSoon from '@/page/film/subPage/ComingSoon'
import Top250 from '@/page/movie/subPage/Top250'
import New_movies from '@/page/movie/subPage/New_movies'
import Us_box from '@/page/movie/subPage/Us_box'
import Weekly from '@/page/movie/subPage/Weekly'
import MovieDetail from '@/page/movie/subPage/MovieDetail'
import FilmInfo from '@/page/movie/subPage/FilmInfo'


Vue.use(Router)

export default new Router({
  routes: [
     {
      path: '/main',
      name:'Main',
      component:Main,
      children:[
        {
          path: 'index',
          name: 'Index',
          component: Index
        },
        {
          path: 'movie',
          name: 'Movie',
          component: Movie,
        },
        {
          path: 'book',
          name: 'Book',
          component: Book
        },
        {
          path: 'me',
          name: 'Me',
          component: Me
        }
      ]
    },
    {
      path: '/main/movie',
      name: 'Film',
      component: Film,
      children:[
        {
          path: 'inTheaters',
          name: 'InTheaters',
          component: InTheaters
        },
        {
          path: 'comingSoon',
          name: 'ComingSoon',
          component: ComingSoon
        }
      ]
    },
    {
      path: '/main/movie/top250',
      name: 'Top250',
      component: Top250
    },
    {
      path: '/main/movie/new_movies',
      name: 'New_movies',
      component: New_movies
    },
    {
      path: '/main/movie/us_box',
      name: 'Us_box',
      component: Us_box
    },
    {
      path: '/main/movie/weekly',
      name: 'Weekly',
      component: Weekly
    },
    {
      path: '/main/movie/detail/:id',
      name: 'MovieDetail',
      component: MovieDetail,
      children:[
       { 
         path:'film_info',
         name:'FilmInfo',
         component:FilmInfo
        }
      ]
    },
    {
      path: '/',
      redirect: '/main/index'
    },
    {
      path: '*',
      redirect: '/main/index'
    }
  ]
})
