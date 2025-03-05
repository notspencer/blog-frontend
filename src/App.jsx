import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import Blog from "./pages/Blog";
import HeroSection from "./components/HeroSection";

import UpdatePost from "./components/UpdatePost";

function App() {
  const [posts, setPosts] = useState([]);

  // Fetch posts from backend on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        setPosts(res.data); // Assuming backend returns an array of posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Add post via backend API
  const addPost = async (post) => {
    try {
      const res = await axios.post("http://localhost:5000/api/posts", post);
      setPosts([...posts, res.data]); // Append new post from backend
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  // Update post via backend API
  const updatePost = async (id, newTitle, newContent) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/posts/${id}`, {
        title: newTitle,
        content: newContent,
      });
      setPosts(posts.map(post => (post.id === id ? res.data : post)));
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  // Delete post via backend API
  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
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
