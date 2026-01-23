import './Comment.css';

export default function Comment({ name, date, text, avatar }) {
  const formattedDate = new Date(date).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="comment">
      {avatar && (
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className="comment-avatar"
        />
      )}

      <div className="comment-content">
        <div className="comment-header">
          <span className="comment-name">{name}</span>
          <span className="comment-date">{formattedDate}</span>
        </div>
        <p className="comment-text">{text}</p>
      </div>
    </div>
  );
}
