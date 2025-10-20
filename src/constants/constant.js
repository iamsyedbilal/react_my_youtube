const GOOGLE_API_KEY = "AIzaSyBOk17z33wxrv4sHcoVUepyJNh3mc2mnwA";

export const YOUTUBE_API =
  "https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=50&regionCode=PK&key=" +
  GOOGLE_API_KEY;

export const YOUTUBE_VIDEO_DETAILS_API = (id) =>
  `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${GOOGLE_API_KEY}`;

export const YOUTUBE_SEARCH_API = (query) =>
  `https://corsproxy.io/?https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${query}&key=${GOOGLE_API_KEY}`;

export const YOUTUBE_CATEGORIES_API = (regionCode = "US") =>
  `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=${regionCode}&key=${GOOGLE_API_KEY}`;

export const YOUTUBE_SEARCH_RESULTS_API = (query) =>
  `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=video&q=${query}&key=${GOOGLE_API_KEY}`;

export const YOUTUBE_CATEGORY_VIDEOS_API = (categoryId, regionCode = "US") =>
  `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=50&regionCode=${regionCode}&videoCategoryId=${categoryId}&key=${GOOGLE_API_KEY}`;
