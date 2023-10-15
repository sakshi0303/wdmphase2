/*  
    Author: Sakshi
    UTA ID: 1001993702
    Email: sx3702@mavs.uta.edu
    Group number: 1, WDM assignment, Assignment 3
    Date: October 14, 2023
    Description: team
*/
import React from 'react';
import '../assets/css/styles.css';

const Team: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    height: '300px', // Adjust this height as needed
    overflowX: 'scroll', // Enable horizontal scrolling if needed
    alignItems: 'left', 
  };

 

  return (
    <div style={containerStyle}>
        
      
                            
          <div className="team-member">
              
            {/* <img src="images/sakshi.jpg" className="team-member-image-small" /> */}
            <p style={{ marginLeft: '0px' }}> Fnu Sakshi<br />
              Final Year Graduate<br />
              University of Texas At Arlington<br />
              UTA ID: 1001993702<br />
              <a href="https://www.linkedin.com/in/srvsakshi03/" target="_blank" rel="noreferrer">LinkedIn</a>
            </p>
                   
          </div>

          <div className="team-member">
            {/* <img src="images/harini.jpg" className="team-member-image-small" /> */}
            <p style={{ marginLeft: '0px' }}> Harini Aluka<br />
              First Year Graduate<br />
              University of Texas At Arlington<br />
              UTA ID: 1002080841<br />
              <a href="https://www.linkedin.com/in/harini-aluka" target="_blank" rel="noreferrer">LinkedIn</a>
            </p>
          </div>

          <div className="team-member">
            {/* <img src="kiran-mai-akaram-small.jpg" className="team-member-image-small" /> */}
            <p style={{ marginLeft: '0px' }}> Kiran Mai Akaram<br />
              Researcher<br />
              University of Texas At Arlington<br />
              UTA ID: 002115618<br />
              <a href="https://www.linkedin.com/in/kiran-mai-akaram" target="_blank" rel="noreferrer">LinkedIn</a>
            </p>
          </div>

          <div className="team-member">
            {/* <img src="mary-pranavi-allam-small.jpg" className="team-member-image-small" /> */}
            <p style={{ marginLeft: '0px' }}>Mary Pranavi Allam<br />
              Project Manager<br />
              University of Texas At Arlington<br />
              UTA ID: 1002077034<br />
              <a href="https://www.linkedin.com/in/mary-pranavi-allam" target="_blank" rel="noreferrer">LinkedIn</a>
            </p>
          </div>

          <div className="team-member">
            {/* <img src="sai-vineeth-akula-small.jpg" className="team-member-image-small" /> */}
            <p style={{ marginLeft: '0px' }}>Sai Vineeth Akula<br />
              Software Engineer<br />
              University of Texas At Arlington<br />
              UTA ID: 1002028631<br />
              <a href="https://www.linkedin.com/in/sai-vineeth-akula" target="_blank" rel="noreferrer">LinkedIn</a>
            </p>
          </div>
        </div>
      
  );
}

export default Team;
