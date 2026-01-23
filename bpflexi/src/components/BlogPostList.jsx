import { Link } from 'react-router-dom';

export default function BlogPostList({ posts }) {
  return (
    <div style={{ padding: '20px' }}>
      <h1>All Blog Posts</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: '24px', borderBottom: '1px solid #ccc', paddingBottom: '12px' }}>
            <h2 style={{ marginBottom: '4px' }}>
              <Link to={`/posts/${post.id}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                {post.title}
              </Link>
            </h2>
            <p style={{ fontSize: '14px', color: '#555' }}><em>{new Date(post.date).toDateString()}</em></p>
            <p dangerouslySetInnerHTML={{ __html: post.content.slice(0, 100) + '...' }}></p>
            <Link to={`/posts/${post.id}`} style={{ fontSize: '14px', color: '#007bff' }}>
              Read more →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
