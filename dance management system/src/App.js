import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Instructors from './pages/Instructors';
import Timetable from './pages/Timetable';
import Fees from './pages/Fees';
import Login from './pages/Login';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import Students from './pages/dashboard/Students';
import InstructorMgmt from './pages/dashboard/InstructorMgmt';
import Schedule from './pages/dashboard/Schedule';
import FeeMgmt from './pages/dashboard/FeeMgmt';
import Attendance from './pages/dashboard/Attendance';

function ProtectedLayout({ isLoggedIn, setIsLoggedIn, children }) {
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      {children}
    </>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Login is the default entry point */}
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login setIsLoggedIn={setIsLoggedIn} />} />

        {/* All pages protected — require login */}
        <Route path="/" element={<ProtectedLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><Home /></ProtectedLayout>} />
        <Route path="/about" element={<ProtectedLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><About /></ProtectedLayout>} />
        <Route path="/courses" element={<ProtectedLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><Courses /></ProtectedLayout>} />
        <Route path="/instructors" element={<ProtectedLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><Instructors /></ProtectedLayout>} />
        <Route path="/timetable" element={<ProtectedLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><Timetable /></ProtectedLayout>} />
        <Route path="/fees" element={<ProtectedLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><Fees /></ProtectedLayout>} />

        {/* Dashboard — also protected */}
        <Route path="/dashboard" element={isLoggedIn ? <DashboardLayout setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" replace />}>
          <Route index element={<Students />} />
          <Route path="students" element={<Students />} />
          <Route path="instructors" element={<InstructorMgmt />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="fees" element={<FeeMgmt />} />
          <Route path="attendance" element={<Attendance />} />
        </Route>

        {/* Catch all unknown routes → login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
