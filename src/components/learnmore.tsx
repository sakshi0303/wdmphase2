import React from 'react';
import '../assets/css/styles.css';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from './HeaderFooter';

const LearnMore: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
       <Header login={true}/>

      <meta charSet="UTF-8" />
      <title>Learn More - Masters in Computer Science</title>

      <div>
        <h1>Learn More About Our Masters in Computer Science Program</h1>
      </div>

      <div className="container">
        <section className="main-content">
          <h2>Program Overview</h2>
          <p>
            Our Masters in Computer Science program offers a comprehensive curriculum that combines theory and practice,
            curated by experienced educators and industry professionals.
          </p>
        </section>

        <section className="program-description">
          <h2>Curriculum</h2>
          <p>
            We offer a diverse range of courses in algorithms, data structures, machine learning, artificial intelligence,
            web development, and more.
          </p>
        </section>

        <section className="program-objectives">
          <h2>Program Objectives</h2>
          <div className="objective">Excellence in Education</div>
          <div className="objective">Cutting-Edge Research</div>
          <div className="objective">Industry Relevance</div>
          <div className="objective">Holistic Development</div>
        </section>

        <section className="faculty">
          <h2>Our Faculty</h2>
          <p>Our faculty members are experienced educators and researchers who are experts in their respective fields.</p>
        </section>

        <section className="resources">
          <h2>State-of-the-Art Resources</h2>
          <p>We provide our students with access to cutting-edge labs, online resources, and libraries.</p>
        </section>

        <section className="admission">
          <h2>Admission Process</h2>
          <p>We have a rolling admission policy with emphasis on academic performance, work experience, and research projects.</p>
        </section>

        <section className="alumni">
          <h2>Our Alumni</h2>
          <p>Our alumni have gone on to successful careers in industry, academia, and entrepreneurship.</p>
        </section>
      </div>

      

      <script src="assets/js/auth.js"></script>
      <script>
        const logoutButton = document.getElementById('logoutButton');

        logoutButton.addEventListener('click', logout);
      </script>

      <Footer/>
    </div>
  );
};

export default LearnMore;
