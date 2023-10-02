// AboutUs.tsx

import React from 'react';
import '../assets/css/styles.css';
import { useNavigate } from 'react-router-dom';
import Team from './team';
import { Header, Footer } from './HeaderFooter';

const AboutUs: React.FC = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Implement your logout logic here
    }

    return (
        <><Header />
            
            <main>
                <section className="hero">
                    <h1>Welcome to SkillXpert</h1>
                    <p>Your Journey to Excellence Begins Here</p>
                    <div className="gif-container">
                        <iframe src="https://giphy.com/embed/Fhl5WREPfoVby" width="480" height="365" frameBorder="0"></iframe>
                        <div className="overlay"></div>
                    </div>
                </section>

                <section className="about">
                    <h2>About Us</h2>
                    <p>
                        At SkillXpert, we are committed to nurturing the future leaders of tomorrow.
                        Our dedication to excellence in education has made us a leading institution in shaping
                        minds and inspiring innovation.
                    </p>
                </section>

                <section className="team">
                    <h2>Meet Our Team</h2>
                    <hr />
                    
                    <iframe src="team" width="100%" height="500px" frameBorder="0"></iframe>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default AboutUs;
