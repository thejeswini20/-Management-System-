import React from 'react';
import { timetable } from '../data/data';
import './PageStyles.css';

export default function Timetable() {
  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, #b45309, #7c3aed)' }}>
        <div className="container">
          <p className="pre-label-white">Schedule</p>
          <h1>Weekly Timetable</h1>
          <p>Plan your dance week with ease</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="timetable-grid">
            {timetable.map(day => (
              <div key={day.day} className="day-card">
                <div className="day-header">📅 {day.day}</div>
                <div className="slots">
                  {day.slots.map((slot, i) => (
                    <div key={i} className="slot">
                      <div className="slot-time">{slot.time}</div>
                      <div className="slot-course">{slot.course}</div>
                      <div className="slot-meta">👤 {slot.instructor} · 🏠 {slot.room}</div>
                      <span className="badge badge-purple" style={{ marginTop: 6, fontSize: '0.72rem' }}>{slot.batch}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
