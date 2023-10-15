/*  
    Author: Sakshi
    UTA ID: 1001993702
    Email: sx3702@mavs.uta.edu
    Group number: 1, WDM assignment, Assignment 3
    Date: October 14, 2023
    Description: ForgotPassword.tsx
    
*/

import React from 'react';
import '../assets/css/styles.css';
import { Footer, Header } from './HeaderFooter';
import { useNavigate } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();
    // const handleLogout = () => {
    //     // This should contain the logic for the logout functionality.
    //     // For now, it's just a placeholder.
    // };

    return (
        <div>
            <Header />

            <div className="container">
                <div className="main-content">
                    <div className="section-container">
                        <div className="section-title">Forgot Password</div>
                        <form id="forgotPasswordForm" className="auth-form">
                            <input type="email" name="email" placeholder="Email" required />
                            <input type="submit" value="Reset Password" />
                            <p>
                                Remember your password?{' '}
                                <button onClick={() => navigate('/login')} type="button">
                                    Login
                                </button>
                            </p>
                            

                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default ForgotPassword;

// ToDo:
// - The logout function from auth.js should be converted into a proper TypeScript function.
// - Inline JavaScript, like the logoutButton script, should be converted into React event handlers.
