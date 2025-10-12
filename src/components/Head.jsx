import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { GoBell } from "react-icons/go";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { YOUTUBE_SEARCH_API } from "../constants/constant";
import { useSelector, useDispatch } from "react-redux";
import { cachedResults } from "../features/searchSlice/searchSlice";

function Head() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const searchCache = useSelector((store) => store.search);

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestion(searchCache[searchQuery]);
      } else {
        getSearchQuerySuggsestions();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  async function getSearchQuerySuggsestions() {
    const data = await fetch(YOUTUBE_SEARCH_API(searchQuery));
    const response = await data.json();

    setSuggestion(response[1]);
    dispatch(
      cachedResults({
        [searchQuery]: response[1],
      })
    );
  }

  return (
    <div className="sticky top-0 bg-white z-50 grid grid-cols-12 items-center shadow-md py-2 px-6 ">
      {/* Left Section */}
      <div className="flex items-center gap-4 col-span-2 ml-2">
        <RxHamburgerMenu className="cursor-pointer" size={22} />
        <Link to={"/"}>
          <img
            className="h-16 md:h-12 lg:h-14 cursor-pointer"
            alt="youtube-logo"
            src="https://www.logo.wine/a/logo/YouTube/YouTube-Logo.wine.svg"
          />
        </Link>
      </div>

      {/* Middle Section (Search Bar) */}
      <div className="flex justify-center items-center col-span-8">
        <div className="flex w-2/3 max-w-xl relative">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search"
            className={`w-full border border-gray-300 pr-4 py-2 rounded-l-full outline-none text-sm transition-all duration-300 ${
              isFocused ? "pl-10 focus:border-blue-500" : "pl-4"
            }`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Search Button */}
          <button className="flex items-center justify-center px-5 border border-gray-300 border-l-0 bg-gray-100 rounded-r-full hover:bg-gray-200 transition">
            <CiSearch size={20} />
          </button>

          {/* 🔽 Suggestion Dropdown (visible only when focused) */}
          {isFocused && (
            <div>
              <CiSearch
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <div className="absolute top-full mt-2 left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                {suggestion.map((text, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors duration-150 cursor-pointer border-b border-gray-100 last:border-none"
                  >
                    <CiSearch size={18} className="text-gray-500" />
                    <span className="text-sm text-gray-700">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div
        className="flex items-center justify-end gap-4 col-span-2 
"
      >
        <GoBell size={22} className="cursor-pointer" />
        <img
          alt="user-logo"
          className="h-8 w-8 rounded-full cursor-pointer"
          src="https://yt3.ggpht.com/FHwWJjH3T5CFin8JbH6uq-m2Arcr_CtAheviY_7ipi9L3LRJp4JHeyNs_Ge7Gkzmq9EvBK9IRh4=s88-c-k-c0x00ffffff-no-rj"
        />
      </div>
    </div>
  );
}

export default Head;
