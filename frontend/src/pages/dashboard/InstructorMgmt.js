import React, { useState } from 'react';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiStar, FiUsers, FiAward } from 'react-icons/fi';
import { instructors as initData } from '../../data/data';
import './Dashboard.css';

export default function InstructorMgmt() {
  const [instructors, setInstructors] = useState(initData);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name:'', specialization:'', experience:'', status:'Active' });
  const [editId, setEditId] = useState(null);

  const filtered = instructors.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.specialization.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    if (!form.name) return;
    if (editId) setInstructors(instructors.map(i => i.id===editId ? {...i,...form} : i));
    else setInstructors([...instructors, { ...form, id:Date.now(), students:0, rating:4.5, avatar:'#6366f1', image:'' }]);
    setShowModal(false); setForm({ name:'', specialization:'', experience:'', status:'Active' }); setEditId(null);
  };
  const openEdit = (inst) => { setForm(inst); setEditId(inst.id); setShowModal(true); };
  const handleDelete = (id) => setInstructors(instructors.filter(i => i.id!==id));
  const avgRating = (instructors.reduce((a,i) => a+i.rating,0)/instructors.length).toFixed(1);

  const StarRating = ({ val }) => (
    <div className="star-rating">
      {[1,2,3,4,5].map(i => (
        <FiStar key={i} className={i<=Math.round(val)?'star-filled':'star-empty'} />
      ))}
      <span>{val}</span>
    </div>
  );

  return (
    <div className="dash-page">
      <div className="dash-page-header">
        <div><h1>Instructor Management</h1><p>Manage {instructors.length} faculty members</p></div>
        <button className="btn btn-primary" style={{padding:'9px 18px',fontSize:'0.82rem'}} onClick={() => { setEditId(null); setForm({name:'',specialization:'',experience:'',status:'Active'}); setShowModal(true); }}>
          <FiPlus /> Add Instructor
        </button>
      </div>

      <div className="stat-grid">
        {[
          { label:'Total Faculty', value:instructors.length, icon:<FiAward />, cls:'stat-purple' },
          { label:'Active', value:instructors.filter(i=>i.status==='Active').length, icon:'✅', cls:'stat-green' },
          { label:'On Leave', value:instructors.filter(i=>i.status==='On Leave').length, icon:'🏖', cls:'stat-gold' },
          { label:'Avg Rating', value:`${avgRating} ★`, icon:<FiStar />, cls:'stat-teal' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.cls}`}>{s.icon}</div>
            <div className="stat-info"><h3>{s.value}</h3><p>{s.label}</p></div>
          </div>
        ))}
      </div>

      {/* Instructor Cards */}
      <div className="search-bar-row">
        <div className="search-box">
          <FiSearch /><input placeholder="Search instructors..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="instructor-card-grid">
        {filtered.map(inst => (
          <div key={inst.id} className="inst-card card">
            <div className="inst-card-img-wrap">
              {inst.image ? (
                <img src={inst.image} alt={inst.name} className="inst-card-img" />
              ) : (
                <div className="inst-card-placeholder" style={{background:inst.avatar}}>
                  {inst.name.split(' ').map(n=>n[0]).join('')}
                </div>
              )}
              <span className={`inst-status-badge badge ${inst.status==='Active'?'badge-green':'badge-gold'}`}>{inst.status}</span>
            </div>
            <div className="inst-card-body">
              <h4>{inst.name}</h4>
              <p className="inst-spec">{inst.specialization}</p>
              <StarRating val={inst.rating} />
              <div className="inst-card-stats">
                <div><FiUsers size={13}/> <strong>{inst.students}</strong> <span>Students</span></div>
                <div><FiAward size={13}/> <strong>{inst.experience}</strong> <span>Exp</span></div>
              </div>
              <div className="inst-card-actions">
                <button className="btn btn-outline" style={{flex:1,padding:'7px',fontSize:'0.78rem',justifyContent:'center'}} onClick={() => openEdit(inst)}><FiEdit2 /> Edit</button>
                <button className="btn-icon btn-del" onClick={() => handleDelete(inst.id)}><FiTrash2 /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={e => e.target===e.currentTarget&&setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <h3>{editId?'✏️ Edit Instructor':'➕ Add Instructor'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            {[{name:'name',label:'Full Name'},{name:'specialization',label:'Specialization'},{name:'experience',label:'Experience (e.g. 5 yrs)'}].map(f => (
              <div key={f.name} className="form-group">
                <input type="text" placeholder=" " value={form[f.name]||''} onChange={e => setForm({...form,[f.name]:e.target.value})} />
                <label>{f.label}</label>
              </div>
            ))}
            <div className="form-group">
              <select value={form.status||'Active'} onChange={e => setForm({...form,status:e.target.value})}>
                <option>Active</option><option>On Leave</option><option>Inactive</option>
              </select>
              <label>Status</label>
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
