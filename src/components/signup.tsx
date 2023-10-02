// SignUp.tsx

import React from 'react';
import '../assets/css/styles.css';
import { Footer, Header } from './HeaderFooter';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Header/>

            <div className="container">
                <div className="main-content">
                    <div className="section-container">
                        <div className="section-title">Sign Up</div>
                        <form id="signupForm" className="auth-form">
                            <input type="text" name="name" placeholder="Your Name" required />
                            <input type="email" name="email" placeholder="Email" required />
                            <input type="password" name="password" placeholder="Password" required />
                            <input type="password" name="confirm_password" placeholder="Confirm Password" required />
                            <input type="submit" value="Sign Up" />
                            <p> Already a member <a  onClick={() => {navigate('/login')}}> Login</a></p>
                            
                        </form>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
}

export default SignUp;
