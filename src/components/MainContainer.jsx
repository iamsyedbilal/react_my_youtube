import VideoContainer from "./VideoContainer";
import ButtonList from "./ButtonList";
import { useState } from "react";

function MainContainer() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  return (
    <div className="ml-20 flex-1 overflow-hidden">
      <ButtonList onCategorySelect={setSelectedCategory} />
      <VideoContainer selectedCategory={selectedCategory} />
    </div>
  );
}
export default MainContainer;
