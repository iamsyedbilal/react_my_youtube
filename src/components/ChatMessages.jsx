function ChatMessages({ name, message }) {
  return (
    <div className="flex items-center p-1">
      <img
        src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        alt="User Icon"
        className="h-8"
      />
      <span className="font-bold text-slate-500">
        {name}: <span className="font-normal text-black">{message}</span>
      </span>
    </div>
  );
}

export default ChatMessages;
