import VideoContainer from "./VideoContainer";
import ButtonList from "./ButtonList";

function MainContainer() {
  return (
    <div className="ml-20 flex-1 overflow-hidden">
      <ButtonList />
      <VideoContainer />
    </div>
  );
}
export default MainContainer;
