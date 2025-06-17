import React, { useState } from 'react';
import { Link, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import BlogPostList from './components/BlogPostList';
import BlogPostItem from './components/BlogPostItem';
import BlogPostForm from './components/BlogPostForm';
import DeleteButton from './components/DeleteButton';
import ConfirmationDialog from './components/ConfirmationDialog';

const App = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'First Post',
      summary: 'This is a summary of the first post.',
      content: 'Full content of the first post.',
      author: 'Admin',
      date: '2024-06-10',
    },
  ]);

  const handleCreate = (newPost) => {
    const newId = Date.now();
    const postWithId = {
      ...newPost,
      id: newId,
      summary: newPost.content.slice(0, 100) + '...',
      url: `/posts/${newId}`,
    };
    setPosts((prev) => [...prev, postWithId]);
  };

  const handleUpdate = (id, updatedPost) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              ...updatedPost,
              summary: updatedPost.content.slice(0, 100) + '...',
            }
          : post
      )
    );
  };

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <Routes>
      <Route path="/" element={<BlogPostList posts={posts.map(p => ({ ...p, url: `/posts/${p.id}` }))} />} />
      <Route path="/new" element={<CreatePost onCreate={handleCreate} />} />
      <Route path="/edit/:id" element={<EditPost posts={posts} onUpdate={handleUpdate} />} />
      <Route path="/posts/:id" element={<PostView posts={posts} onDelete={handleDelete} />} />
    </Routes>
  );
};

const CreatePost = ({ onCreate }) => {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    onCreate(data);
    navigate('/');
  };

  return <BlogPostForm onSubmit={handleSubmit} />;
};

const EditPost = ({ posts, onUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id.toString() === id);

  if (!post) return <p>Post not found.</p>;

  const handleSubmit = (data) => {
    onUpdate(post.id, data);
    navigate('/');
  };

  return <BlogPostForm post={post} onSubmit={handleSubmit} />;
};

const PostView = ({ posts, onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id.toString() === id);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!post) return <p>Post not found.</p>;

  const handleConfirmDelete = () => {
    onDelete(post.id);
    navigate('/');
  };

  return (
    <div className="blog-post-item" style={{ padding: '20px' }}>
      <h2>{post.title}</h2>
      <p><strong>Author:</strong> {post.author}</p>
      <p><strong>Date:</strong> {new Date(post.date).toLocaleDateString()}</p>
      <p>{post.content}</p>

      <div style={{ marginTop: '20px' }}>
        <Link to={`/edit/${post.id}`} style={{
          display: 'inline-block',
          marginRight: '10px',
          padding: '10px 15px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px'
        }}>
          Edit Post
        </Link>

        <DeleteButton onClick={() => setShowConfirm(true)} />

        <ConfirmationDialog
          isOpen={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  );
};

export default App;
