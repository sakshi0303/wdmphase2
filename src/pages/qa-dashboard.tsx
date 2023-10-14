
import React, { useEffect, useRef, useState } from 'react';
import { Routes, Link, Outlet, Route } from 'react-router-dom';


import '../assets/css/qastyles.css';

import { Header, Footer } from '../components/HeaderFooter';
import { UserData, UserMap } from '../types/types';
import { checkAuthorized, getCurrentUserProfile, userProfile } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { KeyboardEvent } from 'react';
import { BarChart } from '../components/chart';
import ReportsComponent from '../components/reports';

// ... (import statements)

const QADashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('QADashboard');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editableContent, setEditableContent] = useState<Record<string, string>>({});
  const editableElementIds: string[] = ['policyTitle', 'policyDescription', 'programmeTitle', 'programmeDescription', 'feedbackTitle', 'feedbackDescription', 'supportTitle', 'supportDescription', 'internalTitle', 'internalDescription', 'actionsTitle', 'actionsList'];


  const [users, setUsers] = useState<UserMap>({});
  const [isPersonalInfoOverlayVisible, setIsPersonalInfoOverlayVisible] = useState(false);
  const [isFeedbackOverlayVisible, setIsFeedbackOverlayVisible] = useState(false);

  // Define your state variables for QA-related data here

  useEffect(() => {
    // Add your QA-related data fetching and setup logic here
    editableElementIds.forEach((elementId) => {
      const savedContent = localStorage.getItem(elementId);
      if (savedContent) {
        setEditableContent((prevContent) => ({
          ...prevContent,
          [elementId]: savedContent,
        }));
      }
    });
  }, []);

  const handleEditClick = () => {
    setIsEditing((prevState) => !prevState);
    editableElementIds.forEach((elementId) => {
      const element = document.getElementById(elementId);
      if (element) {
        element.contentEditable = (!isEditing).toString();
        element.style.backgroundColor = isEditing ? 'transparent' : '#f0f0f0';
      }
    });
  };

  const handleSaveChanges = () => {
    editableElementIds.forEach((elementId) => {
      const element = document.getElementById(elementId);
      if (element) {
        localStorage.setItem(elementId, element.textContent || '');
      }
    });
  };

  const newPoliciesContainer = document.getElementById('newPolicies');

  const handleAddNew = () => {
    // Create new policy elements
    const newPolicy = document.createElement('div');
    newPolicy.innerHTML = `
      <h2 class="editable" contenteditable="true">New Policy Header</h2>
      <p class="editable" contenteditable="true">New Policy Content</p>
    `;

    const newElementIds = ['newPolicyHeader', 'newPolicyContent'];
    newElementIds.forEach((elementId) => {
      const newElement = newPolicy.querySelector(`#${elementId}`);
      if (newElement) {
        newElement.addEventListener('input', handleSaveChanges);
      }
    });

    if (newPoliciesContainer) {
      newPoliciesContainer.appendChild(newPolicy);
    }
  };


  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'QADashboard':
        return renderQADashboard();
      case 'Reports':
        return <ReportsComponent/>
      case 'Recommendations':
        return renderRecommendations();
      // Add cases for other QA-related components as needed
      default:
        return null;
    }
  };

  const renderQADashboard = () => {
    return (
      <div className="qa-dashboard-container">

        
        <div id="policies">
          <h2 className="editable" id="policyTitle" contentEditable="true" suppressContentEditableWarning={true}>Quality Assurance Focus</h2>
          <p className="editable" id="policyDescription" contentEditable="true" suppressContentEditableWarning={true}>
            To encourage continuous improvement in the quality of all training programmes and associated
            development
            solutions, thereby making learning an enjoyable activity and through this, increasing learner
            retention
            and the achievement of learning aims.
          </p>

          <h2 className="editable" id="programmeTitle" contentEditable="true" suppressContentEditableWarning={true}>Programme Development</h2>
          <p className="editable" id="programmeDescription" contentEditable="true" suppressContentEditableWarning={true}>
            To develop and maintain a diverse range of programmes that will be appropriate across the entire
            recruitment sector which provide learners with techniques, processes, and structures that will
            enable
            them to perform their roles at a higher standard.
          </p>

          <h2 className="editable" id="feedbackTitle" contentEditable="true" suppressContentEditableWarning={true}>Feedback and Improvement</h2>
          <p className="editable" id="feedbackDescription" contentEditable="true" suppressContentEditableWarning={true}>
            To provide information and feedback from all interactions with our clients and learners that
            enables
            continuous updates and improvements to our development solutions.
          </p>

          <h2 className="editable" id="supportTitle" contentEditable="true" suppressContentEditableWarning={true}>Supportive Services</h2>
          <p className="editable" id="supportDescription" contentEditable="true" suppressContentEditableWarning={true}>
            To establish standards and monitoring procedures for providing a supportive and accessible range
            of
            services to all learners.
          </p>

          <h2 className="editable" id="internalTitle" contentEditable="true" suppressContentEditableWarning={true}>Internal Quality Assurance for
            Employees</h2>
          <p className="editable" id="internalDescription" contentEditable="true" suppressContentEditableWarning={true}>
            To review regularly the performance, training, and needs of all employees.
          </p>

          <h2 className="editable important" id="actionsTitle" contentEditable="true" suppressContentEditableWarning={true}>Actions</h2>
          <ul className="editable" id="actionsList" contentEditable="true" suppressContentEditableWarning={true}>
            <li>Action plan for improvement within Enabling Change Limited.</li>
            <li>Highlight issues that need consideration by Enabling Change Limited.</li>
            <li>Feedback on actions taken will be shared with employees.</li>
            <li>Identify new initiatives and solutions that will improve the quality of development that we
              bring to
              our clients.</li>
          </ul>

          <div id="newPolicies">

          </div>
          <button id="addNewButton" onClick={handleAddNew}>Add New</button> |
          <button id="editButton" onClick={handleEditClick}>Edit</button>


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
        </div>

      </div>
    );
  };

  const renderRecommendations = () => {
    return (
      <div className="qa-dashboard-container">
        <div id="content">
          <h2>Welcome to Quality Assurance Dashboard - Recommendations</h2>
          <div id="recommendations">
            <label htmlFor="recommendationId">Enter ID:</label>
            <input type="text" id="recommendationId" />
            <button id="generateButton">Generate</button>
          </div>
        </div>
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

  const allowedRoles: string[] = ["qa", "admin"];

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
        const messageType = message.startsWith("admin:") ? "admin-message" : "Quality Assurance-message";
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


    // Load user profiles if necessary (similar to Quality AssuranceDashboard)

    // Load data (similar to Quality AssuranceDashboard)

    // Intervals (similar to Quality AssuranceDashboard)

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
            window.localStorage.setItem('Quality Assurance-data', JSON.stringify(data));
            // Show the chat input container
            const chatInputContainer = document.querySelector('.chat-input-container') as HTMLElement | null;
            if (chatInputContainer) {
              chatInputContainer.style.display = 'block';
            } else {
              console.error('Chat input container not found.');
            }
          } else {
            alert("Incorrect Email ID. Cross Check ");
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

      // Create an input element for Quality Assurance ID
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

    const receiverDataJSON = window.localStorage.getItem('Quality Assurance-data');
    if (!receiverDataJSON) {
      console.log('Quality Assurance data not found.'); // Debug log
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
    userMessage.innerHTML = `<p>(Quality Assurance)   ${currentUserProfile.name}: ${userInput}</p>`; // Include Quality Assurance name
    if (chatBox) {
      chatBox.appendChild(userMessage);
    }

    // Send the message to the given user id
    window.localStorage.setItem(`messageFor_${receiverData.id}`, `(instructor)   ${currentUserProfile.name}: ${userInput}`); // Include Quality Assurance name

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
            <li><button onClick={() => setSelectedComponent('QADashboard')}>QA Dashboard</button></li>
            <li><button onClick={() => setSelectedComponent('Reports')}>Reports</button></li>
            <li><button onClick={() => setSelectedComponent('Recommendations')}>Recommendations</button></li>
          </ul>
        </nav>
        <main>
          {renderSelectedComponent()}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default QADashboard;
