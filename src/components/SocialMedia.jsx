import React from "react";
import { FaInstagram, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <section className="flex flex-col items-center justify-center py-10 bg-gradient-to-r from-red-50 to-red-300 rounded-xl shadow-md m-5">
      <h2 className="text-3xl font-bold text-black-700 mb-4 p-3">
        📲  Follow Our Social Media Pages
 
      </h2>
      <p className="text-gray-700 mb-6 text-center max-w-lg grid grid-flow-col gap-2">
        <h1 className="font-semibold"> 🌐 Website: </h1> <a href="www.updats.in">www.updats.in</a>
      </p>
      <div className="flex gap-6 text-3xl text-blue-400">
        <a
          href="https://www.instagram.com/yourhandle"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-400 transition-transform transform hover:scale-110"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.linkedin.com/company/updateedu/posts/?feedView=all"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-800 transition-transform transform hover:scale-110"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/yourhandle"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-800 transition-transform transform hover:scale-110"
        >
          <FaGithub />
        </a>
        <a
          href="https://twitter.com/yourhandle"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-sky-500 transition-transform transform hover:scale-110"
        >
          <FaTwitter />
        </a>
      </div>
    </section>
  );
};

export default SocialMedia;
