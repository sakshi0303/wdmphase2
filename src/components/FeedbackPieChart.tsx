import React, { useEffect, useState } from 'react';
import { PieChart, BarChart } from './chart'; // Import the BarChart and PieChart components
import { Footer, Header } from './HeaderFooter';
import { useSearchParams } from 'react-router-dom';

// Define the FeedbackData type based on your CSV structure
type FeedbackData = {
  studentEmail: string;
  instructorEmail: string;
  feedbackText: string;
};

const FeedbackPieChartViewer: React.FC = () => {
  const [feedbackData, setFeedbackData] = useState<Array<FeedbackData>>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  // Access the 'label' parameter from the URL using useParams
  const [searchParams] = useSearchParams();
  const label = searchParams.get('label');

  const [distribution, setDistribution] = useState<{ Positive: number; Negative: number; Neutral: number }>({
    Positive: 0,
    Negative: 0,
    Neutral: 0,
  });
  const [instructorScores, setInstructorScores] = useState<{ [key: string]: number }>({});
  const [showPieChart, setShowPieChart] = useState(true);
  const [selectedInstructorEmail, setSelectedInstructorEmail] = useState<string | null>(null);

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

  // Map random values to labels
  function mapRandomValueToLabel(value: number): 'Positive' | 'Negative' | 'Neutral' {
    switch (value) {
      case 0:
        return 'Positive';
      case 1:
        return 'Negative';
      case 2:
        return 'Neutral';
      default:
        return 'Neutral';
    }
  }

  // Handle clicking on a bar in the bar chart
  useEffect(() => {
    // Fetch student feedback data from a CSV file
    fetch('/csv/feedbackToInstructor.csv') // Adjust the file path as needed
      .then((response) => response.text())
      .then((data) => {
        const rows = data.split('\n').slice(1);
        const parsedFeedback = rows.map((row) => {
          const [studentEmail, instructorEmail, feedbackText] = row.split(',');
          return { studentEmail, instructorEmail, feedbackText };
        });
        console.log('label:', label);
        const filteredFeedback = parsedFeedback.filter((feedback) => feedback.instructorEmail === label);

        // Calculate the distribution of random values and update the state
        const newDistribution = { Positive: 0, Negative: 0, Neutral: 0 };
        filteredFeedback.forEach(() => {
          // TODO: call open AI
          const randomValue = Math.floor(Math.random() * 3); // Random value 0, 1, or 2
          const mappedLabel = mapRandomValueToLabel(randomValue);
          newDistribution[mappedLabel]++;
        });
        setDistribution(newDistribution);

        // Generate random scores for instructors and update the state
        const instructorEmails = filteredFeedback.map((feedback) => feedback.instructorEmail);
        const uniqueInstructorEmails = getUniqueValues(instructorEmails);
        const instructorScoreData: { [key: string]: number } = {};

        uniqueInstructorEmails.forEach((email) => {
          const randomScore = Math.floor(Math.random() * 101); // Random score between 0 and 100
          instructorScoreData[email] = randomScore;
        });

        setInstructorScores(instructorScoreData);

        setFeedbackData(filteredFeedback);
      });
  }, []);

  return (
    <div className="App">
      <Header />

      <div style={{ overflow: 'auto' }}>
        {/* Display the PieChart component with the distribution data when showPieChart is true */}
        {showPieChart && (
          <PieChart
            chartData={{
              labels: ['Positive', 'Negative', 'Neutral'],
              datasets: [
                {
                  data: [distribution.Positive, distribution.Negative, distribution.Neutral],
                  backgroundColor: ['#FF5733', '#33FF57', '#5733FF'], // Define colors as needed
                },
              ],
            }}
            title="Pie Chart"
            header="Sentiment analysis distribution"
          />
        )}
      </div>

      <div className="instructor-2l-container" id="feedback-viewer-logs-container">
        <input
          type="text"
          placeholder="Search feedback..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="feedback-search-bar"
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
              .filter((feedback) =>
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

export default FeedbackPieChartViewer;
