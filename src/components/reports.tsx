import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2'; // Import Bar component
import { ChartData, ChartOptions } from 'chart.js'; // Import ChartData and ChartOptions types
import '../assets/css/qastyles.css';

import { UserData, UserMap } from '../types/types';
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
    const [selectedComponent, setSelectedComponent] = useState('QADashboard');
    const [users, setUsers] = useState<UserMap>({});
    const [chartData, setChartData] = useState<ChartData<'bar'>>({
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

  // auth

  const allowedRoles: string[] = ["coordinator","qa", "admin"];

  useEffect(() => {
    const checkWithRoles = () => {
      const isAuthorized = checkAuthorized(allowedRoles);
      if (!isAuthorized) {
        navigate('/error');
      }
    };

    // load data    
    fetchUserData();
    userProfile(currentUserProfile.name)


    // Load user profiles if necessary (similar to Quality AssuranceDashboard)

    // Load data (similar to Quality AssuranceDashboard)

    // Intervals (similar to Quality AssuranceDashboard)

    
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
    // Define the options object with the correct types
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

    // Define the click event handler
    const handleBarClick = () => {
        console.log('clicked!');
    };

    return (
        <div className="qa-dashboard-container">
           
                <div id="content">
                    <h1>Welcome to Quality Assurance Dashboard - Reports</h1>
                    <div id="reports">
                        <h2>Student Enrollment Statistics</h2>
                        <div className="chartContainer" >
                
                    {/* Render the Bar component */}
                        <Bar
                            data={chartData}
                            options={options}
                        />
                
                        </div>
                        
    
                        <h2>Generate Student Report</h2>
                        <label htmlFor="studentId">Enter Student ID:</label>
                        <input type="text" id="studentId"/>
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
