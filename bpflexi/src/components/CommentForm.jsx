import { useState } from 'react';
import './Comment.css';

export default function CommentForm({ onSubmit, isLoggedIn, userName }) {
  const [name, setName] = useState(userName || '');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || (!isLoggedIn && !name)) return;

    onSubmit({
      name: isLoggedIn ? userName : name,
      text,
      date: new Date().toISOString()
    });

    setText('');
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      {!isLoggedIn && (
        <>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </>
      )}

      <label htmlFor="comment">Comment</label>
      <textarea
        id="comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />

      <button type="submit">Post Comment</button>
    </form>
  );
}
