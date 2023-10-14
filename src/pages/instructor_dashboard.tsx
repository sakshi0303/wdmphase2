
import { useCallback, useEffect, useState } from 'react';
import '../assets/css/styles.css';
import { Header, Footer } from '../components/HeaderFooter';
import { Message, UserData, UserMap } from '../types/types'
import Papa from 'papaparse'; 

import { checkAuthorized, getCurrentUserProfile, userProfile } from '../utils/auth';
import { KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalInfoOverlay from '../components/personalInfo';

const InstructorDashboard = () => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<UserMap>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [examData, setExamData] = useState<string[][]>([]);
  const [isExamOverlayVisible, setIsExamOverlayVisible] = useState(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [utaId, setUtaId] = useState<string>('');
  const [education, setEducation] = useState<string>('');
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [students, setStudents] = useState<string[][]>([]);
  const [isFeedbackOverlayVisible, setIsFeedbackOverlayVisible] = useState(false);
  const [courseData, setCourseData] = useState<string[][]>([]);


  const [feedbacks, setFeedbacks] = useState({});

  const [isPersonalInfoOverlayVisible, setIsPersonalInfoOverlayVisible] = useState(false);

  // Define a function to toggle the visibility of the PersonalInfoOverlay
  const handleTogglePersonalInfoOverlay = () => {
    setIsPersonalInfoOverlayVisible(!isPersonalInfoOverlayVisible);
  };


  const currentUserProfile = getCurrentUserProfile()

  // auth
  const allowedRoles: string[] = ["instructor", "admin"];
  const checkWithRoles = () => {    
    const isAuthorized = checkAuthorized(allowedRoles);
    if (!isAuthorized) {
      navigate('/error')
    }    
  };

  useEffect(() => {
    const examOverlayElement = document.getElementById("create-exam-overlay");
    if (examOverlayElement) {
      examOverlayElement.style.display = isExamOverlayVisible ? "block" : "none";
    }
  }, [isExamOverlayVisible]);

  useEffect(() => {
    async function loadStudents() {
      try {
        const response = await fetch(process.env.PUBLIC_URL + '/csv/students.csv');
        const data = await response.text();
        const rows = data.split('\n');
        const studentsData = rows.map(row => row.split(','));
        setStudents(studentsData);
      } catch (error) {
        console.error('Error reading students CSV file:', error);
      }
    }

    loadStudents();
  }, []);

  useEffect(() => {

    checkWithRoles()

    async function loadData() {
      await loadPersonalInfo();
      await loadAndDisplayExamData();
      await loadAndDisplayCourseData();
      userProfile(currentUserProfile.name);
    }
    loadData();
    userProfile(currentUserProfile.name)

    if (Object.keys(users).length === 0) {
      loadUserProfiles();
    }
    // load data    
    fetchUserData();

    setInterval(checkForMessages, 1000);

    const intervalId = setInterval(checkWithRoles, 1000);
    return () => {
      clearInterval(intervalId);
    };

  }, []);

  const loadAndDisplayExamData = async () => {
    try {
      const response = await fetch(process.env.PUBLIC_URL + '/csv/examlist.csv'); // Update the path
      const data = await response.text();

      // Split CSV data into rows
      const rows = data.split('\n');

      // Extract headers from the first row
      const headers = rows[0].split(',');

      // Create an array to hold the table rows
      const tableRows = [];

      // Iterate through rows (excluding header)
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split(',');
        if (row.length === headers.length) {
          tableRows.push(row);
        }
      }

      // Update the state with the exam data
      setExamData(tableRows);
    } catch (error) {
      console.error('Error reading CSV file:', error);
    }
  };

  const loadAndDisplayCourseData = async () => {
    try {
      const response = await fetch(process.env.PUBLIC_URL + '/csv/courses.csv');
      const data = await response.text();

      // Split CSV data into rows
      const rows = data.split('\n');

      // Extract headers from the first row
      const headers = rows[0].split(',');

      // Create an array to hold the table rows
      const tableRows = [];

      // Iterate through rows (excluding header)
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split(',');
        if (row.length === headers.length) {
          tableRows.push(row);
        }
      }

      // Update the state with the course data
      setCourseData(tableRows);
    } catch (error) {
      console.error('Error reading CSV file:', error);
    }
  };





  const ExamOverlay = ({ onClose }: { onClose: () => void }) => {
    const [examName, setExamName] = useState<string>('');
    const [examDate, setExamDate] = useState<string>('');
    const [examDuration, setExamDuration] = useState<string>('');

    const handleSubmit = () => {
      createExam(examName, examDate, examDuration);
    };

    return (
      <div className="overlay" id="create-exam-overlay" style={{ display: 'block' }}>
        <div className="create-course-form-container">
          <button className="create-course-close-btn" onClick={onClose}>
            &times;
          </button>
          <h2>Create Exam</h2>
          <form className="new-course-form-container" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div className="form-row">
              <div className="form-group">
                <label>Exam Name:</label>
                <input type="text" placeholder="Enter exam name" value={examName} onChange={(e) => setExamName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Date:</label>
                <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Duration:</label>
                <input type="text" placeholder="Enter duration in mins" value={examDuration} onChange={(e) => setExamDuration(e.target.value)} />
              </div>
            </div>

            <input type="submit" value="Create" />
          </form>
        </div>
      </div>
    );
  };


const FeedbackOverlay = ({ onClose }: { onClose: () => void }) => {
  const [feedbacks, setFeedbacks] = useState<{ [key: string]: string }>({});
  const [isFeedbackOverlayVisible, setIsFeedbackOverlayVisible] = useState(true);
  const [students, setStudents] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    // Fetch the students.csv file
    fetch(process.env.PUBLIC_URL + '/csv/students.csv')
      .then((response) => response.text())
      .then((fileText) => {
        const lines = fileText.split('\n').slice(1); // Skip the first line
        const studentData = lines.map((line) => {
          const [name] = line.split(','); // Extract student name
          return { id: name, name };
        });
        setStudents(studentData);
      })
      .catch((error) => {
        console.error('Error fetching or reading the file:', error);
      });
  }, []);

  const handleSubmit = () => {
    // Validate feedback
    for (const key in students) {
      if (!feedbacks[students[key].id] || feedbacks[students[key].id].trim() === '') {
        alert('All feedback fields are mandatory.');
        return;
      }
    }
    alert('Your feedback is sent to admin for review.');

    setIsFeedbackOverlayVisible(false);
    onClose();
  };

  return (
    <div className="overlay" id="create-feedback-overlay" style={{ display: isFeedbackOverlayVisible ? 'block' : 'none' }}>
      <div className="create-feedback-form-container">
        <button className="create-feedback-close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Feedback to Students</h2>
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>
                  <input
                    type="text"
                    value={feedbacks[student.id] || ''}
                    onChange={(e) => setFeedbacks({ ...feedbacks, [student.id]: e.target.value })}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleSubmit}>Submit Feedback</button>
      </div>
    </div>
  );
};

  
  

  




  async function loadCourseListAndDisplay(): Promise<void> {
    try {
      const response = await fetch('assets/reports/csv/courses.csv');
      const data = await response.text();

      const rows = data.split('\n');

      const table: HTMLTableElement = document.createElement('table');
      table.className = 'csv-table';

      const headers = rows[0].split(',');
      const headerRow: HTMLTableRowElement = document.createElement('tr');

      headers.forEach(header => {
        const headerCell: HTMLTableHeaderCellElement = document.createElement('th');
        headerCell.textContent = header;
        headerRow.appendChild(headerCell);
      });

      table.appendChild(headerRow);

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split(',');
        if (row.length === headers.length) {
          const dataRow: HTMLTableRowElement = document.createElement('tr');

          row.forEach((value, j) => { // <-- Note the added j here
            const dataCell: HTMLTableCellElement = document.createElement('td');
            if (j === 2 && !currentUserProfile.role.includes('admin')) {
              dataCell.textContent = currentUserProfile.name;
            } else {
              dataCell.textContent = value;
            }
            dataRow.appendChild(dataCell);
          });

          dataRow.classList.add('data-row');
          table.appendChild(dataRow);
        }
      }

      const container = document.getElementById('course-list-container');
      if (container) {
        container.innerHTML = ''; // Clear any previous content
        container.appendChild(table);
      }
    } catch (error) {
      console.error('Error reading CSV file:', error);
    }
  }

  async function loadPersonalInfo(): Promise<void> {
    const filePath: string = 'assets/reports/instructor.txt';
    const response: Response = await fetch(filePath);
    const data: string = await response.text();
    const lines: string[] = data.split('\n');

    const info: Record<string, string> = {};
    lines.forEach(line => {
      if (line.includes(':')) {
        const [key, value] = line.split(':');
        info[key.trim()] = value.trim();
      }
    });

    setName(info['Name'] || '');
    setEmail(info['Email'] || '');
    setUtaId(info['UtaId'] || '');
    setEducation(info['Education'] || '');

    window.localStorage.setItem('instructorName', info['Name'] || '');
  }

  


  const CourseCreationOverlay = ({ onClose }: { onClose: () => void }) => {
    const [courseName, setCourseName] = useState<string>('');
    const [courseCategory, setCourseCategory] = useState<string>('');
    const [courseDuration, setCourseDuration] = useState<string>('');
    const [courseLevel, setCourseLevel] = useState<string>('');

    const handleSubmit = () => {
      // Perform validation here
      if (!courseName || !courseCategory || !courseDuration || !courseLevel) {
        alert('Please fill out all required fields.');
        return; // Prevent form submission if validation fails
      }

      // Check if courseDuration is numeric
      if (!/^\d+$/.test(courseDuration)) {
        alert('Duration must be a numeric value.');
        return; // Prevent form submission if duration is not numeric
      }

      // Check if courseCategory is one of the allowed values
      const allowedCategories = ['Programming', 'Advance DBMS', 'Machine Learning', 'Parallel Processing'];
      if (!allowedCategories.includes(courseCategory)) {
        alert('Invalid category selected.');
        return; // Prevent form submission if category is not valid
      }


      // If validation passes, you can submit the form
      alert('Course is created successfully and is under admin review..');
      // Add your form submission logic here

      // Reset form fields (optional)
      setCourseName('');
      setCourseCategory('');
      setCourseDuration('');
      setCourseLevel('');

      // Close the overlay
      onClose();
    };

    return (
      <div className="overlay" id="create-course-overlay" style={{ display: 'block' }}>
        <div className="create-course-form-container">
          <button className="create-course-close-btn" onClick={onClose}>
            &times;
          </button>
          <h2>Create Course</h2>
          <form className="new-course-form-container" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div className="form-row">
              <div className="form-group">
                <label>Course Name:</label>
                <input type="text" placeholder="Enter course name" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Category:</label>
                <select value={courseCategory} onChange={(e) => setCourseCategory(e.target.value)}>
                  <option value="">Select category</option>
                  <option value="Programming">Programming</option>
                  <option value="Advance DBMS">Advance DBMS</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Parallel Processing">Parallel Processing</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Duration in mins:</label>
                <input type="text" placeholder="Enter duration (e.g., 2 months)" value={courseDuration} onChange={(e) => setCourseDuration(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Level:</label>
                <select value={courseLevel} onChange={(e) => setCourseLevel(e.target.value)}>
                  <option value="">Select level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <input type="submit" value="Create" />
          </form>
        </div>
      </div>
    );
  };





  const createExam = (examName: string, examDate: string, examDuration: string): void => {
    if (!examName || !examDate || !examDuration) {
      alert("Please fill out all required fields.");
      return;
    }
    
    if (!isNumeric(examDuration)) {
        alert('Exam duration must be in mins.');
        return;
    }

    alert("Exam is created successfully and is under admin review.");
    setIsExamOverlayVisible(false);
};

const isNumeric = (value: string): boolean => {
  return !isNaN(Number(value));
};



  // chat functions
  const checkForMessages = () => {
    // Check if there is a message for the student
    const message = window.localStorage.getItem(`messageFor_${currentUserProfile.id}`);

    if (message) {
      const messageType = message.startsWith("instructor:") ? "instructor-message" : "student-message";

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
          console.log('instructor', formData)
          console.log(JSON.stringify(users))
          if (users[typedFormData.id]) {
            const data = {
              id: users[typedFormData.id].id,
            };
            window.localStorage.setItem('instructor-data', JSON.stringify(data));
            // Show the chat input container
            const chatInputContainer = document.querySelector('.chat-input-container') as HTMLElement | null;
            if (chatInputContainer) {
              chatInputContainer.style.display = 'block';
            } else {
              console.error('Chat input container not found.');
            }
          } else {
            alert("Incorrect Email ID.");
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

    const instructorDataJSON = window.localStorage.getItem('instructor-data');
    if (!instructorDataJSON) {
      console.log('instructor data not found.'); // Debug log
      return;
    }

    const instructorData = JSON.parse(instructorDataJSON);

    if (!instructorData || !instructorData.id) {
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
    userMessage.innerHTML = `<p>(instructor)   ${currentUserProfile.name}: ${userInput}</p>`; // Include student name
    if (chatBox) {
      chatBox.appendChild(userMessage);
    }

    // Send the message to the given user id
    window.localStorage.setItem(`messageFor_${instructorData.id}`, `(instructor)   ${currentUserProfile.name}: ${userInput}`); // Include student name

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

  return (
    <div className="container">
      <Header />

      <div className="container">
        <div className="dashboard-container">
          <span id="instructorName">{/* Your instructor name here */}</span>

          <a className="instructor-1l-button" onClick={() => setIsExamOverlayVisible(true)}>CREATE EXAM</a>
          {isExamOverlayVisible && <ExamOverlay onClose={() => setIsExamOverlayVisible(false)} />}

          <a className="instructor-1l-button" onClick={() => navigate('/studentprogress')}>STUDENT PROGRESS</a>

          <a className="instructor-1l-button" onClick={() => setIsCreatingCourse(true)}>CREATE COURSE</a>
          {isCreatingCourse && <CourseCreationOverlay onClose={() => setIsCreatingCourse(false)} />}

          <a className="instructor-1l-button" onClick={() => setIsFeedbackOverlayVisible(true)}>
            FEEDBACK TO STUDENTS
          </a>
          {isFeedbackOverlayVisible && <FeedbackOverlay onClose={() => setIsFeedbackOverlayVisible(false)} />}
        </div>

        <hr />

        <div className="dashboard-instructor-y-container">
          <div className="dashboard-instructor-container">
            <div className="instructor-2l-container">
              <div className="instructor-2l-action-item">Quick Actions</div>
              <div>
                <div className="instructor-2l-action-item">
                  <button onClick={handleTogglePersonalInfoOverlay} className="instructor-3l-action">Update Personal Info</button>
                </div>
                <div className="instructor-2l-action-item">
                  <button className="instructor-3l-action">Announcement</button>
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

            <div className="instructor-2l-container">
              <div className="chat-container">
                <button className="chat-button" onClick={startChatWithUser}>Start Chat</button>
                <div className="chat-box">
                  <div id="studentMessages"></div>
                  <div id="instructorMessages"></div>
                </div>
                <div id="chatInterface" className="chat-input-container instructor-chat-container" style={{ display: 'none' }}>
                  <input type="text" id="userInput" className="chat-input" placeholder="Type your message here..." onKeyDown={handleKeyDown} />
                  <button className="chat-button" onClick={sendMessage}>Chat</button>
                </div>
              </div>
            </div>
          </div>

          <div>

            <div className="instructor-2l-container">
              <div id="exam-list-container">
                <h2>Exam View</h2>
                <table id="user-profile-table">
                  <thead>
                    <tr>
                      <th>InstructorID</th>
                      <th>InstructorEmail</th>
                      <th>ExamID</th>
                      <th>ExamName</th>
                      <th>ExamDate</th>
                      <th>ExamDuration(mins)</th>
                      <th>DeptNo</th>
                    </tr>
                  </thead>
                  <tbody id="exam-view-table-body">
                    {examData.map((row, index) => (
                      <tr key={index}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            </div>
            <div>

            <div className="instructor-2l-container">
              <div id="exam-list-container">
                <h2>Course View</h2>
                <table id="user-profile-table" className="csv-table">
                  <thead>
                    <tr>
                      <th>Course Code</th>
                      <th>Course Name</th>
                      <th>Instructor</th>
                    </tr>
                  </thead>
                  <tbody id="exam-view-table-body">
                    {courseData.map((row, index) => (
                      <tr key={index}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    ))}
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

export default InstructorDashboard;
