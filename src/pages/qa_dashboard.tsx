
import React from 'react';
import '../assets/css/styles.css';
import { Header, Footer } from '../components/HeaderFooter';
import {UserData} from '../types/types'



const QADashboard = () => {
    return (
        <div className="container">
          <Header />
          
          <div style={{ display: 'flex' }}>
            <div className="section-container" style={{ width: '100%' }}>
              <h4>Login instructions:</h4>
              <p>
                1. admin: admin@gmail.com with password admin <br />
                2. student: alice@gmail.com with password pass <br />
                3. instructor: bob@gmail.com with password pass <br />
                4. Program coordinator: cod@gmail.com with password pass <br />
                5. Quality Assurance: qa@gmail.com with password pass <br />
              </p>
            </div>
            <div className="section-container" style={{ width: '100%' }}>
              <h4>General features:</h4>
              <p>
                1. chat feature works by specifying receiver email address <br />
                2. admin has access to user profiles and active sessions (chat, telemetry, log events) <br />
                3. you can simulate a chat session by opening 3 separate incognito browsers <br />
              </p>
            </div>
          </div>
          <Footer />
        </div>
      );
    };
    
export default QADashboard;
