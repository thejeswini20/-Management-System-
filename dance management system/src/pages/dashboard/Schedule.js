import React, { useState } from 'react';
import { FiPlus, FiCalendar } from 'react-icons/fi';
import { timetable as initData, courses, instructors } from '../../data/data';
import './Dashboard.css';

const colors = ['#ede9fe', '#fce7f3', '#fef3c7', '#ccfbf1', '#e0e7ff', '#fee2e2', '#f0fdf4'];

export default function Schedule() {
  const [timetable] = useState(initData);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ day: 'Monday', time: '', course: '', instructor: '', room: '', batch: 'Morning' });

  const totalClasses = timetable.reduce((a, d) => a + d.slots.length, 0);

  return (
    <div>
      <div className="page-header">
        <h1>Class Schedule</h1>
        <p>View and manage weekly class timetable</p>
      </div>

      <div className="stat-grid">
        {[
          { label: 'Total Classes/Week', value: totalClasses, icon: '📅', cls: 'stat-purple' },
          { label: 'Active Courses', value: courses.length, icon: '💃', cls: 'stat-pink' },
          { label: 'Studios', value: 3, icon: '🏠', cls: 'stat-teal' },
          { label: 'Instructors', value: instructors.length, icon: '🎓', cls: 'stat-gold' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.cls}`}>{s.icon}</div>
            <div className="stat-info"><h3>{s.value}</h3><p>{s.label}</p></div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}><FiPlus /> Add Class</button>
      </div>

      <div style={{ display: 'grid', gap: 16 }}>
        {timetable.map((day, di) => (
          <div key={day.day} className="table-wrapper" style={{ overflow: 'hidden' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--primary), #9333ea)', color: '#fff', padding: '12px 20px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
              <FiCalendar /> {day.day}
              <span style={{ marginLeft: 'auto', fontSize: '0.78rem', opacity: 0.8 }}>{day.slots.length} class{day.slots.length > 1 ? 'es' : ''}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
              {day.slots.map((slot, i) => (
                <div key={i} style={{ padding: '16px 20px', borderRight: '1px solid #f8f4ff', borderBottom: '1px solid #f8f4ff', background: colors[(di + i) % colors.length] + '55' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>{slot.time}</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--dark)' }}>{slot.course}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: 2 }}>👤 {slot.instructor} · 🏠 {slot.room}</div>
                  <span className="badge badge-purple" style={{ marginTop: 6, fontSize: '0.72rem' }}>{slot.batch}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <h3><FiCalendar style={{ marginRight: 8 }} />Add New Class</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            {[
              { name: 'day', label: 'Day', opts: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'] },
              { name: 'batch', label: 'Batch', opts: ['Morning','Evening','Weekend'] },
            ].map(f => (
              <div key={f.name} className="form-group">
                <select value={form[f.name]} onChange={e => setForm({ ...form, [f.name]: e.target.value })}>
                  {f.opts.map(o => <option key={o}>{o}</option>)}
                </select>
                <label>{f.label}</label>
              </div>
            ))}
            {[
              { name: 'time', label: 'Time (e.g. 7:00 AM)' },
              { name: 'course', label: 'Course' },
              { name: 'instructor', label: 'Instructor' },
              { name: 'room', label: 'Room / Studio' },
            ].map(f => (
              <div key={f.name} className="form-group">
                <input type="text" placeholder=" " value={form[f.name]} onChange={e => setForm({ ...form, [f.name]: e.target.value })} />
                <label>{f.label}</label>
              </div>
            ))}
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setShowModal(false)}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
