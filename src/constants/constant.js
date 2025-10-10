const GOOGLE_API_KEY = "********************************************";

export const YOUTUBE_API =
  "https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=50&regionCode=PK&key=" +
  GOOGLE_API_KEY;

export const YOUTUBE_VIDEO_DETAILS_API = (id) =>
  `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${GOOGLE_API_KEY}`;
