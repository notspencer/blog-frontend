import React from "react";
import BlogList from "../components/BlogList";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section id="getStarted" className="container mx-auto py-16 px-4">
        <h2 className=" text-center text-4xl font-bold  text-[#666]">
          Blog List
        </h2>
        <BlogList />
      </section>
    </div>
  );
};

export default Home;
