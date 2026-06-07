import React, { useState } from 'react';
import { FiSearch, FiDownload, FiTrendingUp, FiAlertCircle, FiCheckCircle, FiClock } from 'react-icons/fi';
import { payments as initPayments } from '../../data/data';
import './Dashboard.css';

const statusConfig = {
  Paid:    { badge:'badge-green', icon:<FiCheckCircle />,  color:'#16a34a' },
  Pending: { badge:'badge-gold',  icon:<FiClock />,        color:'#b45309' },
  Overdue: { badge:'badge-red',   icon:<FiAlertCircle />,  color:'#dc2626' },
};

export default function FeeMgmt() {
  const [payments] = useState(initPayments);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = payments.filter(p => {
    const q = search.toLowerCase();
    return (p.student.toLowerCase().includes(q)||p.id.toLowerCase().includes(q)) &&
           (filter==='All'||p.status===filter);
  });

  const paidTotal    = payments.filter(p=>p.status==='Paid').reduce((a,p)=>a+p.amount,0);
  const pendingTotal = payments.filter(p=>p.status==='Pending').reduce((a,p)=>a+p.amount,0);
  const overdueTotal = payments.filter(p=>p.status==='Overdue').reduce((a,p)=>a+p.amount,0);
  const totalAll     = paidTotal + pendingTotal + overdueTotal;
  const paidPct      = Math.round(paidTotal/totalAll*100);

  return (
    <div className="dash-page">
      <div className="dash-page-header">
        <div><h1>Fee Management</h1><p>Track payments, dues, and monthly revenue</p></div>
        <button className="btn btn-outline" style={{padding:'9px 16px',fontSize:'0.82rem'}}><FiDownload /> Export CSV</button>
      </div>

      {/* Revenue summary */}
      <div className="revenue-summary">
        <div className="rev-main">
          <div>
            <p className="rev-label">Total Revenue This Month</p>
            <h2 className="rev-amount">₹{paidTotal.toLocaleString()}</h2>
            <span className="rev-trend"><FiTrendingUp /> <strong>+12%</strong> vs last month</span>
          </div>
          <div className="rev-donut">
            <svg viewBox="0 0 100 100" width="110" height="110">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f0ecff" strokeWidth="12"/>
              <circle cx="50" cy="50" r="40" fill="none" stroke="#6d28d9" strokeWidth="12"
                strokeDasharray={`${paidPct*2.51} 251`} strokeDashoffset="62.75" strokeLinecap="round"/>
              <text x="50" y="54" textAnchor="middle" fontSize="16" fontWeight="800" fill="#1e1b4b">{paidPct}%</text>
            </svg>
            <span>Collected</span>
          </div>
        </div>
        <div className="rev-stats">
          <div className="rev-stat" style={{borderColor:'#16a34a22',background:'#f0fdf4'}}>
            <FiCheckCircle style={{color:'#16a34a'}} />
            <div><strong style={{color:'#16a34a'}}>₹{paidTotal.toLocaleString()}</strong><span>Collected</span></div>
          </div>
          <div className="rev-stat" style={{borderColor:'#f59e0b22',background:'#fefce8'}}>
            <FiClock style={{color:'#b45309'}} />
            <div><strong style={{color:'#b45309'}}>₹{pendingTotal.toLocaleString()}</strong><span>Pending</span></div>
          </div>
          <div className="rev-stat" style={{borderColor:'#ef444422',background:'#fff5f5'}}>
            <FiAlertCircle style={{color:'#dc2626'}} />
            <div><strong style={{color:'#dc2626'}}>₹{overdueTotal.toLocaleString()}</strong><span>Overdue</span></div>
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <div className="table-toolbar">
          <div className="toolbar-left">
            <div className="search-box">
              <FiSearch /><input placeholder="Search student or invoice..." value={search} onChange={e=>setSearch(e.target.value)} />
            </div>
            <div className="status-filters">
              {['All','Paid','Pending','Overdue'].map(f=>(
                <button key={f} className={`filter-chip${filter===f?' active':''}`} onClick={()=>setFilter(f)}>{f}</button>
              ))}
            </div>
          </div>
        </div>
        <div style={{overflowX:'auto'}}>
          <table>
            <thead><tr><th>Invoice</th><th>Student</th><th>Course</th><th>Amount</th><th>Date</th><th>Method</th><th>Status</th></tr></thead>
            <tbody>
              {filtered.map(p=>(
                <tr key={p.id}>
                  <td><code className="invoice-code">{p.id}</code></td>
                  <td><strong>{p.student}</strong></td>
                  <td><span className="text-muted">{p.course}</span></td>
                  <td><strong style={{color:'var(--primary)'}}>₹{p.amount.toLocaleString()}</strong></td>
                  <td className="text-muted">{p.date}</td>
                  <td>{p.method!=='—'?<span className="badge badge-purple">{p.method}</span>:<span className="text-muted">—</span>}</td>
                  <td>
                    <span className={`status-pill ${p.status.toLowerCase()}`}>
                      {statusConfig[p.status].icon} {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>Showing <strong>{filtered.length}</strong> of <strong>{payments.length}</strong> invoices</span>
          <strong style={{color:'var(--primary)'}}>Collected: ₹{paidTotal.toLocaleString()}</strong>
        </div>
      </div>
    </div>
  );
}
