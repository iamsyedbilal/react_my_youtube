import { commentsData } from "../constants/commentsData";
import CommentsList from "./CommentsList";

function CommentsContainer() {
  return (
    <div className="ml-6 mt-6">
      <h1 className="font-bold text-2xl mb-4 text-gray-900">Comments</h1>
      <CommentsList data={commentsData} />
    </div>
  );
}

export default CommentsContainer;
