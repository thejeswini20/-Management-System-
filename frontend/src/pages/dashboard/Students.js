import React, { useState } from 'react';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiUsers, FiGrid, FiList, FiDownload } from 'react-icons/fi';
import { students as initialStudents } from '../../data/data';
import './Dashboard.css';

const courseColors = { Ballet:'#7c3aed', 'Hip-Hop':'#ec4899', Kathak:'#f59e0b', Contemporary:'#0d9488', Salsa:'#ef4444', Bharatanatyam:'#6366f1' };

export default function Students() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState('');
  const [view, setView] = useState('table');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name:'', age:'', course:'', batch:'', fee:'', status:'Active' });
  const [editId, setEditId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = students.filter(s => {
    const q = search.toLowerCase();
    const matchQ = s.name.toLowerCase().includes(q) || s.course.toLowerCase().includes(q);
    const matchS = filterStatus === 'All' || s.status === filterStatus;
    return matchQ && matchS;
  });

  const handleSave = () => {
    if (!form.name || !form.course) return;
    if (editId) setStudents(students.map(s => s.id === editId ? { ...s, ...form } : s));
    else setStudents([...students, { ...form, id: Date.now(), joined: 'Jun 2024', avatar: courseColors[form.course] || '#7c3aed' }]);
    setShowModal(false); setForm({ name:'', age:'', course:'', batch:'', fee:'', status:'Active' }); setEditId(null);
  };
  const openEdit = (s) => { setForm(s); setEditId(s.id); setShowModal(true); };
  const handleDelete = (id) => setStudents(students.filter(s => s.id !== id));

  const active = students.filter(s => s.status === 'Active').length;
  const revenue = students.filter(s => s.status === 'Active').reduce((a, s) => a + Number(s.fee), 0);
  const courses = [...new Set(students.map(s => s.course))];

  return (
    <div className="dash-page">
      {/* Header */}
      <div className="dash-page-header">
        <div>
          <h1>Student Management</h1>
          <p>Manage {students.length} enrolled students across {courses.length} courses</p>
        </div>
        <div className="dash-page-actions">
          <button className="btn btn-outline" style={{padding:'9px 16px',fontSize:'0.82rem'}}><FiDownload /> Export</button>
          <button className="btn btn-primary" style={{padding:'9px 18px',fontSize:'0.82rem'}} onClick={() => { setEditId(null); setForm({ name:'', age:'', course:'', batch:'', fee:'', status:'Active' }); setShowModal(true); }}>
            <FiPlus /> Add Student
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stat-grid">
        {[
          { label:'Total Students', value:students.length, icon:<FiUsers />, cls:'stat-purple', trend:'+3 this month' },
          { label:'Active Students', value:active, icon:'✅', cls:'stat-green', trend:`${Math.round(active/students.length*100)}% active` },
          { label:'Inactive', value:students.length - active, icon:'⏸', cls:'stat-gold', trend:'Need follow-up' },
          { label:'Monthly Revenue', value:`₹${(revenue/1000).toFixed(1)}k`, icon:'💰', cls:'stat-teal', trend:`₹${revenue.toLocaleString()} total` },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.cls}`}>{s.icon}</div>
            <div className="stat-info">
              <h3>{s.value}</h3>
              <p>{s.label}</p>
              <span className="stat-trend">{s.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Course distribution mini bars */}
      <div className="course-dist-card">
        <h4>Students by Course</h4>
        <div className="course-dist-bars">
          {courses.map(c => {
            const count = students.filter(s => s.course === c).length;
            const pct = Math.round(count / students.length * 100);
            return (
              <div key={c} className="dist-bar-item">
                <div className="dist-bar-label"><span className="dist-dot" style={{background: courseColors[c]||'#7c3aed'}} />{c}</div>
                <div className="dist-bar-track"><div className="dist-bar-fill" style={{width:`${pct}%`, background: courseColors[c]||'#7c3aed'}} /></div>
                <span className="dist-bar-val">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Table / Card toggle */}
      <div className="table-wrapper">
        <div className="table-toolbar">
          <div className="toolbar-left">
            <div className="search-box">
              <FiSearch /><input placeholder="Search by name or course..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="status-filters">
              {['All','Active','Inactive'].map(f => (
                <button key={f} className={`filter-chip${filterStatus===f?' active':''}`} onClick={() => setFilterStatus(f)}>{f}</button>
              ))}
            </div>
          </div>
          <div className="view-toggle">
            <button className={view==='table'?'active':''} onClick={() => setView('table')}><FiList /></button>
            <button className={view==='card'?'active':''} onClick={() => setView('card')}><FiGrid /></button>
          </div>
        </div>

        {view === 'table' ? (
          <div style={{overflowX:'auto'}}>
            <table>
              <thead><tr><th>Student</th><th>Age</th><th>Course</th><th>Batch</th><th>Fee</th><th>Joined</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id}>
                    <td>
                      <div className="student-cell">
                        <div className="avatar" style={{background:s.avatar||courseColors[s.course]||'#7c3aed',width:36,height:36,fontSize:'0.82rem'}}>{s.name[0]}</div>
                        <div><strong>{s.name}</strong><span className="cell-sub">{s.course}</span></div>
                      </div>
                    </td>
                    <td>{s.age}</td>
                    <td><span className="course-pill" style={{background:(courseColors[s.course]||'#7c3aed')+'18',color:courseColors[s.course]||'#7c3aed'}}>{s.course}</span></td>
                    <td><span className="badge badge-purple">{s.batch}</span></td>
                    <td><strong style={{color:'var(--primary)'}}>₹{Number(s.fee).toLocaleString()}</strong></td>
                    <td className="text-muted">{s.joined}</td>
                    <td><span className={`badge ${s.status==='Active'?'badge-green':'badge-red'}`}>{s.status}</span></td>
                    <td><div className="action-btns">
                      <button className="btn-icon btn-edit" onClick={() => openEdit(s)}><FiEdit2 /></button>
                      <button className="btn-icon btn-del" onClick={() => handleDelete(s.id)}><FiTrash2 /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="student-card-grid">
            {filtered.map(s => (
              <div key={s.id} className="student-card">
                <div className="sc-header" style={{background:`linear-gradient(135deg, ${courseColors[s.course]||'#7c3aed'}22, ${courseColors[s.course]||'#7c3aed'}08)`}}>
                  <div className="avatar sc-avatar" style={{background:courseColors[s.course]||'#7c3aed',width:52,height:52,fontSize:'1.2rem'}}>{s.name[0]}</div>
                  <span className={`badge ${s.status==='Active'?'badge-green':'badge-red'}`}>{s.status}</span>
                </div>
                <div className="sc-body">
                  <h4>{s.name}</h4>
                  <p className="sc-course" style={{color:courseColors[s.course]||'#7c3aed'}}>{s.course}</p>
                  <div className="sc-meta">
                    <span>Age {s.age}</span><span>{s.batch}</span><span>₹{Number(s.fee).toLocaleString()}/mo</span>
                  </div>
                  <div className="sc-actions">
                    <button className="btn btn-outline" style={{padding:'6px 14px',fontSize:'0.78rem'}} onClick={() => openEdit(s)}><FiEdit2 /> Edit</button>
                    <button className="btn-icon btn-del" onClick={() => handleDelete(s.id)}><FiTrash2 /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="table-footer">
          <span>Showing <strong>{filtered.length}</strong> of <strong>{students.length}</strong> students</span>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={e => e.target===e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <h3>{editId ? '✏️ Edit Student' : '➕ Add New Student'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-grid">
              {[{name:'name',label:'Full Name',type:'text'},{name:'age',label:'Age',type:'number'},{name:'fee',label:'Monthly Fee (₹)',type:'number'}].map(f => (
                <div key={f.name} className="form-group">
                  <input type={f.type} placeholder=" " value={form[f.name]||''} onChange={e => setForm({...form,[f.name]:e.target.value})} />
                  <label>{f.label}</label>
                </div>
              ))}
              <div className="form-group">
                <select value={form.course||''} onChange={e => setForm({...form,course:e.target.value})}>
                  <option value="">Select Course</option>
                  {['Ballet','Hip-Hop','Kathak','Contemporary','Salsa','Bharatanatyam'].map(c => <option key={c}>{c}</option>)}
                </select>
                <label>Course</label>
              </div>
              <div className="form-group">
                <select value={form.batch||'Morning'} onChange={e => setForm({...form,batch:e.target.value})}>
                  <option>Morning</option><option>Evening</option><option>Weekend</option>
                </select>
                <label>Batch</label>
              </div>
              <div className="form-group">
                <select value={form.status||'Active'} onChange={e => setForm({...form,status:e.target.value})}>
                  <option>Active</option><option>Inactive</option>
                </select>
                <label>Status</label>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>Save Student</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
