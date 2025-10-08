import { useRef } from "react";
import Button from "./Button";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

function ButtonList() {
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

  return (
    <div className="relative">
      <IoChevronBackOutline
        className="absolute top-1/3 left-0  rounded-full p-2 z-10 bg-black/70"
        onClick={() => scroll("left")}
      />
      <div
        className="flex overflow-x-auto scrollbar-hide scroll-smooth whitespace-nowrap gap-3 pt-2 pl-2"
        ref={scrollRef}
      >
        {[
          "All",
          "Music",
          "Javascript",
          "Weight",
          "Mixes",
          "Wickets",
          "Nodes.js",
          "Gaming",
          "Podcasts",
          "React",
          "Live",
          "Coding",
          "News",
          "Trending",
          "Interviews",
          "Design",
          "AI",
          "Frontend",
          "Backend",
        ].map((text, i) => (
          <Button key={i} buttonText={text} />
        ))}
      </div>
      <IoChevronForwardOutline
        className="absolute right-0 top-1/3"
        onClick={() => scroll("right")}
      />
    </div>
  );
}

export default ButtonList;
