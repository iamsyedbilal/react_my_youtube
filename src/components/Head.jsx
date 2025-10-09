import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { GoBell } from "react-icons/go";
import { useState } from "react";
import { Link } from "react-router-dom";

function Head() {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="grid grid-cols-12 items-center shadow-md py-2 px-6 ">
      {/* Left Section */}
      <div className="flex items-center gap-4 col-span-2 ml-2">
        <RxHamburgerMenu className="cursor-pointer" size={22} />
        <Link to={"/"}>
          <img
            className="h-16 cursor-pointer"
            alt="youtube-logo"
            src="https://www.logo.wine/a/logo/YouTube/YouTube-Logo.wine.svg"
          />
        </Link>
      </div>

      {/* Middle Section (Search Bar) */}
      <div className="flex justify-center items-center col-span-8">
        <div
          className={`flex transition-all duration-300 ease-in-out ${
            isFocused ? "w-2/3 max-w-xl" : "w-2/3 max-w-xl"
          }`}
        >
          <div className="relative flex w-full">
            <CiSearch
              size={20}
              className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 ${
                isFocused
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90 pointer-events-none"
              }`}
            />

            <input
              type="text"
              placeholder="Search"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`w-full border border-gray-300 pr-4 py-2  rounded-l-full outline-none text-sm transition-all duration-300 ${
                isFocused ? "pl-10 focus:border-blue-500" : "pl-4"
              }`}
            />
          </div>

          {/* Outer search button */}
          <button className="flex items-center justify-center px-5 border border-gray-300 border-l-0 bg-gray-100 rounded-r-full hover:bg-gray-200 transition">
            <CiSearch size={20} />
          </button>
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
