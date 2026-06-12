import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import { GiFlowerEmblem } from 'react-icons/gi';
import {
  FiUsers, FiCalendar, FiDollarSign, FiCheckSquare,
  FiLogOut, FiMenu, FiX, FiAward, FiBell,
  FiHome, FiChevronRight, FiSettings, FiExternalLink
} from 'react-icons/fi';
import './Dashboard.css';

const navItems = [
  { to: '/dashboard/students',     icon: <FiUsers />,       label: 'Students',       desc: 'Manage enrolled students' },
  { to: '/dashboard/instructors',  icon: <FiAward />,       label: 'Instructors',    desc: 'Faculty management' },
  { to: '/dashboard/schedule',     icon: <FiCalendar />,    label: 'Schedule',       desc: 'Class timetable' },
  { to: '/dashboard/fees',         icon: <FiDollarSign />,  label: 'Fee Management', desc: 'Payments & invoices' },
  { to: '/dashboard/attendance',   icon: <FiCheckSquare />, label: 'Attendance',     desc: 'Track attendance' },
];

const breadcrumbMap = {
  '/dashboard/students':    'Students',
  '/dashboard/instructors': 'Instructors',
  '/dashboard/schedule':    'Schedule',
  '/dashboard/fees':        'Fee Management',
  '/dashboard/attendance':  'Attendance',
};

export default function DashboardLayout({ setIsLoggedIn }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => { setIsLoggedIn(false); navigate('/login'); };
  const currentPage = breadcrumbMap[location.pathname] || 'Dashboard';

  return (
    <div className={`dashboard-root${sidebarOpen ? '' : ' collapsed'}`}>

      {/* ── SIDEBAR ── */}
      <aside className="sidebar">
        {/* Logo */}
        <div className="sidebar-header">
          <GiFlowerEmblem className="s-logo-icon" />
          {sidebarOpen && <span className="s-logo-text">Rhythmique</span>}
        </div>

        <nav className="sidebar-nav">
          {/* Back to Website */}
          {sidebarOpen && <div className="sidebar-section-label">Navigation</div>}
          <Link to="/" className="s-link s-home-link" title="Back to Home">
            <span className="s-icon"><FiHome /></span>
            {sidebarOpen && (
              <span className="s-label-wrap">
                <span className="s-label">Back to Home</span>
                <FiExternalLink size={11} style={{ opacity: 0.5 }} />
              </span>
            )}
          </Link>

          {/* Management pages */}
          {sidebarOpen && <div className="sidebar-section-label" style={{ marginTop: 12 }}>Management</div>}
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              title={item.label}
              className={({ isActive }) => `s-link${isActive ? ' active' : ''}`}
            >
              <span className="s-icon">{item.icon}</span>
              {sidebarOpen && (
                <span className="s-label-wrap">
                  <span className="s-label">{item.label}</span>
                  <span className="s-desc">{item.desc}</span>
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Settings + Logout */}
        <div className="sidebar-footer">
          {sidebarOpen && (
            <button className="s-settings" title="Settings">
              <FiSettings />
              <span>Settings</span>
            </button>
          )}
          <button className="s-logout" onClick={handleLogout} title="Logout">
            <FiLogOut />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ── MAIN BODY ── */}
      <div className="dashboard-body">

        {/* ── TOPBAR ── */}
        <header className="dash-topbar">
          <div className="topbar-left">
            <button className="topbar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
              {sidebarOpen ? <FiX /> : <FiMenu />}
            </button>
            {/* Breadcrumb */}
            <div className="topbar-breadcrumb">
              <Link to="/" className="breadcrumb-home">
                <FiHome size={13} /> Home
              </Link>
              <FiChevronRight size={12} className="breadcrumb-sep" />
              <span className="breadcrumb-current">{currentPage}</span>
            </div>
          </div>

          <div className="topbar-right">
            {/* Home quick link */}
            <Link to="/" className="topbar-home-btn" title="Go to Website">
              <FiHome /> <span>Website</span>
            </Link>

            {/* Notification bell */}
            <div className="topbar-badge" title="Notifications">
              <FiBell />
              <span className="topbar-badge-dot" />
            </div>

            {/* User */}
            <div className="topbar-user">
              <div className="avatar topbar-avatar">A</div>
              <div className="topbar-user-info">
                <strong>Admin User</strong>
                <span>Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* ── PAGE CONTENT ── */}
        <main className="dash-main">
          <Outlet />
        </main>

        {/* ── DASHBOARD FOOTER ── */}
        <footer className="dash-footer">
          <span>© 2024 Rhythmique Dance Academy</span>
          <Link to="/">Go to Website <FiExternalLink size={11} /></Link>
        </footer>
      </div>
    </div>
  );
}
