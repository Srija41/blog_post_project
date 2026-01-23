// File: src/App.jsx
import React, { useState } from 'react';
import { Link, Routes, Route, useNavigate, useParams } from 'react-router-dom';

import BlogPostList from './components/BlogPostList';
import BlogPostForm from './components/BlogPostForm';
import ConfirmationDialog from './components/ConfirmationDialog';
import Layout from './components/Layout';

import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';

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
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <BlogPostList
              posts={posts.map((p) => ({ ...p, url: `/posts/${p.id}` }))}
            />
          }
        />
        <Route path="/new" element={<CreatePost onCreate={handleCreate} />} />
        <Route
          path="/edit/:id"
          element={<EditPost posts={posts} onUpdate={handleUpdate} />}
        />
        <Route
          path="/posts/:id"
          element={<PostView posts={posts} onDelete={handleDelete} />}
        />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Layout>
  );
};

/* ---------------- CREATE POST ---------------- */

const CreatePost = ({ onCreate }) => {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    onCreate(data);
    navigate('/');
  };

  return <BlogPostForm onSubmit={handleSubmit} />;
};

/* ---------------- EDIT POST ---------------- */

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

/* ---------------- POST VIEW + COMMENTS ---------------- */

const PostView = ({ posts, onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id.toString() === id);

  const [showConfirm, setShowConfirm] = useState(false);
  const [comments, setComments] = useState([]);

  if (!post) return <p>Post not found.</p>;

  const handleConfirmDelete = () => {
    onDelete(post.id);
    navigate('/');
  };

  const addComment = (comment) => {
    setComments((prev) => [...prev, comment]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{post.title}</h2>
      <p><strong>Author:</strong> {post.author}</p>
      <p><strong>Date:</strong> {new Date(post.date).toLocaleDateString()}</p>
      <p>{post.content}</p>

      {/* ACTION BUTTONS */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginTop: '20px',
        }}
      >
        <Link
          to={`/edit/${post.id}`}
          style={{
            padding: '10px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        >
          Edit Post
        </Link>

        <button
          onClick={() => setShowConfirm(true)}
          style={{
            padding: '10px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Delete Post
        </button>
      </div>

      {/* COMMENTS SECTION */}
      <hr style={{ margin: '30px 0' }} />
      <h3>Comments</h3>

      <CommentList comments={comments} />
      <CommentForm onSubmit={addComment} isLoggedIn={false} />

      <ConfirmationDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

/* ---------------- ABOUT ---------------- */

const AboutPage = () => (
  <div style={{ padding: '20px' }}>
    <h2>About</h2>
    <p>This is a simple blog app built using React.</p>
  </div>
);

export default App;
