import { Routes, Route } from 'react-router-dom';
import BlogList from './BlogList';
import BlogPost from './BlogPost';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/posts/:id" element={<BlogPost />} />
    </Routes>
  );
}
