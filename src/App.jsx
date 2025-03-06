
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import Blog from "./pages/Blog";
import UpdatePost from "./components/UpdatePost";
import NewsletterSection from "./components/NewsletterSection";

function App() {

  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Blog />} />
        <Route path="/create" element={<CreatePost addPost={addPost} />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/posts/update/:id" element={<UpdatePost />} />
      </Routes>
      <NewsletterSection />
      <Footer />
    </Router>
  );

}

export default App;
