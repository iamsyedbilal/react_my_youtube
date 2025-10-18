import { useEffect, useRef, useState } from "react";
import ChatMessages from "./ChatMessages";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../features/chatSlice/chatSlice";
import {
  generateRandomNames,
  generateRandomStrings,
} from "../constants/helper";

function LiveChat() {
  const dispatch = useDispatch();
  const chatMsg = useSelector((store) => store.chat.messages);
  const chatRef = useRef(null);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const chatTimer = setInterval(() => {
      dispatch(
        addMessage({
          name: generateRandomNames(),
          message: generateRandomStrings(),
        })
      );
    }, 3000);

    return () => clearInterval(chatTimer);
  }, [dispatch]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMsg]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    dispatch(
      addMessage({
        name: "You",
        message: inputMessage,
      })
    );
    setInputMessage("");
  };

  return (
    <div className="bg-white h-[400px] shadow-md border rounded-lg w-full max-w-md flex flex-col">
      <div className="p-2 bg-gray-100 font-semibold border-b text-gray-700 text-sm">
        Live Chat
      </div>

      <div
        ref={chatRef}
        className="flex-1 p-2 overflow-y-auto flex flex-col-reverse gap-2 bg-gray-50"
      >
        {chatMsg.map((item, index) => (
          <ChatMessages key={index} name={item.name} message={item.message} />
        ))}
      </div>

      <form
        onSubmit={handleSendMessage}
        className="flex items-center border-t bg-white p-2 gap-2"
      >
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 border rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-400"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default LiveChat;
