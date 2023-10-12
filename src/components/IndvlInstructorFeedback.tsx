import React, { useEffect, useState } from 'react';
import { PieChart } from './chart'; // Import the PieChart component
import { Footer, Header } from './HeaderFooter';
import { useSearchParams } from 'react-router-dom';
import { getSentiment as invokeGetSentimentAPI } from '../services/openai';

// Define the FeedbackData type based on your CSV structure
type FeedbackData = {
  studentEmail: string;
  instructorEmail: string;
  feedbackText: string;
};

// ...
// Define the colors for positive, neutral, and negative sentiments
const positiveColor = '#32CD32'; // Lime green for positive
const neutralColor = '#D3D3D3'; // Light gray for neutral
const negativeColor = '#FF6347'; // Tomato red for negative

// ...

const FeedbackPieChartViewer: React.FC = () => {
  const [feedbackData, setFeedbackData] = useState<Array<FeedbackData>>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchParams] = useSearchParams();
  const label = searchParams.get('label');

  const [distribution, setDistribution] = useState<{ Positive: number; Negative: number; Neutral: number }>({
    Positive: 0,
    Negative: 0,
    Neutral: 0,
  });
  const [showPieChart, setShowPieChart] = useState(true);

  useEffect(() => {
    // Fetch student feedback data from a CSV file
    fetch(process.env.PUBLIC_URL + '/csv/feedbackToInstructor.csv') // Adjust the file path as needed
      .then((response) => response.text())
      .then((data) => {
        const rows = data.split('\n').slice(1);
        const parsedFeedback = rows.map((row) => {
          const [studentEmail, instructorEmail, feedbackText] = row.split(',');
          return { studentEmail, instructorEmail, feedbackText };
        });

        console.log('label:', label);
        const filteredFeedback = parsedFeedback.filter((feedback) => feedback.instructorEmail === label);

        // Create an array of promises for API calls
        const sentimentPromises = filteredFeedback.map((feedback) => {
          return invokeGetSentimentAPI(feedback.feedbackText);
        });

        // Wait for all API calls to complete
        Promise.all(sentimentPromises)
          .then((responses) => {
            // Aggregate sentiment counts
            const newDistribution = { Positive: 0, Negative: 0, Neutral: 0 };
            responses.forEach((response) => {
              newDistribution[response]++;
            });
            setDistribution(newDistribution);
          })
          .catch((error) => {
            console.error('Error fetching sentiment data:', error);
          });

        setFeedbackData(filteredFeedback);
      });
  }, [label]);

  return (
    <div className="App">
      <Header />
          
      <input
          type="text"
          placeholder="Search feedback..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="feedback-search-bar"
        />

      
        {/* Display the PieChart component with the distribution data when showPieChart is true */}
        {showPieChart && (
          <div className="pie-chart-container">
            <PieChart
              chartData={{
                labels: [
                  `Positive :${distribution.Positive}`,
                  `Negative :${distribution.Negative}`,
                  `Neutral :${distribution.Neutral}`
                ],
                datasets: [
                  {
                    data: [distribution.Positive, distribution.Negative, distribution.Neutral],
                    backgroundColor: [positiveColor, negativeColor, neutralColor], // Assign the colors

                  },
                ],
              }}
              title={`Semantic Analysis of Student Feedback for Instructor Email ID:${label}`}
              header=""
            />
            
          </div>
        )}
      

      <div className="instructor-2l-container" id="feedback-viewer-logs-container">
        

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
