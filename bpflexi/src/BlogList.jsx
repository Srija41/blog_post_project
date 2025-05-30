import { Link } from 'react-router-dom';
import { blogPosts } from './posts';

export default function BlogList() {
  return (
    <div>
      <h1>Blog Posts</h1>
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
