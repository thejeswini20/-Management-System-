import React, { useState, useEffect } from 'react';
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
import { AuthProvider, useAuth } from './context/AuthContext';

function ProtectedLayout({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function AppRoutes({ setIsLoggedIn }) {
  return (
    <Routes>
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/register" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

      <Route path="/" element={<ProtectedLayout><Home /></ProtectedLayout>} />
      <Route path="/about" element={<ProtectedLayout><About /></ProtectedLayout>} />
      <Route path="/courses" element={<ProtectedLayout><Courses /></ProtectedLayout>} />
      <Route path="/instructors" element={<ProtectedLayout><Instructors /></ProtectedLayout>} />
      <Route path="/timetable" element={<ProtectedLayout><Timetable /></ProtectedLayout>} />
      <Route path="/fees" element={<ProtectedLayout><Fees /></ProtectedLayout>} />

      <Route path="/dashboard" element={<ProtectedLayout><DashboardLayout /></ProtectedLayout>}>
        <Route index element={<Students />} />
        <Route path="students" element={<Students />} />
        <Route path="instructors" element={<InstructorMgmt />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="fees" element={<FeeMgmt />} />
        <Route path="attendance" element={<Attendance />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes setIsLoggedIn={setIsLoggedIn} />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
