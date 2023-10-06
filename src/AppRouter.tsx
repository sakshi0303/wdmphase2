import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update the import
import AdminDashboard from './components/admin_dashboard';
import StudentDashboard from './components/student_dashboard';
import InstructorDashboard from './components/instructor_dashboard';
import CoordinatorDashboard from './components/coordinator_dashboard';
import QADashboard from './components/qa_dashboard';
import Telemetry from './components/telemetry';
import Operations from './components/Operations';
import Login from './components/Login';
import AboutUs from './components/aboutus';
import Team from './components/team';
import SignUp from './components/signup';
import HomePage from './components/HomePage';
import ForgotPassword from './components/ForgotPassword';
import StudentProgress from './components/studentprogress';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/telemetry" element={<Telemetry />} />        
        <Route path="/coordinator-dashboard" element={<CoordinatorDashboard />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard/>} />
        <Route path="/qa-dashboard" element={<QADashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/coordinator-dashboard" element={<CoordinatorDashboard />} />
        <Route path="/operations" element={<Operations />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/team" element={<Team />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/ForgotPassword" element={<ForgotPassword/>} />
        <Route path="/studentprogress" element={<StudentProgress/>} />
        {/* Add more routes for other pages as needed */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
