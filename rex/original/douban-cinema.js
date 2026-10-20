/**
 * Forward Widget：豆瓣影院
 * 展示豆瓣“正在上映”和“即将上映”电影。
 */

WidgetMetadata = {
  id: "forward.douban.cinema",
  title: "豆瓣影院",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  description: "获取豆瓣正在上映和即将上映的电影",
  author: "杨小盼",
  site: "https://movie.douban.com/cinema/",
  modules: [
    {
      id: "nowPlaying",
      title: "正在上映",
      description: "豆瓣影院正在上映电影",
      functionName: "loadNowPlaying",
      cacheDuration: 1800,
      params: [
        {
          name: "page",
          title: "页码",
          type: "page",
        },
        {
          name: "count",
          title: "每页数量",
          type: "count",
          value: "20",
        },
      ],
    },
    {
      id: "comingSoon",
      title: "即将上映",
      description: "豆瓣影院即将上映电影",
      functionName: "loadComingSoon",
      cacheDuration: 3600,
      params: [
        {
          name: "page",
          title: "页码",
          type: "page",
        },
        {
          name: "count",
          title: "每页数量",
          type: "count",
          value: "20",
        },
      ],
    },
  ],
};

var DOUBAN_API =
  "https://m.douban.com/rexxar/api/v2/subject_collection/";

var REQUEST_HEADERS = {
  Accept: "application/json, text/plain, */*",
  Referer: "https://m.douban.com/movie/",
  "User-Agent":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1",
};

async function loadNowPlaying(params) {
  return loadCollection("movie_showing", params);
}

async function loadComingSoon(params) {
  return loadCollection("movie_soon", params);
}

async function loadCollection(collection, params) {
  params = params || {};

  var page = Math.max(parseInt(params.page || "1", 10), 1);
  var count = Math.min(
    Math.max(parseInt(params.count || "20", 10), 1),
    50
  );
  var start = (page - 1) * count;
  var url =
    DOUBAN_API +
    collection +
    "/items?start=" +
    start +
    "&count=" +
    count +
    "&for_mobile=1";

  try {
    var response = await Widget.http.get(url, {
      headers: REQUEST_HEADERS,
    });

    var data = response && response.data;
    if (typeof data === "string") {
      data = JSON.parse(data);
    }

    var items = getCollectionItems(data);
    return items.map(formatMovie).filter(function (item) {
      return item !== null;
    });
  } catch (error) {
    console.error("豆瓣电影列表获取失败:", error);
    throw new Error(
      "豆瓣电影列表获取失败，请稍后重试；若频繁刷新，豆瓣可能会临时限制请求。"
    );
  }
}

function getCollectionItems(data) {
  if (!data) {
    return [];
  }
  if (Array.isArray(data)) {
    return data;
  }
  return (
    data.subject_collection_items || data.items || data.subjects || []
  );
}

function formatMovie(rawItem) {
  var movie = rawItem && (rawItem.subject || rawItem);
  if (!movie) {
    return null;
  }

  var id = movie.id || extractDoubanId(movie.uri || movie.url || "");
  var title = movie.title || movie.name || "";
  if (!id || !title) {
    return null;
  }

  var cover = getCoverUrl(movie);
  var rating = getRating(movie.rating);
  var genres = Array.isArray(movie.genres) ? movie.genres : [];

  return {
    id: String(id),
    type: "douban",
    title: title,
    originalTitle: movie.original_title || "",
    mediaType: "movie",
    coverUrl: cover,
    posterPath: cover,
    rating: rating,
    releaseDate: movie.release_date || movie.year || "",
    genreTitle: genres.join(" / "),
    description:
      movie.card_subtitle ||
      movie.info ||
      rawItem.info ||
      buildDescription(movie),
  };
}

function getCoverUrl(movie) {
  if (movie.cover && movie.cover.url) {
    return movie.cover.url;
  }
  if (movie.pic) {
    return movie.pic.large || movie.pic.normal || movie.pic.small || "";
  }
  if (movie.images) {
    return movie.images.large || movie.images.medium || movie.images.small || "";
  }
  return movie.cover_url || movie.poster || "";
}

function getRating(rating) {
  if (rating === null || rating === undefined) {
    return 0;
  }
  if (typeof rating === "number" || typeof rating === "string") {
    return Number(rating) || 0;
  }
  return Number(rating.value || rating.average || rating.score || 0) || 0;
}

function buildDescription(movie) {
  var parts = [];
  if (movie.release_date) {
    parts.push(movie.release_date + " 上映");
  }
  if (Array.isArray(movie.directors) && movie.directors.length) {
    parts.push("导演：" + joinNames(movie.directors));
  }
  if (Array.isArray(movie.actors) && movie.actors.length) {
    parts.push("主演：" + joinNames(movie.actors));
  }
  return parts.join(" · ");
}

function joinNames(people) {
  return people
    .map(function (person) {
      return typeof person === "string" ? person : person.name || "";
    })
    .filter(Boolean)
    .join(" / ");
}

function extractDoubanId(value) {
  var match = String(value).match(/(?:movie\/|subject\/|movie:)(\d+)/);
  return match ? match[1] : "";
}
