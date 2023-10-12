
import React, { useEffect, useState } from 'react';
import '../assets/css/styles.css';
import { Header, Footer } from '../components/HeaderFooter';
import { UserData, UserMap } from '../types/types'
import { checkAuthorized, getCurrentUserProfile, userProfile } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import PersonalInfoOverlay from '../components/personalInfo';
import FeedbackOverlay from '../components/feedback';



const StudentDashboard = () => {

  const [users, setUsers] = useState<UserMap>({});
  const [loading, setLoading] = useState(false);
  const [isPersonalInfoOverlayVisible, setIsPersonalInfoOverlayVisible] = useState(false);
  const [isFeedbackOverlayVisible, setIsFeedbackOverlayVisible] = useState(false);

  const handleTogglePersonalInfoOverlay = () => {
    setIsPersonalInfoOverlayVisible(!isPersonalInfoOverlayVisible);
  };

  const handleToggleFeedbackOverlay = () => {
    setIsFeedbackOverlayVisible(!isFeedbackOverlayVisible);
  };

  const navigate = useNavigate();

  const currentUserProfile = getCurrentUserProfile()

  // auth
  const allowedRoles: string[] = ["student", "admin"];
  const checkWithRoles = () => {    
    const isAuthorized = checkAuthorized(allowedRoles);
    if (!isAuthorized) {
      navigate('/error')
    }    
  };

  useEffect(() => {
    checkWithRoles();

    if (Object.keys(users).length === 0) {
      loadUserProfiles();
    }
    // load data    
    fetchUserData();
    userProfile(currentUserProfile.name)

    // intervals
    setInterval(checkForMessages, 1000);
    const intervalId = setInterval(checkWithRoles, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);


  // user profile functions

  function loadUserProfiles(): void {
    try {
      setLoading(true);
      // Read the CSV file
      const filePath = process.env.PUBLIC_URL + '/csv/users.csv';

      if (Object.keys(users).length !== 0) {
        console.log('already  full')
        return
      }
      console.log('loading user profiles')

      fetch(filePath).then(
        (response) => {
          response.text().then(
            (csvData) => {
              const rows = csvData.split('\n');

              const tableBody = document.getElementById('user-profile-table-body');

              // Add a class for styling to the user profile table
              const table = document.getElementById('user-profile-table');
              if (table) {
                table.classList.add('csv-table');
              }

              for (let i = 1; i < rows.length; i++) {
                const [id, name, role, email] = rows[i].split(',');
                const row = document.createElement('tr');

                // Generate unique IDs for each <td> element based on the user ID (id)
                row.innerHTML = `
                  <td id="user-id-${id}">${id}</td>
                  <td id="user-name-${id}">${name}</td>
                  <td id="user-email-${id}">${email}</td>
                  <td id="user-role-${id}">${role}</td>                    
                  <td>
                      <button id="button-${id}" class="edit-button" data-id="${id}">Edit</button>
                  </td>
                  `;

                // Add a class for styling to the data row
                row.classList.add('data-row');

                if (tableBody) {
                  tableBody.appendChild(row);
                }
              }
            }
          )

        }
      )
      setLoading(false);
    } catch (error) {
      console.error('Error loading user profiles:', error);
      setLoading(false)
    }
  }


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

  // chat functions

  const checkForMessages = () => {
    // Check if there is a message for the student

    const message = window.localStorage.getItem(`messageFor_${currentUserProfile.id}`);

    if (message) {
      //const messageType = determineMessageType(message);
      const messageType = message.startsWith("admin:") ? "admin-message" : "student-message";

      const chatBox = document.querySelector('.chat-box');
      const messageDiv = document.createElement('div');
      messageDiv.className = messageType;
      messageDiv.textContent = message;
      chatBox?.appendChild(messageDiv);

      console.log('checkForMessages', message)

      // Clear the message from local storage
      window.localStorage.removeItem(`messageFor_${currentUserProfile.id}`);
    }
  };

  async function startChatWithUser(): Promise<void> {
    try {

      openChatForm()
        .then((formData) => {
          const typedFormData = formData as { id: string };
          console.log('instructor', formData)
          console.log(JSON.stringify(users))
          if (users[typedFormData.id]) {
            const data = {
              id: users[typedFormData.id].id,
            };
            window.localStorage.setItem('student-data', JSON.stringify(data));
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

      // Create an input element for student ID
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

    const receiverDataJSON = window.localStorage.getItem('student-data');
    if (!receiverDataJSON) {
      console.log('student data not found.'); // Debug log
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
    userMessage.innerHTML = `<p>(student)   ${currentUserProfile.name}: ${userInput}</p>`; // Include student name
    if (chatBox) {
      chatBox.appendChild(userMessage);
    }

    // Send the message to the given user id
    window.localStorage.setItem(`messageFor_${receiverData.id}`, `(instructor)   ${currentUserProfile.name}: ${userInput}`); // Include student name

    // send message to admin
    window.localStorage.setItem(`messageFor_0`, `(instructor)   ${currentUserProfile.name}: ${userInput}`);

    // Clear user input
    (document.getElementById('userInput') as HTMLInputElement).value = '';
  }

  // manage users
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
        {/* First Container */}
        <div className="dashboard-container">
          <div className="course-container">
            <h3>CSE 6060</h3>
            <h4>Operating System</h4>
            <hr />
            <a href="#">Assessment</a>
            <a href="#">Analytics</a>
            <a href="#">Report</a>
          </div>

          <div className="course-container">
            <h3>CSE 5091</h3>
            <h4>Computer Vision</h4>
            <hr />
            <a href="#">Assessment</a>
            <a href="#">Analytics</a>
            <a href="#">Report</a>
          </div>

          <div className="course-container">
            <h3>CSE 6098</h3>
            <h4>System Design</h4>
            <hr />
            <a href="#">Assessment</a>
            <a href="#">Analytics</a>
            <a href="#">Report</a>
          </div>

          <div className="course-container">
            <h3>CSE 5072</h3>
            <h4>Machine Learning</h4>
            <hr />
            <a href="#">Assessment</a>
            <a href="#">Analytics</a>
            <a href="#">Report</a>
          </div>
        </div>

        {/* Second Container */}
        <div className="dashboard-instructor-y-container">
          <div className="dashboard-instructor-container">
            {/* Quick Actions */}
            <div className="instructor-2l-container">
              <div className="instructor-2l-action-item">Quick Actions</div>
              <div>
                <div className="instructor-2l-action-item">
                  <button onClick={handleTogglePersonalInfoOverlay} className="instructor-3l-action">Update Personal Info</button>
                </div>
                <div className="instructor-2l-action-item">
                  <button onClick={handleToggleFeedbackOverlay} className="instructor-3l-action">Instructor feedback</button>
                </div>
                <div className="instructor-2l-action-item">
                  <button className="instructor-3l-action">Book Appointment</button>
                </div>
              </div>
            </div>

            {/* Conditionally render the PersonalInfoOverlay */}
            {isPersonalInfoOverlayVisible && (
              <PersonalInfoOverlay
                userData={currentUserProfile}
                shouldDisplay={isPersonalInfoOverlayVisible}
                onSave={(userData: UserData) => { console.log(`saved user profile: ${userData}`) }}
                onToggle={setIsPersonalInfoOverlayVisible} // Pass the state setter function              
              />
            )}

            {/* Conditionally render the FeedbackOverlay */}
            {isFeedbackOverlayVisible && (
              <FeedbackOverlay
                shouldDisplay={isFeedbackOverlayVisible}
                onToggle={setIsFeedbackOverlayVisible} // Pass the state setter function    
                feedbackReceiver='instructor'          
              />
            )}


            {/* Chat Feature */}
            <div className="instructor-2l-container">
              <div className="chat-container">
                <button className="chat-button" onClick={startChatWithUser}>Start Chat</button>
                <div className="chat-box">
                  <div id="studentMessages"></div>
                  <div id="instructorMessages"></div>
                </div>
                <div className="chat-input-container" style={{ display: 'none' }}>
                  <input type="text" id="userInput" className="chat-input" placeholder="Type your message here..." onKeyDown={() => { console.log('handleKeyDown') }} />
                  <button className="chat-button" onClick={sendMessage}>Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StudentDashboard;
