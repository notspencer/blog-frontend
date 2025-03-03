import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import CreatePost from "./pages/CreatePost";

function App() {
  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
    setPosts([...posts, post]);
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
      </Routes>
    </Router>
  );
}

export default App;
