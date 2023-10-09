import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserProfile } from '../utils/auth';
import {UserData} from '../types/types'

export interface HeaderProps {
  login?: boolean;
}

function displayDashboard(userData: UserData): React.ReactNode {
  switch (userData.role) {
    case 'admin':
      return <div>Admin Dashboard</div>;
    case 'student':
      return <div>Student Dashboard</div>;
    case 'instructor':
      return <div>Instructor Dashboard</div>;
    case 'coordinator':
      return <div>Coordinator Dashboard</div>;
    case 'qa':
      return <div>QA Dashboard</div>;
    default:
      return <div>Invalid Role</div>;
  }
}



export const Header: React.FC<HeaderProps> = (props) => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('identity');
  const userData = getCurrentUserProfile()

  return (
    <div className="header">
      <div className="header-content">
        <div className="service-name">
          <a className="header-button" onClick={() => navigate('/')}>
            SkillXpert
          </a>
          
        </div>
        <div>
        {userId && userData && userData.role ? (
          <div className="dashboard-content">
            {displayDashboard(userData)}
          </div>
        ) : null}
        </div>
        <div className="header-buttons">
          <a className="header-button" onClick={() => navigate('/aboutus')}>
            About Us
          </a>
          <a className="header-button" onClick={() => navigate('/signup')}>
            SignUp
          </a>
          {userId ? (
            <a
              className="header-button"
              onClick={() => {
                sessionStorage.removeItem('identity');
                navigate('/login');
              }}
            >
              Logout
            </a>
          ) :
            (
              <a className="header-button" onClick={() => navigate('/login')}>
                Login
              </a>
            )
          }
          {userId && ( // Conditionally render the profile button if userId is present
            <a href="#" className="header-dropdown" id="profileButton">
              <div
                className="header-button"
                style={{ background: 'navy', color: 'white' }}
                id="userInitial"
              >
                {userData.name}
                
              </div>
            </a>
          )}
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


