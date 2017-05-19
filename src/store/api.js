import axios from 'axios';
const HOST=process.env.NODE_ENV === 'development' ? 'api' : 'http://localhost:8081';

export function fetch(url){
    return new Promise((resolve,reject)=>{
        axios.get(HOST+url).then((response)=>{
            resolve(response.data);
        })
    })
}
// 票房榜
export function getUsBox(){
   return fetch('/movie/us_box');
}
//豆瓣top250
export function getTop250(start,count){
    return fetch('/movie/top250?start='+start+'&count='+count);
}
//正在热映
export function getInTheaters(){
    return fetch('/movie/in_theaters');
}
//即将上映
export function getComingSoon(){
    return fetch('/movie/coming_soon');
}
//详情
export function getMovieDetail(id){
    return fetch('/movie/subject/'+id);
}