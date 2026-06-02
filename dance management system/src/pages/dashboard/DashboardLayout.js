import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { GiFlowerEmblem } from 'react-icons/gi';
import { FiUsers, FiCalendar, FiDollarSign, FiCheckSquare, FiLogOut, FiMenu, FiX, FiAward, FiBell, FiHome } from 'react-icons/fi';
import './Dashboard.css';

const navItems = [
  { to: '/dashboard/students', icon: <FiUsers />, label: 'Students' },
  { to: '/dashboard/instructors', icon: <FiAward />, label: 'Instructors' },
  { to: '/dashboard/schedule', icon: <FiCalendar />, label: 'Schedule' },
  { to: '/dashboard/fees', icon: <FiDollarSign />, label: 'Fee Management' },
  { to: '/dashboard/attendance', icon: <FiCheckSquare />, label: 'Attendance' },
];

export default function DashboardLayout({ setIsLoggedIn }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => { setIsLoggedIn(false); navigate('/login'); };

  return (
    <div className={`dashboard-root${sidebarOpen ? '' : ' collapsed'}`}>
      <aside className="sidebar">
        <div className="sidebar-header">
          <GiFlowerEmblem className="s-logo-icon" />
          {sidebarOpen && <span className="s-logo-text">Rhythmique</span>}
        </div>

        <nav className="sidebar-nav">
          {sidebarOpen && <div className="sidebar-section-label">Main Menu</div>}
          <NavLink to="/" className="s-link" title="Home">
            <span className="s-icon"><FiHome /></span>
            {sidebarOpen && <span className="s-label">Back to Home</span>}
          </NavLink>
          {sidebarOpen && <div className="sidebar-section-label" style={{ marginTop: 8 }}>Management</div>}
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `s-link${isActive ? ' active' : ''}`}
              title={item.label}
            >
              <span className="s-icon">{item.icon}</span>
              {sidebarOpen && <span className="s-label">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <button className="s-logout" onClick={handleLogout} title="Logout">
          <FiLogOut />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </aside>

      <div className="dashboard-body">
        <header className="dash-topbar">
          <button className="topbar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </button>

          <div className="topbar-right">
            <div className="topbar-badge" title="Notifications">
              <FiBell />
              <span className="topbar-badge-dot" />
            </div>
            <div className="topbar-user">
              <div className="avatar" style={{ background: 'linear-gradient(135deg, #6d28d9, #ec4899)', width: 34, height: 34, fontSize: '0.82rem' }}>A</div>
              <div className="topbar-user-info">
                <strong>Admin User</strong>
                <span>Administrator</span>
              </div>
            </div>
          </div>
        </header>

        <main className="dash-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
