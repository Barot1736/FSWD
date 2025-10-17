import React, { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
  const [show, setShow] = useState(false);

  // Show navbar background when scrolling
  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', transitionNavBar);
    return () => window.removeEventListener('scroll', transitionNavBar);
  }, []);

  return (
    <div className={`nav ${show && 'nav__black'}`}>
      <div className="nav__contents">
        <img
          className="nav__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
        />
        
        <div className="nav__links">
          <span className="nav__link">Home</span>
          <span className="nav__link">TV Shows</span>
          <span className="nav__link">Movies</span>
          <span className="nav__link">New & Popular</span>
          <span className="nav__link">My List</span>
          <span className="nav__link">Browse by Languages</span>
        </div>

        <div className="nav__right">
          <div className="nav__search">
            <svg
              className="nav__searchIcon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 21L16.514 16.506M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          <span className="nav__link">KIDS</span>
          
          <div className="nav__profile">
            <img
              className="nav__avatar"
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            // src="./src/images/Netflix.png"
              alt="Profile"
            />
            <div className="nav__dropdown">
              <svg
                className="nav__dropdownIcon"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 11L3 6h10l-5 5z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;