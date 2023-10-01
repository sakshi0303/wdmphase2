import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update the import
import AdminDashboard from './components/admin_dashboard';
import StudentDashboard from './components/student_dashboard';
import InstructorDashboard from './components/instructor_dashboard';
import CoordinatorDashboard from './components/coordinator_dashboard';
import QADashboard from './components/qa_dashboard';
import Telemetry from './components/telemetry';

import Login from './components/Login';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/telemetry" element={<Telemetry />} />        
        <Route path="/coordinator-dashboard" element={<CoordinatorDashboard />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard/>} />
        <Route path="/qa-dashboard" element={<QADashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/coordinator-dashboard" element={<CoordinatorDashboard />} />
        {/* Add more routes for other pages as needed */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
