import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { YOUTUBE_CATEGORIES_API } from "../constants/constant";

function ButtonList() {
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef(null);

  function scroll(direction) {
    const scrollDirection = scrollRef.current;
    const scrollAmount = 200;
    if (direction === "left") {
      scrollDirection.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      scrollDirection.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const response = await fetch(YOUTUBE_CATEGORIES_API("US"));
    const data = await response.json();
    const categoryNames = data.items
      .filter((item) => item.snippet.assignable)
      .map((item) => item.snippet.title);
    setCategories(["All", ...categoryNames]);
  }

  return (
    <div className="relative bg-white py-1 ">
      <IoChevronBackOutline
        className="absolute top-[20px]  left-0 font-semibold cursor-pointer text-xl bg-white  rounded-full"
        onClick={() => scroll("left")}
      />
      <div
        className="flex overflow-x-auto scrollbar-hide scroll-smooth whitespace-nowrap gap-3 pt-2 pl-2"
        ref={scrollRef}
      >
        {categories.map((text, i) => (
          <Button key={i} buttonText={text} />
        ))}
      </div>
      <IoChevronForwardOutline
        className="absolute right-0 top-1/3 font-semibold cursor-pointer text-xl bg-white  rounded-full"
        onClick={() => scroll("right")}
      />
    </div>
  );
}

export default ButtonList;
