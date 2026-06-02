import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { attendance as initData } from '../../data/data';
import './Dashboard.css';

export default function Attendance() {
  const [attendance] = useState(initData);
  const [search, setSearch] = useState('');

  const filtered = attendance.filter(a =>
    a.student.toLowerCase().includes(search.toLowerCase()) ||
    a.course.toLowerCase().includes(search.toLowerCase())
  );

  const avgPercent = Math.round(attendance.reduce((a, s) => a + s.percent, 0) / attendance.length);
  const perfect = attendance.filter(a => a.percent === 100).length;
  const atRisk = attendance.filter(a => a.percent < 75).length;

  const getColor = (pct) => pct >= 90 ? '#16a34a' : pct >= 75 ? '#f59e0b' : '#dc2626';
  const getBadge = (pct) => pct >= 90 ? 'badge-green' : pct >= 75 ? 'badge-gold' : 'badge-red';
  const getLabel = (pct) => pct >= 90 ? 'Excellent' : pct >= 75 ? 'Average' : 'At Risk';

  return (
    <div>
      <div className="page-header">
        <h1>Attendance Tracking</h1>
        <p>Monitor student attendance and engagement</p>
      </div>

      <div className="stat-grid">
        {[
          { label: 'Avg Attendance', value: `${avgPercent}%`, icon: '📊', cls: 'stat-purple' },
          { label: 'Perfect Attendance', value: perfect, icon: '🏅', cls: 'stat-green' },
          { label: 'At Risk (<75%)', value: atRisk, icon: '⚠️', cls: 'stat-pink' },
          { label: 'Total Students', value: attendance.length, icon: '👥', cls: 'stat-teal' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.cls}`}>{s.icon}</div>
            <div className="stat-info"><h3>{s.value}</h3><p>{s.label}</p></div>
          </div>
        ))}
      </div>

      <div className="table-wrapper">
        <div className="table-toolbar">
          <div className="search-box">
            <FiSearch /><input placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span className="badge badge-green">≥90% Excellent</span>
            <span className="badge badge-gold">75–89% Average</span>
            <span className="badge badge-red">&lt;75% At Risk</span>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr><th>Student</th><th>Course</th><th>Present</th><th>Absent</th><th>Total</th><th>Attendance</th><th>Status</th></tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <tr key={i}>
                  <td><strong>{a.student}</strong></td>
                  <td>{a.course}</td>
                  <td><span style={{ color: '#16a34a', fontWeight: 600 }}>{a.present}</span></td>
                  <td><span style={{ color: '#dc2626', fontWeight: 600 }}>{a.absent}</span></td>
                  <td>{a.total}</td>
                  <td style={{ minWidth: 160 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="progress-bar" style={{ flex: 1 }}>
                        <div className="progress-fill" style={{ width: `${a.percent}%`, background: getColor(a.percent) }} />
                      </div>
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: getColor(a.percent), minWidth: 36 }}>{a.percent}%</span>
                    </div>
                  </td>
                  <td><span className={`badge ${getBadge(a.percent)}`}>{getLabel(a.percent)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
