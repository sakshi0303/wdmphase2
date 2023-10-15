/*  
    Author: Sakshi
    UTA ID: 1001993702
    Email: sx3702@mavs.uta.edu
    Group number: 1, WDM assignment, Assignment 3
    Date: October 14, 2023
    Description: feeback report 
    
*/
import React, { useEffect, useState } from 'react';
import { BarChart } from './chart'; // Import the BarChart and PieChart components
import { Footer, Header } from './HeaderFooter';
import { useNavigate } from 'react-router-dom';
import '../assets/css/styles.css';

// Define the FeedbackData type based on your CSV structure
type FeedbackData = {
  studentEmail: string;
  instructorEmail: string;
  feedbackText: string;
};

const barColors = [
  '#add8e6', // Light blue
  '#a0d6b4', // Pale green
  '#e4bad4', // Soft lavender
  '#e3eaa7', // Pastel lime
  // Add more colors as needed
];

const FeedbackViewer: React.FC = () => {
  const [feedbackData, setFeedbackData] = useState<Array<FeedbackData>>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [instructorScores, setInstructorScores] = useState<{ [key: string]: number }>({});
  const navigate = useNavigate();

  // Define a function to filter unique values in an array
  function getUniqueValues<T>(arr: T[]): T[] {
    const uniqueValues: T[] = [];
    for (const value of arr) {
      if (!uniqueValues.includes(value)) {
        uniqueValues.push(value);
      }
    }
    return uniqueValues;
  }

  // Handle clicking on a bar in the bar chart
  const handleBarClick = (label: string) => {
    navigate(`/feedback/pie?label=${label}`);
  };

  useEffect(() => {
    // Fetch student feedback data from a CSV file
    fetch(process.env.PUBLIC_URL + '/csv/feedbackToInstructor.csv') // Adjust the file path as needed
      .then(response => response.text())
      .then(data => {
        const rows = data.split('\n').slice(1);
        const parsedFeedback = rows.map(row => {
          const [studentEmail, instructorEmail, feedbackText] = row.split(',');
          return { studentEmail, instructorEmail, feedbackText };
        });

        // Initialize instructor scores with a default count of 0 for all instructors
        const uniqueInstructorEmails = getUniqueValues(parsedFeedback.map(feedback => feedback.instructorEmail));
        const instructorScores: { [key: string]: number } = {};
        uniqueInstructorEmails.forEach(email => {
          instructorScores[email] = 0;
        });

        // Calculate instructor scores based on the count of feedback
        parsedFeedback.forEach((feedback) => {
          const { instructorEmail } = feedback;
          // Increment the score (feedback count) for the instructor
          instructorScores[instructorEmail]++;
        });

        setInstructorScores(instructorScores);
        setFeedbackData(parsedFeedback);
      });
  }, []);

  return (
    <div className="App">
      <Header />

      <div className="instructor-2l-container" id='feedback-viewer-logs-container'>
        <div>
        <input
          type="text"
          placeholder="Search feedback..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="feedback-search-bar"
        />

        {/* Render the BarChart component with instructor scores */}
        <BarChart
          chartData={{
            labels: Object.keys(instructorScores), // Instructor emails as labels
            datasets: [
              {
                data: Object.values(instructorScores), // Random scores as data
                backgroundColor: barColors.slice(0, Object.keys(instructorScores).length),
              },
            ],
          }}
          title=" "
          header="Semantic Analysis for Evaluating Instructor Performance  "
          onBarClick={handleBarClick} // Pass the click handler to the BarChart component
        />
        </div>
        
        <div>
        <div> '</div>
        <div> '</div>
        <table className="csv-table">
          <thead>
            <tr>
              <th>Student Email</th>
              <th>Instructor Email</th>
              <th>Feedback Text</th>
            </tr>
          </thead>
          <tbody>
            {feedbackData
              .filter(feedback =>
                feedback.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                feedback.instructorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                feedback.feedbackText.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((feedback, index) => (
                <tr key={index}>
                  <td>{feedback.studentEmail}</td>
                  <td>{feedback.instructorEmail}</td>
                  <td>{feedback.feedbackText}</td>
                </tr>
              ))}
          </tbody>
        </table>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default FeedbackViewer;
