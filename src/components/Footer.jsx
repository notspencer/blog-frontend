import React from "react";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      id="footerContainer"
      className="footer bg-[#1F3B37] text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="footer-top grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
        {/* Kontakt Section */}
        <div>
          <h2 className="text-xl font-bold">Contact</h2>
          <p>Lumos Collective</p>
          <p>Vogesenplatz 1</p>
          <p>1235 Berlin</p>
          <p>
            <a href="tel:+41 (0)61 261 47 42" className="hover:underline">
              +41 (0)00 123 47 42
            </a>
          </p>
          <p>
            <a href="mailto:info@fairunterwegs.org" className="hover:underline">
              info@lumoscollective.org
            </a>
          </p>
        </div>
        <div className="flex space-x-4 mt-4">
          <a
            href="https://ch.linkedin.com/"
            className="hover:scale-110 transition"
          >
            <FaLinkedin className="w-6 h-6 text-white" />
          </a>
          <a
            href="https://www.instagram.com//"
            className="hover:scale-110 transition"
          >
            <FaInstagram className="w-6 h-6 text-white" />
          </a>
          <a
            href="https://www.facebook.com/"
            className="hover:scale-110 transition"
          >
            <FaFacebook className="w-6 h-6 text-white" />
          </a>
          <a href="https://x.com/" className="hover:scale-110 transition">
            <FaTwitter className="w-6 h-6 text-white" />
          </a>
          <a
            href="https://www.youtube.com/"
            className="hover:scale-110 transition"
          >
            <FaYoutube className="w-6 h-6 text-white" />
          </a>
        </div>
      </div>

      {/* Supporters Section */}
      <motion.div
        className="bg-[#F9E0D9] p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="flex justify-center space-x-6 overflow-hidden">
          {/* Logos will go here with animations */}
          <motion.img
            src="src/assets/logo.png"
            alt="Supporter Logo"
            className="w-32 hover:scale-105 transition"
            whileHover={{ scale: 1.1 }}
          />
        </div>
      </motion.div>

      {/* Bottom Section */}
      <div className="bg-[#E96443] p-4 text-center">
        <p>© Lumos Collective 2025 </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
