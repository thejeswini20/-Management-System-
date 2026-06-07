import React, { useState } from 'react';
import { FiPlus, FiCalendar, FiClock, FiUser, FiHome } from 'react-icons/fi';
import { timetable as initData, courses, instructors } from '../../data/data';
import './Dashboard.css';

const courseColors = { Ballet:'#7c3aed','Hip-Hop':'#ec4899',Kathak:'#f59e0b',Contemporary:'#0d9488',Salsa:'#ef4444',Bharatanatyam:'#6366f1' };
const dayIcons = { Monday:'🌙', Tuesday:'🔥', Wednesday:'💫', Thursday:'⚡', Friday:'🎉', Saturday:'🌟', Sunday:'☀️' };

export default function Schedule() {
  const [timetable] = useState(initData);
  const [showModal, setShowModal] = useState(false);
  const [activeDay, setActiveDay] = useState('All');
  const [form, setForm] = useState({ day:'Monday', time:'', course:'', instructor:'', room:'', batch:'Morning' });

  const totalClasses = timetable.reduce((a,d)=>a+d.slots.length,0);
  const days = timetable.map(d=>d.day);
  const displayDays = activeDay==='All' ? timetable : timetable.filter(d=>d.day===activeDay);

  return (
    <div className="dash-page">
      <div className="dash-page-header">
        <div><h1>Class Schedule</h1><p>Weekly timetable across {timetable.length} days</p></div>
        <button className="btn btn-primary" style={{padding:'9px 18px',fontSize:'0.82rem'}} onClick={()=>setShowModal(true)}>
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

      {/* Day filter pills */}
      <div className="day-filter-row">
        <button className={`day-pill${activeDay==='All'?' active':''}`} onClick={()=>setActiveDay('All')}>All Days</button>
        {days.map(d=>(
          <button key={d} className={`day-pill${activeDay===d?' active':''}`} onClick={()=>setActiveDay(d)}>
            {dayIcons[d]} {d}
          </button>
        ))}
      </div>

      {/* Schedule cards */}
      <div className="schedule-grid">
        {displayDays.map((day,di)=>(
          <div key={day.day} className="day-card-premium">
            <div className="day-card-header">
              <span className="day-icon">{dayIcons[day.day]}</span>
              <div><h4>{day.day}</h4><span>{day.slots.length} class{day.slots.length!==1?'es':''}</span></div>
            </div>
            <div className="day-slots-list">
              {day.slots.map((slot,i)=>{
                const color = courseColors[slot.course]||'#7c3aed';
                return (
                  <div key={i} className="slot-item" style={{'--slot-color':color}}>
                    <div className="slot-color-bar" style={{background:color}}/>
                    <div className="slot-content">
                      <div className="slot-top">
                        <strong className="slot-course">{slot.course}</strong>
                        <span className="slot-batch badge" style={{background:color+'18',color}}>{slot.batch}</span>
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
            <div className="modal-grid">
              {[{name:'day',label:'Day',opts:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']},{name:'batch',label:'Batch',opts:['Morning','Evening','Weekend']}].map(f=>(
                <div key={f.name} className="form-group">
                  <select value={form[f.name]} onChange={e=>setForm({...form,[f.name]:e.target.value})}>
                    {f.opts.map(o=><option key={o}>{o}</option>)}
                  </select><label>{f.label}</label>
                </div>
              ))}
              {[{name:'time',label:'Time (e.g. 7:00 AM)'},{name:'course',label:'Course'},{name:'instructor',label:'Instructor'},{name:'room',label:'Room/Studio'}].map(f=>(
                <div key={f.name} className="form-group">
                  <input type="text" placeholder=" " value={form[f.name]} onChange={e=>setForm({...form,[f.name]:e.target.value})}/><label>{f.label}</label>
                </div>
              ))}
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={()=>setShowModal(false)}>Save Class</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
