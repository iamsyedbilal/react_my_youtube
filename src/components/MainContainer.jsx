import VideoContainer from "./VideoContainer";
import ButtonList from "./ButtonList";

function MainContainer() {
  return (
    <div className="overflow-hidden">
      <ButtonList />
      <VideoContainer />
    </div>
  );
}
export default MainContainer;
