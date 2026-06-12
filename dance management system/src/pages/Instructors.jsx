import React from 'react';
import { FiStar } from 'react-icons/fi';
import { instructors } from '../data/data';
import './PageStyles.css';

export default function Instructors() {
  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, #0d9488, #7c3aed)' }}>
        <div className="container">
          <p className="pre-label-white">Our Team</p>
          <h1>Meet the Instructors</h1>
          <p>Passionate artists and dedicated educators</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="instructors-grid">
            {instructors.map(inst => (
              <div key={inst.id} className="instructor-card card">
                <div className="instructor-img-wrap">
                  <img src={inst.image} alt={inst.name} className="instructor-img" />
                  <div className="instructor-img-overlay" />
                  <span className={`badge ${inst.status === 'Active' ? 'badge-green' : 'badge-gold'} instructor-status-badge`}>{inst.status}</span>
                </div>
                <div className="instructor-info">
                  <h3>{inst.name}</h3>
                  <p className="spec">{inst.specialization}</p>
                  <div className="instructor-stats">
                    <div><strong>{inst.experience}</strong><span>Experience</span></div>
                    <div><strong>{inst.students}</strong><span>Students</span></div>
                    <div><strong className="rating"><FiStar style={{ verticalAlign: 'middle' }} /> {inst.rating}</strong><span>Rating</span></div>
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
