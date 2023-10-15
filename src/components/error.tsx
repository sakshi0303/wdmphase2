/*  
    Author: Sakshi
    UTA ID: 1001993702
    Email: sx3702@mavs.uta.edu
    Group number: 1, WDM assignment, Assignment 3
    Date: October 14, 2023
    Description: error.tsx
*/
import React from 'react';
import '../assets/css/styles.css';
import '../utils/auth';

import { Header, Footer } from './HeaderFooter';

const Error: React.FC = () => {
  

  return (
    <div className="container">
       <Header login={true}/>
      

      <div className="main-content">
        <div className="section-container">
          The current user role does not have access to this page.
        </div>
      </div>

    <Footer />
    </div>
  );
};

export default Error;