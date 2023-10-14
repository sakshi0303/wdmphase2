import React, { useState } from 'react';
import '../assets/css/styles.css';
import { Footer, Header } from './HeaderFooter';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Here, you can handle form submission, validation, and navigation
        // For now, let's just navigate to another page (e.g., /success) as an example
        // Simulate a successful registration
        // You can replace this with your actual registration API call
        const registrationSuccessful = true;

        if (registrationSuccessful) {
            // Display an alert
            alert('User Profile registered successfully');

            // Redirect to the login page
            navigate('/login');
        } else {
            // Handle registration failure (e.g., show an error message)
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div>
            {/* Render the header component */}
            <Header />

            <div className="container">
                <div className="main-content">
                    <div className="section-container">
                        <div className="section-title">Sign Up</div>
                        <form id="signupForm" className="auth-form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <input
                                type="password"
                                name="confirm_password"
                                placeholder="Confirm Password"
                                required
                                value={formData.confirm_password}
                                onChange={handleInputChange}
                            />
                            <input type="submit" value="Sign Up" />
                            {/* Use a button element instead of an anchor (a) for better accessibility */}
                            <p>
                                Already a member{' '}
                                <button
                                    type="button"
                                    onClick={() => navigate('/login')}
                                    aria-label="Login"
                                    style={{
                                        border: 'none',
                                        padding: 0,
                                        background: 'none',
                                        cursor: 'pointer',
                                        color: 'blue',
                                        textDecoration: 'underline',
                                    }}
                                >
                                    Login
                                </button>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* Render the footer component */}
            <Footer />
        </div>
    );
};

export default SignUp;
