import { Link } from 'react-router-dom';
import './BlogList.css';

export default function BlogPostList({ posts }) {
  return (
    <div className="blog-list-container">
      <div className="blog-list-header">
        <h1 className="blog-title">Blog Posts</h1>
        <Link to="/new" className="new-post-button">+ New Post</Link>
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
