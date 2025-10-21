import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { YOUTUBE_VIDEO_DETAILS_API } from "../constants/constant";
import { AiOutlineEye, AiFillLike, AiOutlineCalendar } from "react-icons/ai";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";

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
      <div className="text-center py-10 text-gray-600 dark:text-gray-300">
        Loading video...
      </div>
    );
  }

  const { snippet, statistics } = videoData;
  const publishedDate = new Date(snippet.publishedAt).toLocaleDateString();

  return (
    <>
      <div className="flex flex-col md:flex-row gap-8 p-6 max-w-7xl mx-auto text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* 🎥 Left side: video player */}
        <div className="flex-1">
          <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg dark:shadow-gray-700/50">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={snippet.title}
              allowFullScreen
            ></iframe>
          </div>

          {/* 🏷️ Title */}
          <h1 className="text-2xl font-semibold mt-4 leading-snug">
            {snippet.title}
          </h1>

          {/* 📊 Stats bar */}
          <div className="flex flex-wrap justify-between items-center mt-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <AiOutlineEye size={18} />
                <span>
                  {Number(statistics.viewCount).toLocaleString()} views
                </span>
              </div>

              <div className="flex items-center gap-1">
                <AiOutlineCalendar size={18} />
                <span>{publishedDate}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <AiFillLike size={20} />
              <span>
                {Number(statistics.likeCount || 0).toLocaleString()} likes
              </span>
            </div>
          </div>

          {/* 👤 Channel Info */}
          <div className="flex items-center gap-3 mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center font-semibold uppercase text-gray-800 dark:text-gray-100">
              {snippet.channelTitle[0]}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {snippet.channelTitle}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Subscribers hidden
              </p>
            </div>
          </div>

          {/* 📝 Description */}
          <div className="bg-gray-100 dark:bg-gray-800/70 rounded-xl p-4 mt-6 border border-gray-200 dark:border-gray-700">
            <p className="whitespace-pre-line text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {snippet.description}
            </p>
          </div>
        </div>

        {/* 👉 Right side : Live Chat */}
        <div className="md:w-[380px]">
          <LiveChat />
        </div>
      </div>

      {/* 💬 Comments */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <CommentsContainer />
      </div>
    </>
  );
}

export default WatchPage;
