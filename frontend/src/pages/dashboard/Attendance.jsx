import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  FiSearch, FiTrendingUp, FiAlertTriangle, FiAward,
  FiCheckCircle, FiXCircle, FiCalendar, FiChevronDown,
  FiUsers, FiTrash2, FiUser
} from 'react-icons/fi';
import { students as allStudents, courses } from '../../data/data';
import './Dashboard.css';

/* ── helpers ── */
const getColor  = p => p >= 90 ? '#16a34a' : p >= 75 ? '#f59e0b' : '#ef4444';
const getBadge  = p => p >= 90 ? 'badge-green' : p >= 75 ? 'badge-gold' : 'badge-red';
const getLabel  = p => p >= 90 ? 'Excellent'   : p >= 75 ? 'Average'    : 'At Risk';
const todayStr  = () => new Date().toISOString().split('T')[0];
const fmtDate   = d => new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });

const courseColors = {
  Ballet:'#7c3aed','Hip-Hop':'#ec4899',Kathak:'#f59e0b',
  Contemporary:'#0d9488',Salsa:'#ef4444',Bharatanatyam:'#6366f1'
};

function CircleProgress({ percent, color }) {
  const r = 22, c = 2 * Math.PI * r, dash = (percent / 100) * c;
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

/* seed past sessions */
const seedSessions = [
  { id:'s1', date:'2024-05-01', entries:[
    { studentName:'Aria Sharma',  course:'Ballet',  status:'Present' },
    { studentName:'Anika Verma',  course:'Ballet',  status:'Present' },
  ]},
  { id:'s2', date:'2024-05-03', entries:[
    { studentName:'Zara Patel',   course:'Hip-Hop', status:'Present' },
    { studentName:'Sara Khan',    course:'Hip-Hop', status:'Absent'  },
  ]},
  { id:'s3', date:'2024-05-05', entries:[
    { studentName:'Meera Iyer',   course:'Kathak',  status:'Present' },
    { studentName:'Riya Nair',    course:'Salsa',   status:'Absent'  },
  ]},
];

/* ══════════════════════════════════════════════════════════ */
export default function Attendance() {
  const [tab, setTab]             = useState('mark');
  const [sessions, setSessions]   = useState(seedSessions);

  /* ── Mark tab ── */
  const [markDate, setMarkDate]   = useState(todayStr());
  const [nameInput, setNameInput] = useState('');
  const [courseInput, setCourse]  = useState('');
  const [showSug, setShowSug]     = useState(false);
  const [todayEntries, setToday]  = useState([]); // { studentName, course, status, time }
  const [flashId, setFlashId]     = useState(null);
  const nameRef = useRef();
  const sugRef  = useRef();

  /* ── Records tab ── */
  const [search, setSearch]           = useState('');
  const [filterCourse, setFilterCourse] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [expandedSess, setExpanded]   = useState(null);

  /* autocomplete: match names from allStudents */
  const suggestions = useMemo(() => {
    if (!nameInput.trim()) return [];
    const q = nameInput.toLowerCase();
    return allStudents.filter(s =>
      s.name.toLowerCase().includes(q) &&
      !todayEntries.some(e => e.studentName === s.name && e.course === (courseInput || s.course))
    ).slice(0, 6);
  }, [nameInput, courseInput, todayEntries]);

  /* close suggestions on outside click */
  useEffect(() => {
    const handler = e => {
      if (sugRef.current && !sugRef.current.contains(e.target) &&
          nameRef.current && !nameRef.current.contains(e.target)) {
        setShowSug(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const pickSuggestion = s => {
    setNameInput(s.name);
    setCourse(s.course);
    setShowSug(false);
    nameRef.current && nameRef.current.focus();
  };

  const markStudent = (status) => {
    const name   = nameInput.trim();
    const course = courseInput.trim();
    if (!name || !course) return;

    // prevent duplicate for same day
    const dup = todayEntries.find(e => e.studentName === name && e.course === course);
    if (dup) {
      // just update their status
      setToday(prev => prev.map(e =>
        e.studentName === name && e.course === course ? { ...e, status } : e
      ));
      flash(`${name}-${course}`);
      setNameInput('');
      return;
    }

    const entry = {
      id: Date.now(),
      studentName: name,
      course,
      status,
      time: new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' }),
    };
    setToday(prev => [entry, ...prev]);
    flash(entry.id);
    setNameInput('');
    setCourse('');
    nameRef.current && nameRef.current.focus();
  };

  const flash = id => { setFlashId(id); setTimeout(() => setFlashId(null), 900); };

  const removeEntry = id => setToday(prev => prev.filter(e => e.id !== id));

  const saveDay = () => {
    if (!todayEntries.length) return;
    const sess = { id:`sess-${Date.now()}`, date: markDate, entries: todayEntries.map(e => ({
      studentName: e.studentName, course: e.course, status: e.status
    }))};
    setSessions(prev => [sess, ...prev]);
    setToday([]);
  };

  /* ── stats from all saved sessions ── */
  const allRecords = useMemo(() => {
    const map = {};
    sessions.forEach(sess => {
      sess.entries.forEach(e => {
        const key = `${e.studentName}||${e.course}`;
        if (!map[key]) map[key] = { student: e.studentName, course: e.course, present:0, absent:0, total:0 };
        map[key].total++;
        if (e.status === 'Present') map[key].present++;
        else                        map[key].absent++;
      });
    });
    return Object.values(map).map(r => ({ ...r, percent: r.total ? Math.round((r.present/r.total)*100) : 0 }));
  }, [sessions]);

  const filteredRecords = useMemo(() => allRecords.filter(r => {
    const q = search.toLowerCase();
    const matchQ = r.student.toLowerCase().includes(q) || r.course.toLowerCase().includes(q);
    const matchC = filterCourse === 'All' || r.course === filterCourse;
    const matchS = filterStatus === 'All'
      || (filterStatus === 'Excellent' && r.percent >= 90)
      || (filterStatus === 'Average'   && r.percent >= 75 && r.percent < 90)
      || (filterStatus === 'At Risk'   && r.percent < 75);
    return matchQ && matchC && matchS;
  }), [allRecords, search, filterCourse, filterStatus]);

  const avg       = allRecords.length ? Math.round(allRecords.reduce((a,r)=>a+r.percent,0)/allRecords.length) : 0;
  const excellent = allRecords.filter(r=>r.percent>=90).length;
  const atRisk    = allRecords.filter(r=>r.percent<75).length;
  const perfect   = allRecords.filter(r=>r.percent===100).length;

  const presentToday = todayEntries.filter(e=>e.status==='Present').length;
  const absentToday  = todayEntries.filter(e=>e.status==='Absent').length;

  /* ── Render ── */
  return (
    <div className="dash-page">

      {/* Header */}
      <div className="dash-page-header">
        <div>
          <h1>Attendance Tracking</h1>
          <p>Mark daily attendance by name &amp; class, view records &amp; stats</p>
        </div>
        <div className="att-tab-switch">
          <button className={`att-tab-btn${tab==='mark'?' active':''}`} onClick={()=>setTab('mark')}>
            <FiCheckCircle/> Mark Attendance
          </button>
          <button className={`att-tab-btn${tab==='records'?' active':''}`} onClick={()=>setTab('records')}>
            <FiCalendar/> Records
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="stat-grid">
        {[
          { label:'Avg Attendance',  value:`${avg}%`,  icon:<FiTrendingUp/>, cls:'stat-purple' },
          { label:'Excellent (≥90%)',value:excellent,   icon:<FiAward/>,      cls:'stat-green'  },
          { label:'At Risk (<75%)',  value:atRisk,      icon:<FiAlertTriangle/>,cls:'stat-pink' },
          { label:'Perfect (100%)',  value:perfect,     icon:'🏅',            cls:'stat-teal'   },
        ].map(s=>(
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.cls}`}>{s.icon}</div>
            <div className="stat-info"><h3>{s.value}</h3><p>{s.label}</p></div>
          </div>
        ))}
      </div>

      {/* ══ TAB: MARK ══ */}
      {tab==='mark' && (
        <div className="att-daily-layout">

          {/* ── LEFT: Entry form ── */}
          <div className="att-entry-card">
            <div className="att-entry-heading">
              <span className="att-entry-icon">📝</span>
              <div>
                <h3>Mark Attendance</h3>
                <p>Enter student name &amp; class, then click Present or Absent</p>
              </div>
            </div>

            {/* Date picker */}
            <div className="att-field-group">
              <label><FiCalendar/> Date</label>
              <input
                type="date"
                value={markDate}
                onChange={e=>setMarkDate(e.target.value)}
                className="att-date-input"
              />
            </div>

            {/* Student name with autocomplete */}
            <div className="att-field-group" style={{position:'relative'}}>
              <label><FiUser/> Student Name</label>
              <input
                ref={nameRef}
                type="text"
                className="att-name-input"
                placeholder="Type student name…"
                value={nameInput}
                onChange={e=>{ setNameInput(e.target.value); setShowSug(true); }}
                onFocus={()=>setShowSug(true)}
                onKeyDown={e=>{ if(e.key==='Enter') markStudent('Present'); }}
                autoComplete="off"
              />
              {showSug && suggestions.length>0 && (
                <div className="att-suggestions" ref={sugRef}>
                  {suggestions.map(s=>(
                    <div key={s.id} className="att-sug-item" onMouseDown={()=>pickSuggestion(s)}>
                      <div className="att-sug-avatar" style={{background:courseColors[s.course]||'#7c3aed'}}>
                        {s.name[0]}
                      </div>
                      <div>
                        <strong>{s.name}</strong>
                        <span className="att-sug-sub">{s.course} · {s.batch}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dance class dropdown */}
            <div className="att-field-group">
              <label><FiUsers/> Dance Class</label>
              <div className="att-select-wrap">
                <select
                  className="att-course-select"
                  value={courseInput}
                  onChange={e=>setCourse(e.target.value)}
                >
                  <option value="">— Select a class —</option>
                  {courses.map(c=>(
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
                <FiChevronDown className="att-select-icon"/>
              </div>
            </div>

            {/* Big Present / Absent buttons */}
            <div className="att-mark-btns">
              <button
                className="att-big-btn att-big-present"
                onClick={()=>markStudent('Present')}
                disabled={!nameInput.trim()||!courseInput}
              >
                <FiCheckCircle size={22}/>
                <span>Present</span>
              </button>
              <button
                className="att-big-btn att-big-absent"
                onClick={()=>markStudent('Absent')}
                disabled={!nameInput.trim()||!courseInput}
              >
                <FiXCircle size={22}/>
                <span>Absent</span>
              </button>
            </div>

            {(!nameInput.trim()||!courseInput) && (
              <p className="att-hint">Fill in both fields above to enable marking</p>
            )}

            {/* Mini counters */}
            {todayEntries.length>0 && (
              <div className="att-mini-counters">
                <div className="att-mini-count present">
                  <FiCheckCircle/> <strong>{presentToday}</strong> Present
                </div>
                <div className="att-mini-count absent">
                  <FiXCircle/> <strong>{absentToday}</strong> Absent
                </div>
                <div className="att-mini-count total">
                  <FiUsers/> <strong>{todayEntries.length}</strong> Total
                </div>
              </div>
            )}

            {/* Save day button */}
            {todayEntries.length>0 && (
              <button className="btn btn-primary att-save-day-btn" onClick={saveDay}>
                💾 Save Day's Attendance ({todayEntries.length} entries)
              </button>
            )}
          </div>

          {/* ── RIGHT: Today's live list ── */}
          <div className="att-today-card">
            <div className="att-today-header">
              <div>
                <h3>Today's Attendance</h3>
                <span className="att-today-date">📅 {fmtDate(markDate)}</span>
              </div>
              {todayEntries.length>0 && (
                <span className="badge badge-purple">{todayEntries.length} marked</span>
              )}
            </div>

            {todayEntries.length===0 ? (
              <div className="att-today-empty">
                <div style={{fontSize:'2.5rem',marginBottom:8}}>👆</div>
                <p>No entries yet for today.</p>
                <p style={{fontSize:'0.8rem',color:'var(--text-muted)'}}>Use the form on the left to mark students.</p>
              </div>
            ) : (
              <div className="att-today-list">
                {todayEntries.map(e=>{
                  const color = courseColors[e.course]||'#7c3aed';
                  const isPresent = e.status==='Present';
                  return (
                    <div
                      key={e.id}
                      className={`att-today-row${flashId===e.id?' att-flash':''} ${isPresent?'att-today-present':'att-today-absent'}`}
                    >
                      <div className="att-today-left">
                        <div className="att-today-avatar" style={{background:color}}>
                          {e.studentName[0]}
                        </div>
                        <div>
                          <strong className="att-today-name">{e.studentName}</strong>
                          <span className="att-today-meta">
                            <span className="att-course-dot" style={{background:color}}/>
                            {e.course}
                            {e.time && <span style={{marginLeft:6,opacity:0.6}}>· {e.time}</span>}
                          </span>
                        </div>
                      </div>
                      <div className="att-today-right">
                        {/* Toggle buttons inline */}
                        <button
                          className={`att-toggle-btn${isPresent?' att-toggle-present':''}`}
                          onClick={()=>setToday(prev=>prev.map(x=>x.id===e.id?{...x,status:'Present'}:x))}
                          title="Present"
                        ><FiCheckCircle size={14}/></button>
                        <button
                          className={`att-toggle-btn${!isPresent?' att-toggle-absent':''}`}
                          onClick={()=>setToday(prev=>prev.map(x=>x.id===e.id?{...x,status:'Absent'}:x))}
                          title="Absent"
                        ><FiXCircle size={14}/></button>
                        <button
                          className="att-del-entry"
                          onClick={()=>removeEntry(e.id)}
                          title="Remove"
                        ><FiTrash2 size={13}/></button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══ TAB: RECORDS ══ */}
      {tab==='records' && (
        <>
          {/* Overview ring */}
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
              {[
                { label:'Excellent (≥90%)', count:excellent, color:'#16a34a' },
                { label:'Average (75–89%)', count:allRecords.filter(r=>r.percent>=75&&r.percent<90).length, color:'#f59e0b' },
                { label:'At Risk (<75%)',   count:atRisk,    color:'#ef4444' },
              ].map(l=>(
                <div key={l.label} className="att-legend-item">
                  <span className="att-dot" style={{background:l.color}}/>
                  <span>{l.label}</span>
                  <strong style={{color:l.color}}>{l.count}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Session history accordion */}
          <div className="att-sessions-section">
            <h3 style={{fontSize:'1rem',fontWeight:700,marginBottom:12}}>📅 Session History ({sessions.length})</h3>
            <div className="att-sessions-list">
              {sessions.map(sess=>{
                const pCount = sess.entries.filter(e=>e.status==='Present').length;
                const aCount = sess.entries.filter(e=>e.status==='Absent').length;
                const isOpen = expandedSess===sess.id;
                return (
                  <div key={sess.id} className="att-session-card">
                    <div className="att-session-card-header" onClick={()=>setExpanded(isOpen?null:sess.id)}>
                      <div style={{display:'flex',alignItems:'center',gap:12}}>
                        <FiCalendar style={{color:'var(--primary)',flexShrink:0}}/>
                        <div>
                          <strong style={{fontSize:'0.88rem'}}>📅 {fmtDate(sess.date)}</strong>
                          <span className="text-muted" style={{marginLeft:10,fontSize:'0.78rem'}}>
                            {sess.entries.length} student{sess.entries.length!==1?'s':''}
                            {' · '}
                            {[...new Set(sess.entries.map(e=>e.course))].join(', ')}
                          </span>
                        </div>
                      </div>
                      <div style={{display:'flex',gap:8,alignItems:'center'}}>
                        <span className="present-chip">{pCount} Present</span>
                        <span className="absent-chip">{aCount} Absent</span>
                        <FiChevronDown style={{transform:isOpen?'rotate(180deg)':'none',transition:'0.2s',color:'var(--text-muted)'}}/>
                      </div>
                    </div>
                    {isOpen && (
                      <div className="att-session-card-body">
                        <table style={{width:'100%',borderCollapse:'collapse'}}>
                          <thead>
                            <tr style={{background:'#f8f6ff'}}>
                              {['#','Student Name','Dance Class','Status'].map(h=>(
                                <th key={h} style={{textAlign:'left',padding:'8px 14px',fontSize:'0.72rem',color:'var(--text-muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.4px'}}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {sess.entries.map((e,i)=>{
                              const color = courseColors[e.course]||'#7c3aed';
                              return (
                                <tr key={i} style={{borderTop:'1px solid #f0ecff'}}>
                                  <td style={{padding:'9px 14px',fontSize:'0.8rem',color:'var(--text-muted)'}}>{i+1}</td>
                                  <td style={{padding:'9px 14px'}}>
                                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                                      <div style={{width:28,height:28,borderRadius:'50%',background:color,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'0.75rem',fontWeight:700,flexShrink:0}}>
                                        {e.studentName[0]}
                                      </div>
                                      <strong style={{fontSize:'0.85rem'}}>{e.studentName}</strong>
                                    </div>
                                  </td>
                                  <td style={{padding:'9px 14px'}}>
                                    <span className="course-pill" style={{background:color+'18',color,fontSize:'0.75rem'}}>{e.course}</span>
                                  </td>
                                  <td style={{padding:'9px 14px'}}>
                                    <span className={`badge ${e.status==='Present'?'badge-green':'badge-red'}`}>{e.status}</span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary table */}
          <div className="table-wrapper" style={{marginTop:24}}>
            <div className="table-toolbar">
              <div className="toolbar-left">
                <div className="search-box">
                  <FiSearch/>
                  <input placeholder="Search name or course…" value={search} onChange={e=>setSearch(e.target.value)}/>
                </div>
                <div className="status-filters">
                  {['All','Excellent','Average','At Risk'].map(f=>(
                    <button key={f} className={`filter-chip${filterStatus===f?' active':''}`} onClick={()=>setFilterStatus(f)}>{f}</button>
                  ))}
                </div>
                <select value={filterCourse} onChange={e=>setFilterCourse(e.target.value)}
                  style={{padding:'7px 12px',borderRadius:8,border:'1.5px solid #e8e4f8',fontSize:'0.8rem',fontFamily:'inherit',cursor:'pointer'}}>
                  <option value="All">All Classes</option>
                  {courses.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>
            </div>
            <div style={{overflowX:'auto'}}>
              <table>
                <thead>
                  <tr>
                    <th>Student</th><th>Dance Class</th><th>Progress</th>
                    <th>Present</th><th>Absent</th><th>Total</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.length===0 && (
                    <tr><td colSpan={7} style={{textAlign:'center',padding:'32px',color:'var(--text-muted)'}}>No records found</td></tr>
                  )}
                  {filteredRecords.map((a,i)=>(
                    <tr key={i}>
                      <td>
                        <div className="student-cell">
                          <CircleProgress percent={a.percent} color={getColor(a.percent)}/>
                          <strong>{a.student}</strong>
                        </div>
                      </td>
                      <td>
                        <span className="course-pill" style={{background:(courseColors[a.course]||'#7c3aed')+'18',color:courseColors[a.course]||'#7c3aed'}}>
                          {a.course}
                        </span>
                      </td>
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
              <span>Showing <strong>{filteredRecords.length}</strong> of <strong>{allRecords.length}</strong> students</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
