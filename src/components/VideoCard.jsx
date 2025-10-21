function VideoCard({ info }) {
  if (!info || !info.snippet) return null;

  const {
    snippet: { title, channelTitle, thumbnails, publishedAt },
  } = info;

  const channelImg = info.channelThumbnail?.url || null;

  return (
    <div
      className="bg-white dark:bg-gray-800 shadow-md hover:shadow-xl 
                 transition-all duration-300 rounded-2xl overflow-hidden 
                 w-80 m-4 cursor-pointer transform hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <img
        src={thumbnails?.high?.url}
        alt={title}
        className="w-full h-48 object-cover"
      />

      {/* Video Details */}
      <div className="flex p-4 gap-3">
        {/* Channel Image or Initial */}
        {channelImg ? (
          <img
            src={channelImg}
            alt={channelTitle}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div
            className="w-10 h-10 flex items-center justify-center 
                       bg-gray-300 dark:bg-gray-700 text-gray-700 
                       dark:text-gray-200 font-bold text-lg rounded-full"
          >
            {channelTitle ? channelTitle[0] : "?"}
          </div>
        )}

        {/* Video Info */}
        <div className="flex flex-col flex-1">
          <h2
            className="text-base font-semibold text-gray-900 dark:text-gray-100 
                       line-clamp-2 leading-snug"
          >
            {title}
          </h2>
          <div className="flex justify-between items-center pt-2 text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {channelTitle}
            </span>
            <span className="text-gray-400 dark:text-gray-500 text-xs">
              {new Date(publishedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
