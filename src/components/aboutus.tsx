/*  
    Author: Sakshi
    UTA ID: 1001993702
    Email: sx3702@mavs.uta.edu
    Group number: 1, WDM assignment, Assignment 3
    Date: October 14, 2023
    Description: AboutUs.tsx
    
*/

import React from 'react';
import '../assets/css/styles.css';

import Team from './team';
import { Header, Footer } from './HeaderFooter';

const AboutUs: React.FC = () => {


    return (
        <div className="content-container"> {/* Add a CSS class to this container */}
            <Header></Header>

            <main>
                <section className="hero">
                    <div className="gif-container">
                        <div className="iframe-wrapper">
                            <iframe src="https://giphy.com/embed/Fhl5WREPfoVby" width="500" height="420" frameBorder="0" title="GIF 3"></iframe>
                        </div>
                    </div>

                    <h1>About Us</h1>

                    <p>
                        At SkillXpert, we are committed to nurturing the future leaders of tomorrow.<br />
                        Our dedication to excellence in education has made us a leading institution in shaping
                        minds and inspiring innovation.
                    </p>
                </section>

                <section className="team">
                    <h4>Meet Our Group1 Team-CSE 5335 - Web Data Management</h4>

                    <hr />

                    <Team />
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default AboutUs;
