import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface HeaderProps {
  login?: boolean
}

export const Header: React.FC<HeaderProps> = (props) => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header-content">
        <div className="service-name">
          <a className="header-button" onClick={() => { navigate('/') }}>
            SkillXpert
          </a>
        </div>
        <div className="header-buttons">
          <a className="header-button" onClick={() => { navigate('/aboutus') }}>
            About Us
          </a>
          <a className="header-button" onClick={() => { navigate('/signup') }}>
            SignUp
          </a>
          {props?.login ?
            (<a className="header-button" onClick={() => { navigate('/login') }}> Login</a>) :
            (<a className="header-button" onClick={() => {
              sessionStorage.removeItem('identity');
              navigate('/login');

            }}> Logout</a>)
          }
          <a href="#" className="header-dropdown" id="profileButton">
            <div className="header-button" style={{ background: 'navy', color: 'white' }} id="userInitial">
              A
            </div>
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
        <a className="footer-link" onClick={() => { navigate('/contactus') }}>Contact Us</a>
        <a className="footer-link" onClick={() => { navigate('/aboutus') }}>About Us</a>
        <a className="footer-link" onClick={() => { navigate('/learnmore') }}>Learn More</a>
        <a className="footer-link" onClick={() => { navigate('/contactus') }}>Report Issues</a>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>2023 Masters in Computer Science. All rights reserved.</p>
      </div>
    </div>
  );
};


