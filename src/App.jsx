import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";

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
      <div className="min-h-screen bg-gray-900 text-white">
        <nav className="p-6 bg-gray-800 shadow-md flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-400">My Modern Blog</h1>
          <div className="space-x-6">
            <Link to="/" className="text-lg hover:text-blue-400">Home</Link>
            <Link to="/create" className="text-lg hover:text-blue-400">Create Post</Link>
          </div>
        </nav>

        <div className="p-8 max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-6">Welcome to the Blog</h1>
                <p className="text-lg text-gray-300">Share your thoughts, write stories, and explore amazing content.</p>
              </div>
            } />
            <Route path="/create" element={<CreatePost addPost={addPost} />} />
            <Route path="/post/:id" element={<PostDetails posts={posts} updatePost={updatePost} deletePost={deletePost} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
