import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section id="getStarted" className="container mx-auto py-16 px-4">
        <h2 className=" text-center text-4xl font-bold  text-[#666]">
          Blog List
        </h2>
        <p className="text-center text-lg">No matching notes found.</p>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
