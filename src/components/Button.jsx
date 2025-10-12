function Button({ buttonText }) {
  return (
    <button className=" bg-[#F2F2F2] px-3 py-2 rounded-lg font-medium whitespace-nowrap hover:bg-gray-300 transition">
      {buttonText}
    </button>
  );
}

export default Button;
