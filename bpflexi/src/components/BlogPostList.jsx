import React from 'react';
import BlogPostItem from './BlogPostItem';
import './BlogPostList.css';
import { Link } from 'react-router-dom';

const BlogPostList = ({ posts }) => {
  return (
    <div className="blog-post-list-wrapper">
      <div className="blog-post-header">
        <h1>Blog Posts</h1>
        <Link to="/new" className="create-post-button">+ New Post</Link>
      </div>

      {(!posts || posts.length === 0) ? (
        <p className="blog-post-empty">No blog posts available.</p>
      ) : (
        <div className="blog-post-list">
          {posts.map((post) => (
            <BlogPostItem
              key={post.id}
              title={post.title}
              summary={post.summary}
              date={post.date}
              url={post.url}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPostList;
