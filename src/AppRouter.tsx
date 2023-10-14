/*  
    Author: Sakshi
    UTA ID: 1001993702
    Email: sx3702@mavs.uta.edu
    Group number: 1, WDM assignment, Assignment 3
    Date: October 14, 2023
    Description: 
    
*/
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/admin_dashboard';
import StudentDashboard from './pages/student_dashboard';
import InstructorDashboard from './pages/instructor_dashboard';
import CoordinatorDashboard from './pages/coordinator_dashboard';
import QADashboard from './pages/qa-dashboard';
import Telemetry from './components/telemetry';
import Operations from './components/Operations';
import Login from './pages/Login';
import AboutUs from './components/aboutus';
import Team from './components/team';
import SignUp from './components/signup';
import HomePage from './pages/HomePage';
import ForgotPassword from './components/ForgotPassword';
import StudentProgress from './components/studentprogress';
import FeedbackViewer from './components/FeedbackReport';
import FeedbackPieChartViewer from './components/IndvlInstructorFeedback';
import Error from './components/error';
import ContactUs from './components/contactus';
import LearnMore from './components/learnmore';



const AppRouter = () => {
  return (
    <Router basename="/assignment3">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/telemetry" element={<Telemetry />} />
        <Route path="/coordinator-dashboard" element={<CoordinatorDashboard />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
        <Route path="/qa-dashboard" element={<QADashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/operations" element={<Operations />} />
        <Route path="/feedback" element={<FeedbackViewer />} />
        <Route path="/feedback/pie" element={<FeedbackPieChartViewer />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/team" element={<Team />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/studentprogress" element={<StudentProgress />} />
        <Route path="/error" element={<Error />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/learnmore" element={<LearnMore />} />
     
       
        

        
        {/* Add more routes for other pages as needed */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
