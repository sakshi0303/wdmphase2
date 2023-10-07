import React, { useEffect, useState } from 'react';
import { PieChart, BarChart } from './chart'; // Import the BarChart and PieChart components
import { Footer, Header } from './HeaderFooter';
import { useNavigate } from 'react-router-dom';

// Define the FeedbackData type based on your CSV structure
type FeedbackData = {
  studentEmail: string;
  instructorEmail: string;
  feedbackText: string;
};

const FeedbackViewer: React.FC = () => {
  const [feedbackData, setFeedbackData] = useState<Array<FeedbackData>>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [distribution, setDistribution] = useState<{ A: number; B: number; C: number }>({ A: 0, B: 0, C: 0 });
  const [instructorScores, setInstructorScores] = useState<{ [key: string]: number }>({});
  const [showPieChart, setShowPieChart] = useState(false);
  const [selectedInstructorEmail, setSelectedInstructorEmail] = useState<string | null>(null);
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
    fetch('/csv/feedbackToInstructor.csv') // Adjust the file path as needed
      .then(response => response.text())
      .then(data => {
        const rows = data.split('\n').slice(1);
        const parsedFeedback = rows.map(row => {
          const [studentEmail, instructorEmail, feedbackText] = row.split(',');
          return { studentEmail, instructorEmail, feedbackText };
        });

        // Calculate the distribution of random values and update the state
        const newDistribution = { A: 0, B: 0, C: 0 };
        parsedFeedback.forEach(() => {
          const randomValue = Math.floor(Math.random() * 3); // Random value 0, 1, or 2
          if (randomValue === 0) newDistribution.A++;
          else if (randomValue === 1) newDistribution.B++;
          else if (randomValue === 2) newDistribution.C++;
        });
        setDistribution(newDistribution);

        // Generate random scores for instructors and update the state
        const instructorEmails = parsedFeedback.map(feedback => feedback.instructorEmail);
        const uniqueInstructorEmails = getUniqueValues(instructorEmails);
        const instructorScoreData: { [key: string]: number } = {};

        uniqueInstructorEmails.forEach(email => {
          const randomScore = Math.floor(Math.random() * 101); // Random score between 0 and 100
          instructorScoreData[email] = randomScore;
        });

        setInstructorScores(instructorScoreData);

        setFeedbackData(parsedFeedback);
      });
  }, []);

  return (
    <div className="App">
      <Header />

      <div className="instructor-2l-container" id='feedback-viewer-logs-container'>
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
                backgroundColor: '#4287f5', // Define bar color as needed
              },
            ],
          }}
          title="Instructor Scores"
          header="Instructor Scores Distribution"
          onBarClick={handleBarClick} // Pass the click handler to the BarChart component
        />

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
        <Footer />
      </div>
    </div>
  );
};

export default FeedbackViewer;
