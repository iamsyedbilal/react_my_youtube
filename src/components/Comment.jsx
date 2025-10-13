function Comment({ data }) {
  const { name, text } = data;
  return (
    <div className="flex items-start gap-3 bg-gray-50 rounded-xl shadow-sm p-3 my-3 w-[90%] hover:bg-gray-100 transition">
      <img
        className="w-10 h-10 rounded-full object-cover"
        src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        alt="User"
      />
      <div className="flex flex-col">
        <p className="font-semibold text-gray-800">{name}</p>
        <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

export default Comment;
