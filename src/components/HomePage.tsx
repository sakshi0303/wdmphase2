// HomePage.tsx

import React from 'react';
import '../assets/css/styles.css';
import { Footer, Header } from './HeaderFooter';

const HomePage: React.FC = () => {
    return (
        <div>
            <Header/>

            <div className="container">
                <div className="main-content">
                    <div className="program-description">
                        <h2>Our Program</h2>
                        <p>Masters in Computer Science program is meticulously designed to offer a holistic and future-ready education.
                            We are not just fostering the next generation of computer scientists; we are shaping the pioneers and leaders
                            of tomorrow's digital world.</p>
                    </div>

                    <div className="gif-container">
                        <iframe src="https://giphy.com/embed/qgQUggAC3Pfv687qPC" width="500" height="320" frameBorder="0"></iframe>
                        <iframe src="https://giphy.com/embed/33PMXr72xOqBdOUzTO" width="480" height="234" frameBorder="0"></iframe>
                        <div className="overlay"></div>
                    </div>

                    {/* ... other parts of the component, including the section containers ... */}

                </div>
            </div>

            <Footer/>
        </div>
    );
}

export default HomePage;

// Note: 
// - Remember to set up React and TypeScript correctly in your project to be able to use this component.
// - The auth.js script should be converted into a proper TypeScript module for import and use within the component.
// - Inline JS like the logoutButton
