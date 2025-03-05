import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";

function App() {
  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
    setPosts([...posts, { ...post, id: posts.length + 1 }]);
  };

  const updatePost = (id, newTitle, newContent) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, title: newTitle, content: newContent }
          : post
      )
    );
  };

  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white">
        <nav className="p-6 bg-gray-800 shadow-md flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-400">My Modern Blog</h1>
          <div className="space-x-6">
            <Link to="/" className="text-lg hover:text-blue-400">
              Home
            </Link>
            <Link to="/create" className="text-lg hover:text-blue-400">
              Create Post
            </Link>
          </div>
        </nav>

        <div className="p-8 max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePost addPost={addPost} />} />
            <Route
              path="/post/:id"
              element={
                <PostDetails
                  posts={posts}
                  updatePost={updatePost}
                  deletePost={deletePost}
                />
              }
            />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
