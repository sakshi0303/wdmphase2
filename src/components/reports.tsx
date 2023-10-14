import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2'; // Import Bar component
import { ChartData, ChartOptions } from 'chart.js'; // Import ChartData and ChartOptions types
import '../assets/css/qastyles.css';


import { checkAuthorized, getCurrentUserProfile, userProfile } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const barColors = [
  '#add8e6', // Light blue
  '#a0d6b4', // Pale green
  '#e4bad4', // Soft lavender
  '#e3eaa7', // Pastel lime
  '#a0d6b4', // Pale green
  '#e4bad4', // Soft lavender
  '#e3eaa7', // Pastel lime
];

const ReportsComponent = () => {
  const [chartData] = useState<ChartData<'bar'>>({
    labels: ['Course A', 'Course B', 'Course C', 'Course D', 'Course E'],
    datasets: [
      {
        data: [45, 32, 28, 50, 38],
        backgroundColor: barColors.slice(0, 5),
      },
    ],
  });

  const navigate = useNavigate();

  const currentUserProfile = getCurrentUserProfile();

  useEffect(() => {
    // Define the roles that are allowed to access this component
    const allowedRoles: string[] = ["coordinator", "qa", "admin"];

    // Function to check if the current user is authorized
    const checkWithRoles = () => {
      const isAuthorized = checkAuthorized(allowedRoles);
      if (!isAuthorized) {
        // Redirect to an error page if not authorized
        navigate('/error');
      }
    };

    // Load user profile for the current user
    userProfile(currentUserProfile.name);

    // You can add additional data loading or interval logic here

    // Set up an interval to check user authorization periodically
    const intervalId = setInterval(checkWithRoles, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [navigate, currentUserProfile.name]);

  // Define the options object for the Bar chart
  const options: ChartOptions<'bar'> = {
    plugins: {
      title: {
        display: true,
        text: 'Users Gained between 2016-2020',
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        ticks: {
          stepSize: 10,
          precision: 0,
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 1,
        backgroundColor: (context) => {
          const chart = context.chart;
          const ctx = chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
          gradient.addColorStop(0, 'rgba(75, 192, 192, 0.6)');
          gradient.addColorStop(1, 'rgba(75, 192, 192, 0.05)');
          return gradient;
        },
      },
    },
    animation: {
      duration: 3,
      easing: 'easeInOutCubic',
    },
    interaction: {
      intersect: false,
      mode: 'nearest',
    },
  };

  return (
    <div className="qa-dashboard-container">
      <div id="content">
        <h1>Welcome to Quality Assurance Dashboard - Reports</h1>
        <div id="reports">
          <h2>Student Enrollment Statistics</h2>
          <div className="chartContainer">
            {/* Render the Bar component */}
            <Bar
              data={chartData}
              options={options}
            />
          </div>

          <h2>Generate Student Report</h2>
          <label htmlFor="studentId">Enter Student ID:</label>
          <input type="text" id="studentId" />
          <button id="generateButton">Generate</button>

          <div id="studentReport">
            <h3>Student Report</h3>
            <p>Student report data will be displayed here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsComponent;
