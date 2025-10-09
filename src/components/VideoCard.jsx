function VideoCard({ info }) {
  if (!info || !info.snippet) return null;

  const {
    snippet: { title, channelTitle, thumbnails, publishedAt },
  } = info;

  // Optional channel image (if your API includes it)
  const channelImg = info.channelThumbnail?.url || null;

  return (
    <div className=" bg-white  shadow-md hover:shadow-xl transition-shadow rounded-2xl overflow-hidden w-80 m-4 cursor-pointer">
      {/* Thumbnail */}
      <img
        src={thumbnails?.high?.url}
        alt={title}
        className="w-full h-48 object-cover"
      />

      <div className="flex p-4 gap-3">
        {/* Channel Image (optional) */}
        {channelImg ? (
          <img
            src={channelImg}
            alt={channelTitle}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div
            className="text-center text-gray-700 font-extrabold text-3xl uppercase rounded-full 
              font-serif"
          >
            {channelTitle ? channelTitle[0] : "?"}
          </div>
        )}

        {/* Video Info */}
        <div className="flex flex-col">
          <h2 className="text-base font-semibold text-gray-900  line-clamp-2">
            {title}
          </h2>
          <div className="flex justify-between pt-2">
            <strong className="text-sm text-gray-500">{channelTitle}</strong>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
              <span>{new Date(publishedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
