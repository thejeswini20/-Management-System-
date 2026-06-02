import React, { useState } from 'react';
import { FiSearch, FiDownload } from 'react-icons/fi';
import { payments as initPayments } from '../../data/data';
import './Dashboard.css';

const statusBadge = { Paid: 'badge-green', Pending: 'badge-gold', Overdue: 'badge-red' };

export default function FeeMgmt() {
  const [payments] = useState(initPayments);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = payments.filter(p => {
    const matchSearch = p.student.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || p.status === filter;
    return matchSearch && matchFilter;
  });

  const paidTotal = payments.filter(p => p.status === 'Paid').reduce((a, p) => a + p.amount, 0);
  const pendingTotal = payments.filter(p => p.status === 'Pending').reduce((a, p) => a + p.amount, 0);
  const overdueTotal = payments.filter(p => p.status === 'Overdue').reduce((a, p) => a + p.amount, 0);

  return (
    <div>
      <div className="page-header">
        <h1>Fee Management</h1>
        <p>Track payments, dues, and revenue</p>
      </div>

      <div className="stat-grid">
        {[
          { label: 'Total Collected', value: `₹${paidTotal.toLocaleString()}`, icon: '💰', cls: 'stat-green' },
          { label: 'Pending Amount', value: `₹${pendingTotal.toLocaleString()}`, icon: '⏳', cls: 'stat-gold' },
          { label: 'Overdue Amount', value: `₹${overdueTotal.toLocaleString()}`, icon: '⚠️', cls: 'stat-pink' },
          { label: 'Total Invoices', value: payments.length, icon: '🧾', cls: 'stat-purple' },
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
            <FiSearch /><input placeholder="Search by student or invoice..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {['All', 'Paid', 'Pending', 'Overdue'].map(f => (
              <button key={f} className={`filter-btn${filter === f ? ' active' : ''}`} style={{ padding: '7px 14px', fontSize: '0.8rem' }} onClick={() => setFilter(f)}>{f}</button>
            ))}
            <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.82rem' }}><FiDownload /> Export</button>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr><th>Invoice</th><th>Student</th><th>Course</th><th>Amount</th><th>Date</th><th>Method</th><th>Status</th></tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td><code style={{ background: '#f5f3ff', color: 'var(--primary)', padding: '3px 8px', borderRadius: 6, fontSize: '0.82rem' }}>{p.id}</code></td>
                  <td><strong>{p.student}</strong></td>
                  <td>{p.course}</td>
                  <td><strong style={{ color: 'var(--primary)' }}>₹{p.amount.toLocaleString()}</strong></td>
                  <td>{p.date}</td>
                  <td>{p.method !== '—' ? <span className="badge badge-purple">{p.method}</span> : '—'}</td>
                  <td><span className={`badge ${statusBadge[p.status]}`}>{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '14px 20px', background: '#f8f4ff', borderTop: '1px solid #ede9fe', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--text-light)' }}>Showing {filtered.length} of {payments.length} invoices</span>
          <strong style={{ color: 'var(--primary)' }}>Collected: ₹{paidTotal.toLocaleString()}</strong>
        </div>
      </div>
    </div>
  );
}
