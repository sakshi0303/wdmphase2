import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="header">
      <div className="header-content">
        <div className="service-name">
          <a className="header-button" onClick={() => {navigate('/')}}>
            SkillXpert
          </a>
        </div>
        <div className="header-buttons">
        <a className="header-button" onClick={() => {navigate('/aboutus')}}>
            About Us
          </a>
          <a className="header-button" onClick={() => {navigate('/signup')}}>
            SignUp
          </a>
          <a className="header-button" onClick={() => {navigate('/login')}}>
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export const Footer = () => {
  const navigate = useNavigate();
    return (
      <div>
        {/* Footer Links */}
        <div className="footer-links">          
          <a className="footer-link" onClick={() => {navigate('/contact')}}>Contact Us</a>
          <a className="footer-link" onClick={() => {navigate('/aboutus')}}>About Us</a>
          <a className="footer-link" onClick={() => {navigate('/learn-more')}}>Learn More</a>
          <a className="footer-link" onClick={() => {navigate('/contact')}}>Report Issues</a>
        </div>
  
        {/* Footer */}
        <div className="footer">
          <p>2023 Masters in Computer Science. All rights reserved.</p>
        </div>
      </div>
    );
  };


