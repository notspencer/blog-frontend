import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";

function App() {
  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
    setPosts([...posts, post]);
  };

  const updatePost = (id, newTitle, newContent) => {
    setPosts(posts.map(post => post.id === id ? { ...post, title: newTitle, content: newContent } : post));
  };

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <Router>
      <nav className="p-4 bg-gray-200">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/create">Create Post</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1 className="p-4">Welcome to the Blog</h1>} />
        <Route path="/create" element={<CreatePost addPost={addPost} />} />
        <Route path="/post/:id" element={<PostDetails posts={posts} updatePost={updatePost} deletePost={deletePost} />} />
      </Routes>
    </Router>
  );
}

export default App;
