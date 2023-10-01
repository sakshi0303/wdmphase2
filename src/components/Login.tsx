import React from 'react';
import '../assets/css/styles.css';
import { Header, Footer } from './HeaderFooter';
import AdminDashboard from './admin_dashboard';
import { useNavigate } from 'react-router-dom';
import {UserData} from '../types/types'



const Login = () => {
  const navigate = useNavigate();
  // Function to validate user login
  async function validateLogin(event: React.FormEvent): Promise<void> {
    event.preventDefault(); // Prevent the default form submission behavior
  
    try {
      const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
      const passwordInput = document.querySelector('input[name="password"]') as HTMLInputElement;
  
      if (emailInput && passwordInput) {
        // Fetch user data from an external CSV file
        const response = await fetch('/csv/users.csv');
       
  
        if (response.ok) {
          const csvData = await response.text();
          
  
          // Parse CSV data into an array of objects
          const userData: UserData[] = parseCSVData(csvData);
  
          // Find the user with matching email and password
          const matchingUser = userData.find((user) => user.email === emailInput.value && user.password === passwordInput.value);
  
          if (matchingUser) {
            window.sessionStorage.setItem('identity', JSON.stringify(matchingUser))
            // Redirect or perform login action
            switch (matchingUser.role) {
              case 'admin':
                navigate('/admin-dashboard');
                break;
              case 'coordinator':
                navigate('/coordinator-dashboard');
                break;
              case 'instructor':
                navigate('/instructor-dashboard');
                break;
              case 'qa':
                navigate('/qa-dashboard');
                break;
              case 'student':
                navigate('/student-dashboard');
                break;
              default:
                console.log('Unknown role');
            }
            
            //return; // Exit the function if login is successful
          } else {
            // If no matching user found
            console.log('Login failed. Invalid credentials');
          }
        } else {
          console.error('Failed to fetch CSV data. Response status:', response.status);
          // Handle the error (e.g., show an error message to the user)
        }
      } else {
        console.log('Email and password input fields not found');
      }
    } catch (error) {
      console.error('Error fetching or parsing user data:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  }
  
  

  // Function to parse CSV data into an array of objects
  // Function to parse CSV data into an array of objects
function parseCSVData(csv: string): UserData[] {
  const lines = csv.trim().split('\n');
  const userData: UserData[] = [];

  // Assuming that the first line contains column headers, you can skip it.
  for (let i = 1; i < lines.length; i++) {
    const fields = lines[i].split(',');
    
    // Check if the line contains the expected number of fields (6 in this case).
    if (fields.length === 6) {
      const user: UserData = {
        id: fields[0],
        name: fields[1],
        role: fields[2],
        email: fields[3],
        uuid: fields[4], // Add the uuid field
        password: fields[5]
      };
      userData.push(user);
    }
  }

  return userData;
}


  return (
    <div className="container">
      <Header />
      <div className="main-content">
        <div className="section-container">
          {/* <form id="loginForm" className="auth-form">
            <div><input type="email" name="email" placeholder="Email (ex: admin@gmail.com)" required /></div>
            <div><input type="password" name="password" placeholder="Password (ex: admin)" required /></div>
            <div><button onClick={validateLogin}>Login</button></div>
            <div>
              <a href="forgot-password.html">Forgot password?</a>
              <p>Not a member? <a href="signup.html">Sign Up</a></p>
            </div>
          </form> */}

          <form id="loginForm" className="auth-form" onSubmit={validateLogin}>
            <div><input type="email" name="email" placeholder="Email (ex: admin@gmail.com)" required /></div>
            <div><input type="password" name="password" placeholder="Password (ex: admin)" required autoComplete='' /></div>
            <div><button type="submit">Login</button></div>
            <div>
              <a href="forgot-password.html">Forgot password?</a>
              <p>Not a member? <a href="signup.html">Sign Up</a></p>
            </div>
          </form>
        </div>
      </div>
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

export default Login;
