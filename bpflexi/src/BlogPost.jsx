import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { blogPosts } from './posts';
import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);

  const [comments, setComments] = useState([]);

  const addComment = (comment) => {
    setComments(prev => [...prev, comment]);
  };

  if (!post) return <h2>Post not found</h2>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{post.title}</h1>
      <p><em>{post.date}</em></p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      <hr />

      <h3>Comments</h3>
      <CommentList comments={comments} />
      <CommentForm
        onSubmit={addComment}
        isLoggedIn={false}
      />
    </div>
  );
}
