function Comment({ data }) {
  const { name, text } = data;

  return (
    <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-3 my-3 w-[90%] hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
      {/* 🧑 User Avatar */}
      <img
        className="w-10 h-10 rounded-full object-cover"
        src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        alt="User"
      />

      {/* 🗨️ Comment Text */}
      <div className="flex flex-col">
        <p className="font-semibold text-gray-800 dark:text-gray-200">{name}</p>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}

export default Comment;
