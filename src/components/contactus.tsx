import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/styles.css';
import { Header, Footer } from './HeaderFooter';
import '../utils/auth';

const ContactUs: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add your form submission logic here
  };

  return (
    <div>
      <Header login={true}/>

      <div className="container">
        <div className="main-content">
          <div className="section-container">
            <div className="section-title">Contact Us</div>
            <form id="contactForm" className="contact-form" onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Your Email" required />
              <textarea name="message" placeholder="Your Message" rows={5} required></textarea>
              <input type="submit" value="Send Message" />
            </form>
          </div>
        </div>
      </div>

    
      <script>
        const logoutButton = document.getElementById('logoutButton');

        logoutButton.addEventListener('click', logout);
      </script>

      <Footer/>
    </div>
  );
};

export default ContactUs;
