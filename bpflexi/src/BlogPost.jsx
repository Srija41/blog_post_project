import { useParams } from 'react-router-dom';
import { blogPosts } from './posts';

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return <h2>Post not found</h2>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p><em>{post.date}</em></p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
