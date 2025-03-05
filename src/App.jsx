import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import Blog from "./pages/Blog";
import HeroSection from "./components/HeroSection";

import UpdatePost from "./components/UpdatePost";

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
      <HeroSection />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Blog />} />
        <Route path="/create" element={<CreatePost addPost={addPost} />} />
        <Route path="/posts/:id" element={<PostDetails />} />

        <Route path="/posts/update/:id" element={<UpdatePost />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
