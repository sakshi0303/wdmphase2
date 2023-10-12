// HomePage.tsx

import React from 'react';
import '../assets/css/styles.css';
import { Footer, Header } from '../components/HeaderFooter';

const HomePage: React.FC = () => {
    return (
        <div>
            <Header login={true}/>

            <div className="container">
                <div className="main-content">
                    <div className="program-description">
                        <h2>Our Program</h2>
                        <p>Masters in Computer Science program is meticulously designed to offer a holistic and future-ready education.
                            We are not just fostering the next generation of computer scientists; we are shaping the pioneers and leaders
                            of tomorrow's digital world.More On: <a href="https://blogthemedotblog.wordpress.com/home/">WordPress Blogs</a></p>
                    </div>

                    <div className="gif-container">
                        <iframe src="https://giphy.com/embed/qgQUggAC3Pfv687qPC" width="500" height="320" frameBorder="0"></iframe>
                        <iframe src="https://giphy.com/embed/33PMXr72xOqBdOUzTO" width="480" height="234" frameBorder="0"></iframe>
                        <div className="overlay"></div>
                    </div>

                    <div className="section-container">
        <div className="section-title">Core Academic Principles</div>

        <div className="section-item">
          <strong>Educational Excellence:</strong>
          We aim to offer an education that is unparalleled in quality, with a focus on holistic student development.
        </div>
        <div className="section-item">
          <strong>Pioneering Research:</strong>
          Our program champions research at the forefront of technological innovation, pushing boundaries.
        </div>
        <div className="section-item">
          <strong>Iterative Growth:</strong>
          Our adaptive and evolving program design is based on constant feedback and performance metrics.
        </div>
        <div className="section-item">
          <strong>Industry Aligned Learning:</strong>
          The program is designed to align with industry needs, making the acquired skills immediately applicable
          professionally.
        </div>
        <div className="section-item">
          <strong>Comprehensive Personal Development:</strong>
          We aim to offer an education that is unparalleled in quality, with a focus on holistic student development.
        </div>
      </div>

      <div className="section-container">
      <div className="section-title">Student Success Metrics</div>
      <div className="section-item">
        <strong>Progress Monitoring:</strong>
        Continuous tracking of academic performance allows for timely interventions to aid student success.
      </div>
      <div className="section-item">
        <strong>Insight-Driven Learning:</strong>
        Data analytics tools help us tailor teaching methods and curriculum based on student performance insights.
      </div>
      <div className="section-item">
        <strong>Iterative Growth:</strong>
        Our adaptive and evolving program design is based on constant feedback and performance metrics.
      </div>
      <div className="section-item">
        <strong>Competitive Spirit:</strong>
        Healthy competition among peers fosters a stimulating learning environment and real-world readiness.
      </div>
      <div className="section-item">
        <strong>Readiness for Success:</strong>
        Our comprehensive approach equips each student for success, both in exams and their subsequent careers.
      </div>
    </div>

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
