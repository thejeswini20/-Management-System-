import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiClock, FiUser } from 'react-icons/fi';
import { courses } from '../data/data';
import './PageStyles.css';

const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Classical'];

export default function Courses() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? courses : courses.filter(c =>
    c.level.toLowerCase().includes(active.toLowerCase()) ||
    (active === 'Classical' && ['Kathak', 'Bharatanatyam'].includes(c.name))
  );

  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, #be185d, #7c3aed)' }}>
        <div className="container">
          <p className="pre-label-white">Our Programs</p>
          <h1>Dance Courses</h1>
          <p>Expert-led classes for every style and skill level</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="filter-bar">
            {levels.map(l => (
              <button key={l} className={`filter-btn${active === l ? ' active' : ''}`} onClick={() => setActive(l)}>{l}</button>
            ))}
          </div>
          <div className="courses-grid-page">
            {filtered.map(c => (
              <div key={c.id} className="card course-page-card">
                <div className="course-page-img-wrap">
                  <img src={c.image} alt={c.name} className="course-page-img" />
                  <div className="course-page-overlay" style={{ background: `linear-gradient(to top, ${c.accent}ee, transparent)` }}>
                    <span className="course-page-name">{c.name}</span>
                  </div>
                  <span className="badge badge-purple course-level-badge">{c.level}</span>
                </div>
                <div className="course-page-body">
                  <p>{c.desc}</p>
                  <div className="course-page-meta">
                    <span><FiClock size={13} /> {c.duration}</span>
                    <span><FiUser size={13} /> {c.instructor}</span>
                    <span>👥 {c.students} students</span>
                  </div>
                  <div className="course-page-footer">
                    <span className="course-fee">₹{c.fee.toLocaleString()}<small>/mo</small></span>
                    <Link to="/login" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.82rem' }}>Enroll <FiArrowRight /></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
