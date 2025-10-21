import Comment from "./Comment";

function CommentsList({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="ml-2">
      {data.map((item) => (
        <div key={item.id}>
          <Comment data={item} />
          {item.replies && item.replies.length > 0 && (
            <div className="pl-6 border-l-2 border-gray-300 dark:border-gray-600 ml-4">
              <CommentsList data={item.replies} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CommentsList;
