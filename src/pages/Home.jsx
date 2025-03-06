import React, { useState, useEffect } from "react";
import BlogList from "../components/BlogList";
import HeroSection from "../components/HeroSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <BlogList />
    </div>
  );
};

export default Home;
