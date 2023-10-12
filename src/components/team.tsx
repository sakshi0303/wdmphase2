import React from 'react';
import '../assets/css/styles.css';

const Team: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    height: '300px', // Adjust this height as needed
    overflowX: 'scroll', // Enable horizontal scrolling if needed
    alignItems: 'center', 
  };

  const teamMembersStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'nowrap', // Prevent wrapping to the next line
    alignItems: 'center',
  };

  return (
    <div style={containerStyle}>
        <p><b>CSE 5335 - Web Data Management-Group1</b></p>
      <section className="team-members">
        <div style={teamMembersStyle}>
                            
          <div className="team-member">
              
            {/* <img src="images/sakshi.jpg" className="team-member-image-small" /> */}
            <p style={{ marginLeft: '150px' }}> Fnu Sakshi<br />
              Final Year Graduate<br />
              University of Texas At Arlington<br />
              UTA ID: 1001993702<br />
              <a href="https://www.linkedin.com/in/srvsakshi03/" target="_blank" rel="noreferrer">LinkedIn</a>
            </p>
                   
          </div>

          <div className="team-member">
            {/* <img src="images/harini.jpg" className="team-member-image-small" /> */}
            <p style={{ marginLeft: '30px' }}> Harini Aluka<br />
              First Year Graduate<br />
              University of Texas At Arlington<br />
              UTA ID: 1002080841<br />
              <a href="https://www.linkedin.com/in/harini-aluka" target="_blank" rel="noreferrer">LinkedIn</a>
            </p>
          </div>

          <div className="team-member">
            {/* <img src="kiran-mai-akaram-small.jpg" className="team-member-image-small" /> */}
            <p style={{ marginLeft: '30px' }}> Kiran Mai Akaram<br />
              Researcher<br />
              University of Texas At Arlington<br />
              UTA ID: 002115618<br />
              <a href="https://www.linkedin.com/in/kiran-mai-akaram" target="_blank" rel="noreferrer">LinkedIn</a>
            </p>
          </div>

          <div className="team-member">
            {/* <img src="mary-pranavi-allam-small.jpg" className="team-member-image-small" /> */}
            <p style={{ marginLeft: '30px' }}>Mary Pranavi Allam<br />
              Project Manager<br />
              University of Texas At Arlington<br />
              UTA ID: 1002077034<br />
              <a href="https://www.linkedin.com/in/mary-pranavi-allam" target="_blank" rel="noreferrer">LinkedIn</a>
            </p>
          </div>

          <div className="team-member">
            {/* <img src="sai-vineeth-akula-small.jpg" className="team-member-image-small" /> */}
            <p style={{ marginLeft: '30px' }}>Sai Vineeth Akula<br />
              Software Engineer<br />
              University of Texas At Arlington<br />
              UTA ID: 1002028631<br />
              <a href="https://www.linkedin.com/in/sai-vineeth-akula" target="_blank" rel="noreferrer">LinkedIn</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Team;
