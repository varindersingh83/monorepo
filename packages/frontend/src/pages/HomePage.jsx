import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/homePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="header">
        <nav>
          <ul>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/contact">Contact me</Link></li>
          </ul>
        </nav>
      </header>
      
      <div className="top-rectangle"></div>
      <div className="bottom-rectangle"></div>
      
      <div className="outer-border">
        <div className="center-container">
          <h1>Varinder Singh</h1>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
