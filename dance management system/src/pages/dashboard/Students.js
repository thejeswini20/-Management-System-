import React, { useState } from 'react';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiUsers } from 'react-icons/fi';
import { students as initialStudents } from '../../data/data';
import './Dashboard.css';

export default function Students() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', age: '', course: '', batch: '', fee: '', status: 'Active' });
  const [editId, setEditId] = useState(null);

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.course.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    if (!form.name || !form.course) return;
    if (editId) {
      setStudents(students.map(s => s.id === editId ? { ...s, ...form } : s));
    } else {
      setStudents([...students, { ...form, id: Date.now(), joined: 'Jun 2024', avatar: '#7c3aed' }]);
    }
    setShowModal(false); setForm({ name: '', age: '', course: '', batch: '', fee: '', status: 'Active' }); setEditId(null);
  };

  const handleEdit = (s) => { setForm(s); setEditId(s.id); setShowModal(true); };
  const handleDelete = (id) => setStudents(students.filter(s => s.id !== id));

  const activeCount = students.filter(s => s.status === 'Active').length;
  const revenue = students.filter(s => s.status === 'Active').reduce((a, s) => a + Number(s.fee), 0);

  return (
    <div>
      <div className="page-header">
        <h1>Student Management</h1>
        <p>Manage all enrolled students and their information</p>
      </div>

      <div className="stat-grid">
        {[
          { label: 'Total Students', value: students.length, icon: '👥', cls: 'stat-purple' },
          { label: 'Active Students', value: activeCount, icon: '✅', cls: 'stat-green' },
          { label: 'Inactive', value: students.length - activeCount, icon: '⏸️', cls: 'stat-gold' },
          { label: 'Monthly Revenue', value: `₹${revenue.toLocaleString()}`, icon: '💰', cls: 'stat-teal' },
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
          <button className="btn btn-primary" style={{ padding: '10px 20px' }} onClick={() => { setEditId(null); setForm({ name: '', age: '', course: '', batch: '', fee: '', status: 'Active' }); setShowModal(true); }}>
            <FiPlus /> Add Student
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr><th>Student</th><th>Age</th><th>Course</th><th>Batch</th><th>Fee</th><th>Joined</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="avatar" style={{ background: s.avatar, width: 36, height: 36, fontSize: '0.82rem' }}>{s.name[0]}</div>
                      <strong>{s.name}</strong>
                    </div>
                  </td>
                  <td>{s.age}</td>
                  <td>{s.course}</td>
                  <td><span className="badge badge-purple">{s.batch}</span></td>
                  <td><strong style={{ color: 'var(--primary)' }}>₹{Number(s.fee).toLocaleString()}</strong></td>
                  <td>{s.joined}</td>
                  <td><span className={`badge ${s.status === 'Active' ? 'badge-green' : 'badge-red'}`}>{s.status}</span></td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-icon btn-edit" onClick={() => handleEdit(s)}><FiEdit2 /></button>
                      <button className="btn-icon btn-del" onClick={() => handleDelete(s.id)}><FiTrash2 /></button>
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
              <h3><FiUsers style={{ marginRight: 8 }} />{editId ? 'Edit Student' : 'Add New Student'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            {[
              { name: 'name', label: 'Full Name', type: 'text' },
              { name: 'age', label: 'Age', type: 'number' },
              { name: 'course', label: 'Course', type: 'text' },
              { name: 'fee', label: 'Monthly Fee (₹)', type: 'number' },
            ].map(f => (
              <div key={f.name} className="form-group">
                <input type={f.type} placeholder=" " value={form[f.name] || ''} onChange={e => setForm({ ...form, [f.name]: e.target.value })} />
                <label>{f.label}</label>
              </div>
            ))}
            <div className="form-group">
              <select value={form.batch || 'Morning'} onChange={e => setForm({ ...form, batch: e.target.value })}>
                <option>Morning</option><option>Evening</option><option>Weekend</option>
              </select>
              <label>Batch</label>
            </div>
            <div className="form-group">
              <select value={form.status || 'Active'} onChange={e => setForm({ ...form, status: e.target.value })}>
                <option>Active</option><option>Inactive</option>
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
