import React, { useState } from 'react';
import { FiSearch, FiTrendingUp, FiAlertTriangle, FiAward } from 'react-icons/fi';
import { attendance as initData } from '../../data/data';
import './Dashboard.css';

const getColor = p => p>=90?'#16a34a':p>=75?'#f59e0b':'#ef4444';
const getBadge = p => p>=90?'badge-green':p>=75?'badge-gold':'badge-red';
const getLabel = p => p>=90?'Excellent':p>=75?'Average':'At Risk';

function CircleProgress({ percent, color }) {
  const r = 22, c = 2*Math.PI*r;
  const dash = (percent/100)*c;
  return (
    <svg width="56" height="56" viewBox="0 0 56 56">
      <circle cx="28" cy="28" r={r} fill="none" stroke="#f0ecff" strokeWidth="5"/>
      <circle cx="28" cy="28" r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={`${dash} ${c}`} strokeDashoffset={c*0.25} strokeLinecap="round"
        style={{transition:'stroke-dasharray 0.6s ease'}}/>
      <text x="28" y="33" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1e1b4b">{percent}%</text>
    </svg>
  );
}

export default function Attendance() {
  const [attendance] = useState(initData);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = attendance.filter(a => {
    const q = search.toLowerCase();
    const matchQ = a.student.toLowerCase().includes(q)||a.course.toLowerCase().includes(q);
    const matchF = filter==='All'||(filter==='Excellent'&&a.percent>=90)||(filter==='Average'&&a.percent>=75&&a.percent<90)||(filter==='At Risk'&&a.percent<75);
    return matchQ&&matchF;
  });

  const avg = Math.round(attendance.reduce((a,s)=>a+s.percent,0)/attendance.length);
  const perfect = attendance.filter(a=>a.percent===100).length;
  const atRisk = attendance.filter(a=>a.percent<75).length;
  const excellent = attendance.filter(a=>a.percent>=90).length;

  return (
    <div className="dash-page">
      <div className="dash-page-header">
        <div><h1>Attendance Tracking</h1><p>Monitor student engagement and participation</p></div>
      </div>

      <div className="stat-grid">
        {[
          { label:'Avg Attendance', value:`${avg}%`, icon:<FiTrendingUp />, cls:'stat-purple' },
          { label:'Excellent (≥90%)', value:excellent, icon:<FiAward />, cls:'stat-green' },
          { label:'At Risk (<75%)', value:atRisk, icon:<FiAlertTriangle />, cls:'stat-pink' },
          { label:'Perfect (100%)', value:perfect, icon:'🏅', cls:'stat-teal' },
        ].map(s=>(
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.cls}`}>{s.icon}</div>
            <div className="stat-info"><h3>{s.value}</h3><p>{s.label}</p></div>
          </div>
        ))}
      </div>

      {/* Overall attendance ring */}
      <div className="attendance-overview">
        <div className="att-ring-wrap">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="56" fill="none" stroke="#f0ecff" strokeWidth="14"/>
            <circle cx="70" cy="70" r="56" fill="none" stroke="#6d28d9" strokeWidth="14"
              strokeDasharray={`${avg*3.52} 352`} strokeDashoffset="88" strokeLinecap="round"/>
            <text x="70" y="65" textAnchor="middle" fontSize="26" fontWeight="800" fill="#1e1b4b">{avg}%</text>
            <text x="70" y="85" textAnchor="middle" fontSize="11" fill="#6b7280">Overall</text>
          </svg>
        </div>
        <div className="att-legend">
          {[{label:'Excellent (≥90%)',count:excellent,color:'#16a34a'},{label:'Average (75–89%)',count:attendance.filter(a=>a.percent>=75&&a.percent<90).length,color:'#f59e0b'},{label:'At Risk (<75%)',count:atRisk,color:'#ef4444'}].map(l=>(
            <div key={l.label} className="att-legend-item">
              <span className="att-dot" style={{background:l.color}}/>
              <span>{l.label}</span>
              <strong style={{color:l.color}}>{l.count}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="table-wrapper">
        <div className="table-toolbar">
          <div className="toolbar-left">
            <div className="search-box"><FiSearch /><input placeholder="Search students..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
            <div className="status-filters">
              {['All','Excellent','Average','At Risk'].map(f=>(
                <button key={f} className={`filter-chip${filter===f?' active':''}`} onClick={()=>setFilter(f)}>{f}</button>
              ))}
            </div>
          </div>
        </div>
        <div style={{overflowX:'auto'}}>
          <table>
            <thead><tr><th>Student</th><th>Course</th><th>Progress</th><th>Present</th><th>Absent</th><th>Total</th><th>Status</th></tr></thead>
            <tbody>
              {filtered.map((a,i)=>(
                <tr key={i}>
                  <td>
                    <div className="student-cell">
                      <CircleProgress percent={a.percent} color={getColor(a.percent)} />
                      <strong>{a.student}</strong>
                    </div>
                  </td>
                  <td>{a.course}</td>
                  <td style={{minWidth:180}}>
                    <div className="att-bar-wrap">
                      <div className="progress-bar" style={{flex:1}}>
                        <div className="progress-fill" style={{width:`${a.percent}%`,background:getColor(a.percent)}}/>
                      </div>
                      <span style={{fontSize:'0.82rem',fontWeight:700,color:getColor(a.percent),minWidth:40}}>{a.percent}%</span>
                    </div>
                  </td>
                  <td><span className="present-chip">{a.present}</span></td>
                  <td><span className="absent-chip">{a.absent}</span></td>
                  <td className="text-muted">{a.total}</td>
                  <td><span className={`badge ${getBadge(a.percent)}`}>{getLabel(a.percent)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>Showing <strong>{filtered.length}</strong> of <strong>{attendance.length}</strong> students</span>
        </div>
      </div>
    </div>
  );
}
