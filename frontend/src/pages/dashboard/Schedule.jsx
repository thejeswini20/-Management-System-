import React, { useState } from 'react';
import { FiPlus, FiCalendar, FiClock, FiUser, FiHome, FiTrash2 } from 'react-icons/fi';
import { timetable as initData, courses, instructors } from '../../data/data';
import './Dashboard.css';

const courseColors = { Ballet:'#7c3aed','Hip-Hop':'#ec4899',Kathak:'#f59e0b',Contemporary:'#0d9488',Salsa:'#ef4444',Bharatanatyam:'#6366f1' };
const dayIcons = { Monday:'🌙', Tuesday:'🔥', Wednesday:'💫', Thursday:'⚡', Friday:'🎉', Saturday:'🌟', Sunday:'☀️' };

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const BATCHES = ['Morning','Evening','Weekend'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export default function Schedule() {
  const [timetable, setTimetable] = useState(initData);
  const [showModal, setShowModal] = useState(false);
  const [activeDay, setActiveDay] = useState('All');
  const [form, setForm] = useState({ day:'Monday', time:'', course:'', instructor:'', room:'', batch:'Morning', level:'Beginner' });
  const [error, setError] = useState('');

  const totalClasses = timetable.reduce((a,d)=>a+d.slots.length,0);
  const days = timetable.map(d=>d.day);
  const displayDays = activeDay==='All' ? timetable : timetable.filter(d=>d.day===activeDay);

  const handleSave = () => {
    if (!form.time || !form.course || !form.instructor || !form.room) {
      setError('All fields are required.');
      return;
    }

    const newSlot = {
      time: form.time,
      course: form.course,
      instructor: form.instructor,
      batch: form.batch,
      room: form.room,
      level: form.level,
    };

    setTimetable(prev => {
      const dayExists = prev.find(d => d.day === form.day);
      if (dayExists) {
        return prev.map(d =>
          d.day === form.day
            ? { ...d, slots: [...d.slots, newSlot] }
            : d
        );
      } else {
        return [...prev, { day: form.day, slots: [newSlot] }];
      }
    });

    setForm({ day:'Monday', time:'', course:'', instructor:'', room:'', batch:'Morning', level:'Beginner' });
    setError('');
    setShowModal(false);
  };

  const handleDelete = (dayName, slotIndex) => {
    setTimetable(prev =>
      prev.map(d =>
        d.day === dayName
          ? { ...d, slots: d.slots.filter((_, i) => i !== slotIndex) }
          : d
      )
    );
  };

  return (
    <div className="dash-page">
      <div className="dash-page-header">
        <div><h1>Class Schedule</h1><p>Weekly timetable across {timetable.length} days</p></div>
        <button className="btn btn-primary" style={{padding:'9px 18px',fontSize:'0.82rem'}} onClick={()=>{ setError(''); setShowModal(true); }}>
          <FiPlus /> Add Class
        </button>
      </div>

      <div className="stat-grid">
        {[
          { label:'Classes/Week',    value:totalClasses,      icon:<FiCalendar />, cls:'stat-purple' },
          { label:'Active Courses',  value:courses.length,    icon:'💃',           cls:'stat-pink' },
          { label:'Studios',         value:3,                 icon:<FiHome />,     cls:'stat-teal' },
          { label:'Instructors',     value:instructors.length, icon:<FiUser />,    cls:'stat-gold' },
        ].map(s=>(
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.cls}`}>{s.icon}</div>
            <div className="stat-info"><h3>{s.value}</h3><p>{s.label}</p></div>
          </div>
        ))}
      </div>

      <div className="day-filter-row">
        <button className={`day-pill${activeDay==='All'?' active':''}`} onClick={()=>setActiveDay('All')}>All Days</button>
        {days.map(d=>(
          <button key={d} className={`day-pill${activeDay===d?' active':''}`} onClick={()=>setActiveDay(d)}>
            {dayIcons[d]} {d}
          </button>
        ))}
      </div>

      <div className="schedule-grid">
        {displayDays.map((day)=>(
          <div key={day.day} className="day-card-premium">
            <div className="day-card-header">
              <span className="day-icon">{dayIcons[day.day]}</span>
              <div><h4>{day.day}</h4><span>{day.slots.length} class{day.slots.length!==1?'es':''}</span></div>
            </div>
            <div className="day-slots-list">
              {day.slots.length === 0 && (
                <div style={{textAlign:'center',padding:'18px 0',color:'var(--text-muted)',fontSize:'0.82rem'}}>No classes scheduled</div>
              )}
              {day.slots.map((slot,i)=>{
                const color = courseColors[slot.course]||'#7c3aed';
                return (
                  <div key={i} className="slot-item" style={{'--slot-color':color}}>
                    <div className="slot-color-bar" style={{background:color}}/>
                    <div className="slot-content">
                      <div className="slot-top">
                        <strong className="slot-course">{slot.course}</strong>
                        <span className="slot-batch badge" style={{background:color+'18',color}}>{slot.batch}</span>
                        {slot.level && (
                          <span className="slot-level badge" style={{
                            background: slot.level === 'Beginner' ? '#d1fae5' : slot.level === 'Intermediate' ? '#fef3c7' : '#fee2e2',
                            color: slot.level === 'Beginner' ? '#065f46' : slot.level === 'Intermediate' ? '#92400e' : '#991b1b',
                            marginLeft: '6px'
                          }}>{slot.level}</span>
                        )}
                        <button
                          className="btn-icon btn-del"
                          style={{marginLeft:'auto',width:26,height:26}}
                          onClick={()=>handleDelete(day.day, i)}
                          title="Remove class"
                        ><FiTrash2 size={12}/></button>
                      </div>
                      <div className="slot-meta-row">
                        <span><FiClock size={11}/> {slot.time}</span>
                        <span><FiUser size={11}/> {slot.instructor}</span>
                        <span><FiHome size={11}/> {slot.room}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {showModal&&(
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <h3>➕ Add New Class</h3>
              <button className="modal-close" onClick={()=>setShowModal(false)}>✕</button>
            </div>

            {error && (
              <div style={{margin:'0 0 12px',padding:'10px 14px',background:'#fee2e2',color:'#dc2626',borderRadius:8,fontSize:'0.82rem'}}>
                ⚠️ {error}
              </div>
            )}

            <div className="modal-grid">
              <div className="form-group">
                <select value={form.day} onChange={e=>setForm({...form,day:e.target.value})}>
                  {DAYS.map(o=><option key={o}>{o}</option>)}
                </select>
                <label>Day</label>
              </div>

              <div className="form-group">
                <select value={form.batch} onChange={e=>setForm({...form,batch:e.target.value})}>
                  {BATCHES.map(o=><option key={o}>{o}</option>)}
                </select>
                <label>Batch</label>
              </div>

              <div className="form-group">
                <select value={form.level} onChange={e=>setForm({...form,level:e.target.value})}>
                  {LEVELS.map(o=><option key={o}>{o}</option>)}
                </select>
                <label>Level</label>
              </div>

              <div className="form-group">
                <input type="text" placeholder=" " value={form.time} onChange={e=>setForm({...form,time:e.target.value})}/>
                <label>Time (e.g. 7:00 AM)</label>
              </div>

              <div className="form-group">
                <select value={form.course} onChange={e=>setForm({...form,course:e.target.value})}>
                  <option value="">Select Course</option>
                  {courses.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
                <label>Course</label>
              </div>

              <div className="form-group">
                <select value={form.instructor} onChange={e=>setForm({...form,instructor:e.target.value})}>
                  <option value="">Select Instructor</option>
                  {instructors.map(ins=><option key={ins.id} value={ins.name}>{ins.name}</option>)}
                </select>
                <label>Instructor</label>
              </div>

              <div className="form-group">
                <input type="text" placeholder=" " value={form.room} onChange={e=>setForm({...form,room:e.target.value})}/>
                <label>Room / Studio</label>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>Save Class</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
