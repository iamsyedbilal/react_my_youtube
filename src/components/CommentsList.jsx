import Comment from "./Comment";

function CommentsList({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="ml-2">
      {data.map((item) => (
        <div key={item.id}>
          <Comment data={item} />
          <div className="pl-6 border-l-2 border-gray-300">
            <CommentsList data={item.replies} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentsList;
