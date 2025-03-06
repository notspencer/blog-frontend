import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-[#FAD2B7] text-[#333] shadow-md">
      <nav className="container mx-auto flex justify-between items-center py-6 px-8">
        <img
          src="src/assets/logo.png" // Adjusted the path for the logo to use a relative path
          alt="LUMOS-COLLECTIVE Logo"
          className="h-100" // Adjusted height for logo (you can change the size as needed)
        />
        <ul className="hidden md:flex space-x-6 text-xl font-bold">
          <li className="hover:text-[#E36A4A] transition-colors duration-300 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-[#E36A4A] transition-colors duration-300 cursor-pointer">
            <Link to="/create">Create</Link>
          </li>
        </ul>
        <div className="md:hidden cursor-pointer">
          <div className="w-6 h-0.5 bg-black mb-1"></div>
          <div className="w-6 h-0.5 bg-black mb-1"></div>
          <div className="w-6 h-0.5 bg-black"></div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
