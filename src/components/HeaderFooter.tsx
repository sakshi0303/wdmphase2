import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserProfile } from '../utils/auth';
import { UserData } from '../types/types'

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

          <button className="header-button" onClick={() => navigate('/')} type="button">
            SkillXpert
          </button>

        </div>
        <div>
          {userId && userData && userData.role ? (
            <div className="dashboard-content">
              {displayDashboard(userData)}
            </div>
          ) : null}
        </div>
        <div className="header-buttons">
          <button className="header-button" onClick={() => navigate('/aboutus')} type="button">
            About Us
          </button>
          <button className="header-button" onClick={() => navigate('/signup')} type="button">
            SignUp
          </button>
          {userId ? (
            <button
            className="header-button"
            onClick={() => {
              sessionStorage.removeItem('identity');
              navigate('/login');
            }}
            type="button"
          >
            Logout
          </button>
          ) :
            (
              <button className="header-button" onClick={() => navigate('/login')} type="button">Login</button>
            )
          }
          {userId && ( // Conditionally render the profile button if userId is present
          
          <button
          className="header-dropdown"
          id="profileButton"
          style={{ background: 'navy', color: 'white' }}
        >
          {userData.name}
        </button>
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
      <button onClick={() => navigate('/contactus')} type="button">
      Contact Us
          </button>
          <button  onClick={() => navigate('/aboutus')} type="button">
          About Us
          </button>
          <button  onClick={() => navigate('/learnmore')} type="button">
          Learn More
          </button>
          <button  onClick={() => navigate('/contactus')} type="button">
          Report Issues
          </button>
        
      </div>

      {/* Footer */}
      <div className="footer">
        <p>2023 Masters in Computer Science. All rights reserved.</p>
      </div>
    </div>
  );
};


