import { Link } from 'react-router-dom';
import { blogPosts } from './posts';
import './BlogList.css'; // Optional if you'd like to extract styles

export default function BlogList() {
  return (
    <div className="blog-list-container">
      <div className="blog-list-header">
        <h1 className="blog-title">Blog Posts</h1>
        <Link to="/new" className="new-post-button">+ New Post</Link>
      </div>

      <ul>
        {blogPosts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
