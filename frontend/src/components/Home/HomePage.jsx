import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-container">
        <h1>Startup Platform</h1>
        <p>Find innovative projects and connect with creators</p>
        
        <div className="home-buttons">
          <Link to="/register" className="home-button primary">
            Get Started
          </Link>
          <Link to="/login" className="home-button secondary">
            Sign In
          </Link>
        </div>

        <div className="home-features">
          <div className="feature">
            <h3>Discover</h3>
            <p>Find innovative startup projects</p>
          </div>
          <div className="feature">
            <h3>Connect</h3>
            <p>Meet creators and investors</p>
          </div>
          <div className="feature">
            <h3>Launch</h3>
            <p>Share your own projects</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;