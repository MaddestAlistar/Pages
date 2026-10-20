/**
 * LiangYouTech - Rex cinema poster compatibility.
 * Preserves the existing HotPicks "getMovies" homepage module.
 * Replaces non-TMDB backdrop URLs with compatible TMDB artwork paths.
 */
var WidgetMetadata = {
  id: "liangyou.maoyan.cinema",
  title: "猫眼电影 · LiangYouTech",
  description: "正在热映、即将上映；修正横版海报地址兼容性",
  version: "1.0.0",
  author: "LiangYouTech",
  requiredVersion: "0.0.1",
  site: "https://github.com/MaddestAlistar/Pages",
  modules: [{
    id: "getMovies", title: "正在热映", functionName: "getMovies",
    type: "video", cacheDuration: 1800,
    params: [
      { name: "sort", title: "类型", type: "enumeration", value: "now_playing",
        enumOptions: [
          { title: "正在热映", value: "now_playing" },
          { title: "即将上映", value: "coming_soon" },
          { title: "经典影片", value: "top250" }
        ] },
      { name: "page", title: "页数", type: "page" },
      { name: "count", title: "每页数量", type: "count", value: "20" }
    ]
  }]
};
var LY_CINEMA_DATA = "https://raw.githubusercontent.com/2kuai/ForwardWidgets/main/data/douban_movie_data.json";
function lyMovieData(response) {
  if (!response) return {};
  var value = response.data === undefined ? response : response.data;
  if (typeof value === "string") {
    try { value = JSON.parse(value); } catch (e) { return {}; }
  }
  return value && typeof value === "object" ? value : {};
}
function lyTmdbPath(path) {
  return typeof path === "string" && /^\/[A-Za-z0-9_\-]+\.(?:jpe?g|png|webp)$/i.test(path.trim()) ? path.trim() : "";
}
function lyExternalImage(path) {
  return typeof path === "string" && /^https:\/\//.test(path.trim()) ? path.trim() : "";
}
function lyFixedMovie(item) {
  var x = Object.assign({}, item);
  var poster = lyTmdbPath(x.posterPath);
  var backdrop = lyTmdbPath(x.backdropPath);
  // Full external URLs must never be provided as TMDB "backdropPath".
  if (x.type === "tmdb") {
    x.posterPath = poster || lyTmdbPath(x.backdropPath) || "";
    x.backdropPath = backdrop || poster || "";
    if (x.posterPath) {
      x.coverUrl = "https://image.tmdb.org/t/p/w780" + x.posterPath;
    } else {
      var fallback = lyExternalImage(item.posterPath) || lyExternalImage(item.backdropPath);
      if (fallback) {
        x.type = "url";
        x.link = x.id ? "https://www.themoviedb.org/movie/" + x.id : "https://movie.douban.com/";
        x.coverUrl = fallback;
        x.posterPath = fallback;
        x.backdropPath = fallback;
      }
    }
  } else {
    var image = lyExternalImage(x.coverUrl) || lyExternalImage(x.posterPath) || lyExternalImage(x.backdropPath);
    if (image) {
      x.coverUrl = image;
      x.posterPath = image;
      x.backdropPath = image;
    }
  }
  return x;
}
async function getMovies(params) {
  params = params || {};
  var sort = ["now_playing", "coming_soon", "top250"].indexOf(params.sort) >= 0 ? params.sort : "now_playing";
  var data = lyMovieData(await Widget.http.get(LY_CINEMA_DATA));
  var records = Array.isArray(data[sort]) ? data[sort] : [];
  var count = Math.min(80, Math.max(1, parseInt(params.count || "20", 10) || 20));
  var page = Math.max(1, parseInt(params.page || "1", 10) || 1);
  return records.slice((page - 1) * count, page * count).filter(function(x){return x && x.title;}).map(lyFixedMovie);
}
