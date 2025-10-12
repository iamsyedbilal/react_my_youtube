import { YOUTUBE_API } from "../constants/constant";
import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

function VideoContainer() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getAllVideos();
  }, []);

  async function getAllVideos() {
    const youtubeVideosData = await fetch(YOUTUBE_API);
    const json = await youtubeVideosData.json();
    setVideos(json.items);
  }

  return (
    <div className="flex flex-wrap items-center justify-center py-4 ">
      {videos &&
        videos.map((video) => {
          return (
            <Link key={video.id} to={"/watch?v=" + video.id}>
              <VideoCard info={video} />
            </Link>
          );
        })}
    </div>
  );
}
export default VideoContainer;
