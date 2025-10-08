import { TiHomeOutline } from "react-icons/ti";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

function SideBar() {
  const iconsArray = [
    { id: 1, icon: <TiHomeOutline />, name: "Home" },
    { id: 2, icon: <SiYoutubeshorts />, name: "Shorts" },
    { id: 3, icon: <MdOutlineSubscriptions />, name: "Subs" },
    { id: 4, icon: <FaRegUserCircle />, name: "You" },
  ];

  return (
    <div className="bg-black text-white min-h-screen w-20">
      <div className="flex flex-col w-full  pt-1 text-center items-center justify-center">
        {iconsArray.map((item) => (
          <div
            key={item.id}
            className="hover:bg-[#303030] px-5 py-4 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            <div className="text-[26px] font-light">{item.icon}</div>
            <div className="text-[10px] w-full pt-1">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SideBar;
