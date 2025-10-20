import { useSearchParams } from "react-router-dom";
import { YOUTUBE_SEARCH_RESULTS_API } from "../constants/constant";
import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

function SearchResult() {
  const [videos, setVideos] = useState([]);
  const [searchQuery] = useSearchParams();
  const query = searchQuery.get("q");

  useEffect(() => {
    if (query) getSearchResults();
  }, [query]);

  async function getSearchResults() {
    const res = await fetch(YOUTUBE_SEARCH_RESULTS_API(query));
    const json = await res.json();
    setVideos(json?.items || []);
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {videos.length > 0 ? (
        videos.map((video) => (
          <Link key={video.id.videoId} to={"/watch?v=" + video.id.videoId}>
            <VideoCard info={video} />
          </Link>
        ))
      ) : (
        <p className="text-gray-600 mt-10 text-lg">
          No Result Found for <strong>{query}</strong>
        </p>
      )}
    </div>
  );
}

export default SearchResult;
