
import { useCallback, useEffect, useState } from 'react';
import '../assets/css/styles.css';
import { Header, Footer } from './HeaderFooter';
import { Message, UserData } from '../types/types'
import { getCurrentUserProfile } from '../utils/auth';
import { KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';

type UserMap = { [key: string]: UserData };

// this is the main export of this page
// all stateful activity happens here
// if you want to reference a stateful value inside a function, define it under AdminDashboard
const AdminDashboard = () => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<UserMap>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const currentUserProfile = getCurrentUserProfile()

  useEffect(() => {
    if (Object.keys(users).length === 0) {
      loadUserProfiles();
    }
    // load data    
    fetchUserData();

    // intervals
    setInterval(checkForMessages, 1000);
  }, []);

  // chat functions
  const checkForMessages = () => {
    // Check if there is a message for the student
    const message = window.localStorage.getItem(`messageFor_${currentUserProfile.id}`);

    if (message) {
      const messageType = message.startsWith("admin:") ? "admin-message" : "student-message";

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now(), // timestamp
          type: messageType,
          text: message,
        },
      ]);

      console.log('checkForMessages', message)

      // Clear the message from local storage
      window.localStorage.removeItem(`messageFor_${currentUserProfile.id}`);
    }
  };

  async function fetchUserData() {
    try {
      const response = await fetch('/csv/users.csv');
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
          if (users[typedFormData.id]) {
            const data = {
              id: users[typedFormData.id].id,
            };
            window.localStorage.setItem('admin-data', JSON.stringify(data));
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

    const adminDataJSON = window.localStorage.getItem('admin-data');
    if (!adminDataJSON) {
      console.log('Admin data not found.'); // Debug log
      return;
    }

    const adminData = JSON.parse(adminDataJSON);

    if (!adminData || !adminData.id) {
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
    userMessage.innerHTML = `<p>(admin)   ${currentUserProfile.name}: ${userInput}</p>`; // Include student name
    if (chatBox) {
      chatBox.appendChild(userMessage);
    }

    // Send the message to the given user id
    window.localStorage.setItem(`messageFor_${adminData.id}`, `(admin)   ${currentUserProfile.name}: ${userInput}`); // Include student name

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

  const handleEditButtonClick = (userId: string) => {
    handleEditAndUpdate(userId);
  };

  function handleEditAndUpdate(userId: string): void {
    console.log(`handle update2`);

    const idCell = document.querySelector(`#user-id-${userId}`) as HTMLElement | null;
    const nameCell = document.querySelector(`#user-name-${userId}`) as HTMLElement | null;
    const roleCell = document.querySelector(`#user-role-${userId}`) as HTMLElement | null;
    const emailCell = document.querySelector(`#user-email-${userId}`) as HTMLElement | null;
    const buttonCell = document.querySelector(`#button-${userId}`) as HTMLElement | null;

    console.log(`handle update `);

    if (!buttonCell) {
      console.error(`Button with ID "button-${userId}" not found.`);
      return;
    }


    if (buttonCell.textContent === 'Save') {
      console.log(`handle update 271`);
      // Save action here (you can implement your save logic)
      // Validate fields here (e.g., check if inputs are not empty)
      const nameInput = nameCell?.querySelector('input') as HTMLInputElement;
      const roleSelect = roleCell?.querySelector('select') as HTMLSelectElement;
      const emailInput = emailCell?.querySelector('input') as HTMLInputElement;

      if (!nameInput || !roleSelect || !emailInput) {
        console.error(`Input fields not found for user row with ID ${userId}.`);
        console.log(`handle update 280`);
        return;
      }

      const newName = nameInput.value.trim();
      const newRole = roleSelect.value.trim();
      const newEmail = emailInput.value.trim();

      if (!newName || !newRole || !newEmail) {
        alert('All fields are mandatory.');
        return;
      }

      // Replace input fields with new values using optional chaining
      nameCell?.replaceChildren(newName);
      roleCell?.replaceChildren(newRole);
      emailCell?.replaceChildren(newEmail);

      // Switch back to "Edit" mode
      buttonCell.textContent = 'Edit';
    } else {
      // Edit action here
      if (idCell && nameCell && roleCell && emailCell) {
        // Create input fields for editing
        console.log(`handle update 304`);
        const editNameInput = document.createElement('input');
        editNameInput.type = 'text';
        editNameInput.value = nameCell.textContent || '';

        const editEmailInput = document.createElement('input');
        editEmailInput.type = 'text';
        editEmailInput.value = emailCell.textContent || '';

        const editRoleInput = document.createElement('select');
        editRoleInput.id = `editRole-${userId}`;
        const roles = ['student', 'instructor', 'qa', 'coordinator', 'admin'];
        roles.forEach((role) => {
          const option = document.createElement('option');
          option.value = role;
          option.textContent = role;
          editRoleInput.appendChild(option);
        });
        editRoleInput.value = roleCell.textContent || '';

        // Remove the current content and replace it with inputs
        nameCell.innerHTML = '';
        roleCell.innerHTML = '';
        emailCell.innerHTML = '';

        nameCell.appendChild(editNameInput);
        roleCell.appendChild(editRoleInput);
        emailCell.appendChild(editEmailInput);
        console.log(`handle update 332`);

        // Switch to "Save" mode
        buttonCell.textContent = 'Save';
      } else {
        console.error(`User row with ID ${userId} not found.`);
      }
    }
  }

  // Attach event listeners to edit buttons
  useEffect(() => {
    const editButtons = document.querySelectorAll('.edit-button');

    editButtons.forEach(function (button) {
      console.log(button.id);
      if (!button.hasAttribute('click-listener')) {
        console.log(button.id);
        button.addEventListener('click', function (this: HTMLButtonElement) {
          const userId = this.getAttribute('data-id') ?? 'undefined';
          console.log(`Clicked button with data-id: ${userId}`);
          handleEditAndUpdate(userId);
          this.setAttribute('click-listener', 'T');
        });
      }
    });
  }, [handleEditAndUpdate]);

  function loadUserProfiles(): void {

    try {
      setLoading(true);
      // Read the CSV file
      const filePath = '/csv/users.csv';

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

  return (
    <div className="container">
      <Header />

      <div className="container">
        <div className="dashboard-container">
          <span id="adminName">{/* Your admin name here */}</span>          
          <a className="admin-1l-button" onClick={() => {navigate('/telemetry')}}>
            TELEMETRY
          </a>

          <a  className="admin-1l-button" onClick={() => {navigate('/operations')}}>
            OPERATIONS
          </a>

          <a className="admin-1l-button" onClick={() => alert('Coming soon!')}>
            TICKETING
          </a>
        </div>

        <hr />

        <div className="dashboard-instructor-y-container">
          <div className="dashboard-instructor-container">
            <div className="instructor-2l-container">
              <div className="instructor-2l-action-item">Quick Actions</div>
              <div>
                <div className="instructor-2l-action-item">
              
                  <button className="instructor-3l-action" onClick={() => {navigate('/student-dashboard')}}>
                    View student dashboard
                  </button>
                </div>
                <div className="instructor-2l-action-item">
                  <button className="instructor-3l-action" onClick={() => {navigate('/instructor-dashboard')}}>
                    View instructor dashboard
                  </button>
                </div>
                <div className="instructor-2l-action-item">
                  <button className="instructor-3l-action" onClick={() => {navigate('/coordinator-dashboard')}}>
                    View coordinator dashboard
                  </button>
                </div>
                <div className="instructor-2l-action-item">
                  <button className="instructor-3l-action" onClick={() => {navigate('/qa-dashboard')}}>
                    View qa dashboard
                  </button>
                </div>
              </div>
            </div>

            <div className="instructor-2l-container">
              <div className="chat-container">
                <button className="chat-button" onClick={startChatWithUser}>Start Chat</button>
                <div className="chat-box">
                  <div id="studentMessages"></div>
                  <div id="adminMessages"></div>
                </div>
                <div id="chatInterface" className="chat-input-container admin-chat-container" style={{ display: 'none' }}>
                  <input type="text" id="userInput" className="chat-input" placeholder="Type your message here..." onKeyDown={handleKeyDown} />
                  <button className="chat-button" onClick={sendMessage}>Chat</button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="admin-2l-container">
              <div id="user-profile-section">
                <h2>Manage User Profiles</h2>
                <table id="user-profile-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody id="user-profile-table-body">
                    {/* User profiles will be inserted here */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;


