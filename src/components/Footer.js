import React from "react";
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>
      <p>&copy; 2023 <a href="#">April Copley</a></p>
      <div className="links">
        <a href="#"><FaTwitter /></a>
        <a href="#"><FaGithub /></a>
        <a href="#"><FaLinkedin /></a>
      </div>
    </footer>
  );
};

export default Footer;