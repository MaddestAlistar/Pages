/* LiangYouTech - 仅供确认Rex海报取图字段，非正式影片库 */
var WidgetMetadata = {
 id:"liangyoutech.poster.diagnostic.20261021",
 title:"LiangYouTech · 海报诊断",
 author:"LiangYouTech",version:"1.0.0",requiredVersion:"0.0.1",
 modules:[{id:"posterDiagnostics",title:"图片路径诊断",functionName:"loadPosterDiagnostics",type:"video",cacheDuration:0,params:[]}]
};
function loadPosterDiagnostics(){
 var base="https://image.tmdb.org/t/p/";
 return [
  {id:"movie.1439171",type:"tmdb",mediaType:"movie",title:"测试①·TMDB内置海报",posterPath:"/jfDFyAb9DW6QczgNeieSzPOz1cT.jpg",backdropPath:"/9gKgRM5nzNBQVy50peiR2eYQVX0.jpg"},
  {id:"https://www.themoviedb.org/movie/1439171?test=2",type:"url",mediaType:"movie",title:"测试②·海报直链",link:"https://www.themoviedb.org/movie/1439171",coverUrl:base+"w780/jfDFyAb9DW6QczgNeieSzPOz1cT.jpg",backdropPath:base+"w780/jfDFyAb9DW6QczgNeieSzPOz1cT.jpg",posterPath:base+"w500/jfDFyAb9DW6QczgNeieSzPOz1cT.jpg"},
  {id:"https://www.themoviedb.org/movie/1439171?test=3",type:"url",mediaType:"movie",title:"测试③·剧照直链",link:"https://www.themoviedb.org/movie/1439171",coverUrl:base+"w780/9gKgRM5nzNBQVy50peiR2eYQVX0.jpg",backdropPath:base+"w780/9gKgRM5nzNBQVy50peiR2eYQVX0.jpg",posterPath:base+"w500/jfDFyAb9DW6QczgNeieSzPOz1cT.jpg"},
  {id:"https://www.themoviedb.org/movie/1255833?test=4",type:"url",mediaType:"movie",title:"测试④·对照《鲸口脱险》",link:"https://www.themoviedb.org/movie/1255833",coverUrl:base+"w780/hBoY4pwszgeBEXLZ53WDTyLIMhr.jpg",backdropPath:base+"w780/hBoY4pwszgeBEXLZ53WDTyLIMhr.jpg",posterPath:base+"w500/dGDJlUMPbLPavjrpMwUhmDHCBMB.jpg"}
 ];
}
