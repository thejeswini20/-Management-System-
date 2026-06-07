import React, { useState } from 'react';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiStar } from 'react-icons/fi';
import { instructors as initData } from '../../data/data';
import './Dashboard.css';

export default function InstructorMgmt() {
  const [instructors, setInstructors] = useState(initData);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', specialization: '', experience: '', status: 'Active' });
  const [editId, setEditId] = useState(null);

  const filtered = instructors.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.specialization.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    if (!form.name) return;
    if (editId) {
      setInstructors(instructors.map(i => i.id === editId ? { ...i, ...form } : i));
    } else {
      setInstructors([...instructors, { ...form, id: Date.now(), students: 0, rating: 4.5, avatar: '#6366f1' }]);
    }
    setShowModal(false); setForm({ name: '', specialization: '', experience: '', status: 'Active' }); setEditId(null);
  };

  const handleEdit = (inst) => { setForm(inst); setEditId(inst.id); setShowModal(true); };
  const handleDelete = (id) => setInstructors(instructors.filter(i => i.id !== id));

  return (
    <div>
      <div className="page-header">
        <h1>Instructor Management</h1>
        <p>Manage faculty, specializations, and performance</p>
      </div>

      <div className="stat-grid">
        {[
          { label: 'Total Instructors', value: instructors.length, icon: '🎓', cls: 'stat-purple' },
          { label: 'Active', value: instructors.filter(i => i.status === 'Active').length, icon: '✅', cls: 'stat-green' },
          { label: 'On Leave', value: instructors.filter(i => i.status === 'On Leave').length, icon: '🏖️', cls: 'stat-gold' },
          { label: 'Avg Rating', value: (instructors.reduce((a, i) => a + i.rating, 0) / instructors.length).toFixed(1) + ' ★', icon: '⭐', cls: 'stat-teal' },
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
            <FiSearch /><input placeholder="Search instructors..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn btn-primary" style={{ padding: '10px 20px' }} onClick={() => { setEditId(null); setForm({ name: '', specialization: '', experience: '', status: 'Active' }); setShowModal(true); }}>
            <FiPlus /> Add Instructor
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr><th>Instructor</th><th>Specialization</th><th>Experience</th><th>Students</th><th>Rating</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(inst => (
                <tr key={inst.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="avatar" style={{ background: inst.avatar }}>{inst.name.split(' ')[1]?.[0]}</div>
                      <strong>{inst.name}</strong>
                    </div>
                  </td>
                  <td>{inst.specialization}</td>
                  <td>{inst.experience}</td>
                  <td>{inst.students}</td>
                  <td><span style={{ color: '#f59e0b', fontWeight: 600 }}><FiStar style={{ verticalAlign: 'middle' }} /> {inst.rating}</span></td>
                  <td><span className={`badge ${inst.status === 'Active' ? 'badge-green' : 'badge-gold'}`}>{inst.status}</span></td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-icon btn-edit" onClick={() => handleEdit(inst)}><FiEdit2 /></button>
                      <button className="btn-icon btn-del" onClick={() => handleDelete(inst.id)}><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <h3>{editId ? 'Edit Instructor' : 'Add Instructor'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            {[
              { name: 'name', label: 'Full Name' },
              { name: 'specialization', label: 'Specialization' },
              { name: 'experience', label: 'Experience (e.g. 5 yrs)' },
            ].map(f => (
              <div key={f.name} className="form-group">
                <input type="text" placeholder=" " value={form[f.name] || ''} onChange={e => setForm({ ...form, [f.name]: e.target.value })} />
                <label>{f.label}</label>
              </div>
            ))}
            <div className="form-group">
              <select value={form.status || 'Active'} onChange={e => setForm({ ...form, status: e.target.value })}>
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
