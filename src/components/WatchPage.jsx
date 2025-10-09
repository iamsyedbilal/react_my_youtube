import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { YOUTUBE_VIDEO_DETAILS_API } from "../constants/constant";
import { AiOutlineEye, AiFillLike, AiOutlineCalendar } from "react-icons/ai";

function WatchPage() {
  const [videoData, setVideoData] = useState(null);
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  useEffect(() => {
    if (videoId) getVideoDetails(videoId);
  }, [videoId]);

  async function getVideoDetails(id) {
    try {
      const res = await fetch(YOUTUBE_VIDEO_DETAILS_API(id));
      const json = await res.json();
      setVideoData(json.items[0]);
    } catch (err) {
      console.error("Error fetching video details:", err);
    }
  }

  if (!videoData) {
    return (
      <div className="text-center py-10 text-gray-600">Loading video...</div>
    );
  }

  const { snippet, statistics } = videoData;
  const publishedDate = new Date(snippet.publishedAt).toLocaleDateString();

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 max-w-7xl mx-auto">
      {/* 🎥 Left side: video player */}
      <div className="flex-1">
        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-md">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={snippet.title}
            allowFullScreen
          ></iframe>
        </div>

        {/* 🏷️ Title */}
        <h1 className="text-2xl font-semibold mt-4 text-gray-900">
          {snippet.title}
        </h1>

        {/* 📊 Stats bar */}
        <div className="flex flex-wrap justify-between items-center mt-3 text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <AiOutlineEye size={18} />
              <span>{Number(statistics.viewCount).toLocaleString()} views</span>
            </div>

            <div className="flex items-center gap-1">
              <AiOutlineCalendar size={18} />
              <span>{publishedDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-blue-600">
            <AiFillLike size={20} />
            <span>
              {Number(statistics.likeCount || 0).toLocaleString()} likes
            </span>
          </div>
        </div>

        {/* 👤 Channel Info */}
        <div className="flex items-center gap-3 mt-6 border-t border-gray-200 pt-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-semibold uppercase text-gray-700">
            {snippet.channelTitle[0]}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 ">
              {snippet.channelTitle}
            </h3>
            <p className="text-gray-500 text-sm">Subscribers hidden</p>
          </div>
        </div>

        {/* 📝 Description */}
        <div className="bg-gray-100 rounded-xl p-4 mt-6">
          <p className="whitespace-pre-line text-gray-700 text-sm leading-relaxed">
            {snippet.description}
          </p>
        </div>
      </div>

      {/* 👉 Right side (future): Up next */}
      <div className="md:w-[350px]">
        <h2 className="font-semibold text-gray-800 mb-3">Up next</h2>
        <p className="text-gray-500 text-sm">Suggested videos coming soon...</p>
      </div>
    </div>
  );
}

export default WatchPage;
