import Comment from './Comment';

export default function CommentList({ comments }) {
  return (
    <div aria-live="polite">
      {comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((comment, index) => (
          <Comment
            key={index}
            name={comment.name}
            date={comment.date}
            text={comment.text}
            avatar={comment.avatar}
          />
        ))
      )}
    </div>
  );
}
