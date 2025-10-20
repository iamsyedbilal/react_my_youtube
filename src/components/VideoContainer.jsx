import {
  YOUTUBE_API,
  YOUTUBE_CATEGORY_VIDEOS_API,
} from "../constants/constant";
import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

function VideoContainer({ selectedCategory }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (selectedCategory === 0) {
      getAllVideos();
    } else {
      fetchCategoryVideos(selectedCategory);
    }
  }, [selectedCategory]);

  async function getAllVideos() {
    const youtubeVideosData = await fetch(YOUTUBE_API);
    const json = await youtubeVideosData.json();
    setVideos(json?.items || []);
  }

  async function fetchCategoryVideos(categoryId) {
    const res = await fetch(YOUTUBE_CATEGORY_VIDEOS_API(categoryId));
    const data = await res.json();
    setVideos(data?.items || []);
  }

  return (
    <div className="flex flex-wrap items-center justify-center py-4 ">
      {videos.length > 0 ? (
        videos.map((video) => {
          return (
            <Link key={video.id} to={"/watch?v=" + video.id}>
              <VideoCard info={video} />
            </Link>
          );
        })
      ) : (
        <strong className="text-gray-600 mt-10 text-lg">No Result Found</strong>
      )}
    </div>
  );
}
export default VideoContainer;
