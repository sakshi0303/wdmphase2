import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header-content">
        <div className="service-name">
          <a href="index.html" className="header-button">
            SkillXpert
          </a>
        </div>
        <div className="header-buttons">
          <a href="aboutus.html" className="header-button">
            About Us
          </a>
          <a href="signup.html" className="header-button">
            SignUp
          </a>
          <a href="login.html" className="header-button">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export const Footer = () => {
    return (
      <div>
        {/* Footer Links */}
        <div className="footer-links">
          <a href="contact.html" className="footer-link">Contact</a>
          <a href="aboutus.html" className="footer-link">About</a>
          <a href="learn-more.html" className="footer-link">Learn More</a>
          <a href="contact.html" className="footer-link">Report Issues</a>
        </div>
  
        {/* Footer */}
        <div className="footer">
          <p>2023 Masters in Computer Science. All rights reserved.</p>
        </div>
      </div>
    );
  };


