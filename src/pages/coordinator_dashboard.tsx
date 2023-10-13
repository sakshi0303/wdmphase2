
import React, { useEffect, useState } from 'react';
import { Routes, Link, Outlet, Route } from 'react-router-dom';

import '../assets/css/pcss.css';
import { Header, Footer } from '../components/HeaderFooter';
import { UserData, UserMap } from '../types/types';
import { checkAuthorized, getCurrentUserProfile, userProfile } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { KeyboardEvent } from 'react';



const CoordinatorDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('CoordinatorDashboard');

  const [users, setUsers] = useState<UserMap>({});
  const [isPersonalInfoOverlayVisible, setIsPersonalInfoOverlayVisible] = useState(false);
  const [isFeedbackOverlayVisible, setIsFeedbackOverlayVisible] = useState(false);


  // Define a function to render the selected component
  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'CoordinatorDashboard':
        return renderCoordinatorDashboard();
        
      case 'PCStudent':
        return (
          <section id="Student">
          <table>
            <tr>
              <th>Student Name</th>
              <th>Student ID</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>GPA</th>
            </tr>
            <tr>
              <td>kiranmai</td>
              <td>1002080821</td>
              <td>kiran@mavs.uta.edu</td>
              <td>123-456-7890</td>
              <td>3.5</td>
            </tr>
            <tr>
              <td>Harini</td>
              <td>1002080841</td>
              <td>harini@mavs.uta.edu</td>
              <td>987-654-3210</td>
              <td>3.4</td>
            </tr>
            <tr>
              <td>Pranavi</td>
              <td>1002034891</td>
              <td>pranavi@mavs.uta.edu</td>
              <td>987-654-3210</td>
              <td>3.7</td>
            </tr>
            <tr>
              <td>Marnim</td>
              <td>1002080678</td>
              <td>marnim@mavs.uta.edu</td>
              <td>987-654-3210</td>
              <td>3.4</td>
            </tr>
            <tr>
              <td>krishna</td>
              <td>1002076543</td>
              <td>krishna.smith@email.com</td>
              <td>987-654-3210</td>
              <td>3.8</td>
            </tr>
            {/* Add more rows as needed for additional students */}
          </table>
        </section>
        );
      case 'PCInstructor':
        return (
          <section id="instructor">
          <table>
            <tr>
              <th>Instructor Name</th>
              <th>Email ID</th>
              <th>Course</th>
              <th>Mobile Number</th>
            </tr>
            <tr>
              <td>Elizabeth Diaz</td>
              <td>elizabeth@email.com</td>
              <td>Web Data Management</td>
              <td>123-456-7890</td>
            </tr>
            <tr>
              <td>Faranaz Rarahanipad</td>
              <td>farnaz@email.com</td>
              <td>Software Engineering</td>
              <td>987-654-3210</td>
            </tr>
            <tr>
              <td>Negin</td>
              <td>negin@email.com</td>
              <td>DAA</td>
              <td>987-654-3210</td>
            </tr>
            <tr>
              <td>Marnim Galib</td>
              <td>marnim@email.com</td>
              <td>Data Mining</td>
              <td>987-654-3210</td>
            </tr>
            <tr>
              <td>Ramakrishna</td>
              <td>ramakrishna.smith@email.com</td>
              <td>Mathematics</td>
              <td>987-654-3210</td>
            </tr>
            {/* Add more rows as needed for additional instructors */}
          </table>
        </section>
        );
      case 'QAReports':
        // return <QAReports />;
      case 'PCHelp':
        return renderPCHelp();
      case 'PCFAQs':
        return renderPCFAQs();
      case 'PCContactUs':
        return renderPCContactUs();
      default:
        return null;
    }
  };

  // Define a function to render the content for PCHelp
  const renderCoordinatorDashboard = () => {
    return (
      <section id="welcome">
      <div>
        <h3>Program Overview</h3>
        <p>
          Masters in Computer Science program is meticulously designed to offer a holistic and future-ready
          education. We are not just fostering the next generation of computer scientists; we are shaping the pioneers
          and leaders of tomorrow's digital world.
        </p>
      </div>
      <div>
        <h3>Responsibilities</h3>
        <p>
          Address the main liabilities and functions of the program coordinator. This can involve duties including
          working with instructors, keeping track of students' progress, managing communications, and making sure the
          program is successful.
        </p>
      </div>
      <div>
        <h3>Announcements</h3>
        <p>
          Important or urgent announcements are displayed here if there are any. This might be connected to
          modifications to the program schedule, updated policies, or other significant information.
        </p>
      </div>

  

      <div>
      
      <div className="instructor-2l-container">
      <div className="chat-container">
        <button className="chat-button" onClick={startChatWithUser}>Start Chat</button>
        <div className="chat-box">
          <div id="Program CoodinatorMessages"></div>
          <div id="instructorMessages"></div>
        </div>
        <div id="chatInterface" className="chat-input-container instructor-chat-container" style={{ display: 'none' }}>
          <input type="text" id="userInput" className="chat-input" placeholder="Type your message here..." onKeyDown={handleKeyDown} />
          <button className="chat-button" onClick={sendMessage}>Chat</button>
        </div>
      </div>
    </div>

      {/* Add your content here */}
    </div>
    </section>
      );
    };

   // Define a function to render the content for PCHelp
   const renderPCHelp = () => {
    return (
      <section id="help-content">
        <h2>Get Help and Support</h2>
        <p>If you need assistance or have any questions, please check the following resources:</p>
        <ul>
          <li><Link to="../components/pcFAQs">FAQs</Link></li>
          <li><Link to="../components/pccontactUs">Contact Support</Link></li>
        </ul>

        <h3 id="faq">Frequently Asked Questions (FAQs)</h3>
        <p>Find answers to common questions in our FAQ section.</p>
        <li><Link to="../components/pcFAQs">Browse FAQs</Link></li>

        <h3 id="contact">Contact Support</h3>
        <p>If you need further assistance, feel free to contact our support team.</p>
        <li><Link to="../components/pccontactUs">Contact Support</Link></li>
      </section>
    );
  };

  // Define a function to render the content for PCFAQs
  const renderPCFAQs = () => {
    return (
      <div>
        
        <section id="FAQ">
          <h2>Frequently Asked Questions</h2>
          <p>1. How do I reset my password?</p>
          <p> * To reset your password, click on the "Forgot Password" link on the login page. Follow the instructions
            sent to your registered email to create a new password.</p>
          <p>2. How can I add a new instructor to the program?</p>
          <p> * To add a new instructor, navigate to the "Instructors" section on the dashboard. Click the "Add
            Instructor" button and fill out the required information. Don't forget to assign courses or
            responsibilities as needed.</p>
          <p>3. Can I export student performance reports for a specific time frame?</p>
          <p> * Yes, you can export student performance reports for a specific time frame. Visit the "Reports"
            section, select the desired date range, and click the "Export" button to generate a report in a
            downloadable format.</p>
        </section>
      </div>
    );
  };

  // Define a function to render the content for PCContactUs
  const renderPCContactUs = () => {
    return (
      <div>
        <section id="contact">
            <h2>Contact Us</h2>
            <p>Support Email: support@yourprogramdashboard.com</p>
            <p>Phone: +1 (123) 456-7890</p>
            <p>Office Hours:</p>
            <p>Monday to Friday: 9:00 AM - 5:00 PM (GMT)</p>
            <p>Saturday: 10:00 AM - 2:00 PM (GMT)</p>
            <p>Mailing Address:</p>
            <p>Program Coordinator Dashboard Support</p>
            <p>123 Main Street</p>
            <p>Arlington, 73013</p>
            <p>Texas</p>
        </section>
      </div>
    );
  };
  

  const handleTogglePersonalInfoOverlay = () => {
    setIsPersonalInfoOverlayVisible(!isPersonalInfoOverlayVisible);
  };

  const handleToggleFeedbackOverlay = () => {
    setIsFeedbackOverlayVisible(!isFeedbackOverlayVisible);
  };

  const navigate = useNavigate();

  const currentUserProfile = getCurrentUserProfile();

  // auth
  const allowedRoles: string[] = ["coordinator", "admin"];

  useEffect(() => {
    const checkWithRoles = () => {
      const isAuthorized = checkAuthorized(allowedRoles);
      if (!isAuthorized) {
        navigate('/error');
      }
    };

    // chat
    function checkForMessages(): void {
      const message = window.localStorage.getItem(`messageFor_${currentUserProfile.id}`);
      if (message) {
        const messageType = message.startsWith("admin:") ? "admin-message" : "Program Coodinator-message";
        const chatBox = document.querySelector('.chat-box');
        const messageDiv = document.createElement('div');
        messageDiv.className = messageType;
        messageDiv.textContent = message;
        chatBox?.appendChild(messageDiv);
        window.localStorage.removeItem(`messageFor_${currentUserProfile.id}`);
      }
    }

    checkWithRoles();

    // load data    
    fetchUserData();
    userProfile(currentUserProfile.name)


    // Load user profiles if necessary (similar to Program CoodinatorDashboard)

    // Load data (similar to Program CoodinatorDashboard)

    // Intervals (similar to Program CoodinatorDashboard)

    setInterval(checkForMessages, 1000);
    const intervalId = setInterval(checkWithRoles, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [allowedRoles, users, currentUserProfile.id, currentUserProfile.name, navigate]);

  async function fetchUserData() {
    try {
      const response = await fetch(process.env.PUBLIC_URL + '/csv/users.csv');
      const csvData = await response.text();
      const rows = csvData.split('\n');
      const usersData: UserMap = {};

      // Skip the header row
      for (let i = 1; i < rows.length; i++) {
        const [id, name, role, email] = rows[i].split(',');
        usersData[email] = { id, name, role, email };
      }

      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  async function startChatWithUser(): Promise<void> {
    try {

      openChatForm()
        .then((formData) => {
          const typedFormData = formData as { id: string };
          console.log('program coordinator', formData)
          console.log(JSON.stringify(users))
          if (users[typedFormData.id]) {
            const data = {
              id: users[typedFormData.id].id,
            };
            window.localStorage.setItem('Program Coodinator-data', JSON.stringify(data));
            // Show the chat input container
            const chatInputContainer = document.querySelector('.chat-input-container') as HTMLElement | null;
            if (chatInputContainer) {
              chatInputContainer.style.display = 'block';
            } else {
              console.error('Chat input container not found.');
            }
          } else {
            alert("Incorrect Email ID. Cross Check https://sx3702.uta.cloud/assignment2/assets/reports/csv/users.csv");
          }
        })
        .catch((error: Error) => {
          alert(error.message);
        });
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('Error fetching user data. Please try again later.');
    }
  }

  function openChatForm() {
    return new Promise((resolve, reject) => {
      // Create a div element for the form container
      const formContainer = document.createElement("div");
      formContainer.className = "prompt-form-container";
      formContainer.style.position = "fixed";
      formContainer.style.top = "50%";
      formContainer.style.left = "50%";
      formContainer.style.transform = "translate(-50%, -50%)";
      formContainer.style.zIndex = "1000";
      formContainer.style.background = "floralwhite";

      // Add styles to create a background overlay
      // formContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      formContainer.style.width = "300px";
      formContainer.style.padding = "40px";
      formContainer.style.borderRadius = "5px";
      formContainer.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";

      // Create a close button
      const closeButton = document.createElement("button");
      closeButton.type = "button"; // Make sure it's not a submit button
      closeButton.textContent = "Close";
      closeButton.style.position = "absolute";
      closeButton.style.top = "10px";
      closeButton.style.right = "10px";
      closeButton.addEventListener("click", () => {
        // Remove the form container from the document
        document.body.removeChild(formContainer);
      });

      // Create a form element
      const form = document.createElement("form");
      form.className = "prompt-form";

      // Create an input element for Program Coodinator ID
      const userIdInput = document.createElement("input");
      userIdInput.type = "text";
      userIdInput.id = "userId";
      userIdInput.name = "userId";
      userIdInput.placeholder = "User Email";
      userIdInput.required = true;

      // Create a submit button
      const submitButton = document.createElement("button");
      submitButton.type = "submit";
      submitButton.textContent = "Start Chat";

      // Add form elements to the form
      form.appendChild(userIdInput);
      form.appendChild(submitButton);

      // Add a submit event listener to the form
      form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Retrieve the entered values
        const id = userIdInput.value;

        // Perform validation and any other necessary actions
        if (id) {
          // Remove the form container from the document
          document.body.removeChild(formContainer);

          // Resolve the promise with the entered values as an object
          resolve({ id });
        } else {
          // Reject the promise with an error message
          reject("Please fill in all fields.");
        }
      });

      // Append the form to the form container
      formContainer.appendChild(closeButton);
      formContainer.appendChild(form);

      // Append the form container to the document body
      document.body.appendChild(formContainer);
    });
  }

  function sendMessage(): void {
    const chatBox = document.querySelector('.chat-box') as HTMLElement | null;
    const userInput = (document.getElementById('userInput') as HTMLInputElement).value;

    const receiverDataJSON = window.localStorage.getItem('Program Coodinator-data');
    if (!receiverDataJSON) {
      console.log('Program Coodinator data not found.'); // Debug log
      return;
    }

    const receiverData = JSON.parse(receiverDataJSON);

    if (!receiverData || !receiverData.id) {
      console.log('Invalid User ID'); // Debug log
      alert('Please enter a valid email ID');
      return;
    }

    if (!chatBox) {
      console.log('Chat box not found.'); // Debug log
      return;
    }

    const currentUserProfile = getCurrentUserProfile(); // You should define this function

    // Only send a message if there is input
    if (userInput.trim() === '') {
      return;
    }


    // Append the user's message to their chat
    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.innerHTML = `<p>(Program Coodinator)   ${currentUserProfile.name}: ${userInput}</p>`; // Include Program Coodinator name
    if (chatBox) {
      chatBox.appendChild(userMessage);
    }

    // Send the message to the given user id
    window.localStorage.setItem(`messageFor_${receiverData.id}`, `(instructor)   ${currentUserProfile.name}: ${userInput}`); // Include Program Coodinator name

    // send message to admin
    window.localStorage.setItem(`messageFor_0`, `(instructor)   ${currentUserProfile.name}: ${userInput}`);

    // Clear user input
    (document.getElementById('userInput') as HTMLInputElement).value = '';
  }

  // manage users
  // TODO: use this later
  function handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default 'Enter' behavior
      sendMessage(); // Trigger the sendMessage function
    }
  }

  return (
    <div className="container">
      <Header />

      <div className="container">
      <nav>
  <ul>
    <li><button onClick={() => setSelectedComponent('CoordinatorDashboard')}>Coordinator Dashboard</button></li>
    <li><button onClick={() => setSelectedComponent('PCStudent')}>Students</button></li>
    <li><button onClick={() => setSelectedComponent('PCInstructor')}>Instructors</button></li>
    <li><button onClick={() => setSelectedComponent('QAReports')}>Reports</button></li>
    {/* <li><button onClick={() => setSelectedComponent('PCHelp')}>Help</button></li> */}
    <li><button onClick={() => setSelectedComponent('PCFAQs')}>PC FAQs</button></li>
          <li><button onClick={() => setSelectedComponent('PCContactUs')}>PC Contact Us</button></li>
    {/* Add other navigation links/buttons as needed */}
  </ul>
</nav>
        <main>
        {renderSelectedComponent()}

          
          {/* if student */}
          {/* <compB></compB> */}

          {/* if student */}
          {/* <compB></compB> */}



        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CoordinatorDashboard;

