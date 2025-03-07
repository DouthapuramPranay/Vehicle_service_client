import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="quick-links">
        <h2>Quick Links</h2>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about-us">About Us</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
      <div className="follow-us">
        <h2>Follow Us</h2>
        <ul>
          <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
          <li><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a></li>
          <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
        </ul>
      </div>
      <div className="subscription">
        <h2>Subscribe</h2>
        <form>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </footer>
  );
}

export default Footer;