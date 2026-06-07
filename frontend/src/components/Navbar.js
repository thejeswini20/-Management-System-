import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GiFlowerEmblem } from 'react-icons/gi';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiLogOut, FiGrid } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/courses', label: 'Courses' },
  { to: '/instructors', label: 'Instructors' },
  { to: '/timetable', label: 'Timetable' },
  { to: '/fees', label: 'Fees' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const darkHeroPages = ['/', '/about', '/courses', '/instructors'];
  const isDarkHeroPage = darkHeroPages.includes(location.pathname);
  const isNavbarTransparent = isDarkHeroPage && !scrolled;

  const navbarClass = `navbar ${isNavbarTransparent ? 'transparent-light' : 'scrolled'}${open ? ' menu-open' : ''}`;

  return (
    <>
      <div className={`nav-backdrop${open ? ' open' : ''}`} onClick={() => setOpen(false)} />
      <nav className={navbarClass}>
        <div className="container nav-inner">
          <Link to="/" className="nav-logo">
            <GiFlowerEmblem className="logo-icon" />
            <span>Rhythmique</span>
          </Link>

          <ul className={`nav-links${open ? ' open' : ''}`}>
            {navLinks.map(l => (
              <li key={l.to}>
                <Link to={l.to} className={location.pathname === l.to ? 'active' : ''}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="nav-actions-mobile">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="btn btn-primary">
                    <FiGrid /> Dashboard
                  </Link>
                  <button className="btn btn-outline" onClick={handleLogout}>
                    <FiLogOut /> Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="btn btn-primary">
                  Login / Register
                </Link>
              )}
            </li>
          </ul>

          <div className="nav-actions">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn btn-primary" style={{ padding: '9px 20px', fontSize: '0.85rem' }}>
                  <FiGrid /> Dashboard
                </Link>
                <button className="btn btn-outline" style={{ padding: '9px 18px', fontSize: '0.85rem' }} onClick={handleLogout}>
                  <FiLogOut /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-primary" style={{ padding: '9px 22px', fontSize: '0.85rem' }}>
                Login / Register
              </Link>
            )}
          </div>

          <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </nav>
    </>
  );
}
