import React from "react";

const Footer = () => {
  return (
    <footer id="footerContainer" className="py-4 bg-gray-800 text-white">
      {/* Copyright */}
      <div className="text-center text-white text-xs mt-8">
        <p>
          Copyright © 2025{" "}
          <a href="/" className=" hover:text-gray-400">
            Travel Blog
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
