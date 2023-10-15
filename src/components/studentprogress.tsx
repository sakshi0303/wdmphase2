/*  
    Author: Sakshi
    UTA ID: 1001993702
    Email: sx3702@mavs.uta.edu
    Group number: 1, WDM assignment, Assignment 3
    Date: October 14, 2023
    Description: studentprogress
*/
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import '../assets/css/styles.css';
import { Header, Footer } from './HeaderFooter';
import { StudentData, ChartDataType } from '../types/types';
import { LineChart } from './chart';


const StudentProgress: React.FC = () => {
    const [chartData, setChartData] = useState<ChartDataType | null>(null);
    const [studentData, setStudentData] = useState<StudentData[] | null>(null);

    useEffect(() => {
        loadStudentGraph();
        // If you want to reintroduce the checkAuthorized function or any other timed function, uncomment and modify this interval.
        // const interval = setInterval(() => checkAuthorized(allowedRoles), 60000);
        // return () => clearInterval(interval);
    }, []);

    const loadStudentGraph = () => {
        
        Papa.parse(process.env.PUBLIC_URL + '/csv/students.csv', {
            download: true,
            header: true,
            dynamicTyping: true,
            complete: function (results) {
                const parsedData = results.data as StudentData[];
                setStudentData(parsedData);

                const data: ChartDataType = {
                    labels: parsedData.map(row => row.Student_Name),
                    datasets: [{
                        data: parsedData.map(row => row.Current_Grade),
                        borderColor: ['rgba(75, 192, 192, 1)'],
                        backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                        borderWidth: 1
                    }]
                };

                setChartData(data);
            }
        });
    };

    return (
        <div >
            <Header />
            {chartData && <LineChart chartData={chartData} title="Student Grades" header="Grade Analysis" />}
            {/* Render the table */}
            <div className="instructor-2l-container" id="student-list-container">

                <table className='csv-table'>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Email</th>
                            <th>Course</th>
                            <th>Course Name</th>
                            <th>Current Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentData && studentData.map((student, index) => (
                            <tr key={index}>
                                <td>{student.Student_Name}</td>
                                <td>{student.Email}</td>
                                <td>{student.Course}</td>
                                <td>{student.Course_Name}</td>
                                <td>{student.Current_Grade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
};

export default StudentProgress;
