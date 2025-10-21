function Button({ buttonText, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-lg font-medium whitespace-nowrap transition  ${
        isActive
          ? "bg-black text-white dark:border-gray-700 border-2"
          : "bg-[#F2F2F2] hover:bg-gray-300 text-gray-800 "
      }`}
    >
      {buttonText}
    </button>
  );
}

export default Button;
