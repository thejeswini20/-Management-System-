import React from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../data/data';
import './PageStyles.css';

const plans = [
  { name: "Starter", icon: "🌱", price: 2800, desc: "Perfect for beginners exploring dance", features: ["1 dance style", "3 classes/week", "Group batch", "Practice material", "Monthly assessment"], featured: false },
  { name: "Elite", icon: "⭐", price: 3500, desc: "Most popular for dedicated students", features: ["2 dance styles", "5 classes/week", "Small group batch", "Practice material", "Monthly assessment", "1 competition entry"], featured: true },
  { name: "Pro", icon: "🏆", price: 5500, desc: "For aspiring professional dancers", features: ["Unlimited styles", "Daily classes", "Private batch", "Premium material", "Weekly assessment", "All competitions", "Stage performances"], featured: false },
];

export default function Fees() {
  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, #0d9488, #be185d)' }}>
        <div className="container">
          <p className="pre-label-white">Pricing</p>
          <h1>Fee Structure</h1>
          <p>Transparent, simple, no hidden charges</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="pre-label">Membership Plans</p>
            <h2 className="section-title">Choose Your Plan</h2>
            <p className="section-subtitle">All plans include access to our state-of-the-art studios</p>
          </div>
          <div className="fees-grid">
            {plans.map(p => (
              <div key={p.name} className={`fee-card card${p.featured ? ' featured' : ''}`}>
                {p.featured && <span className="badge badge-purple" style={{ marginBottom: 12 }}>Most Popular</span>}
                <div className="fee-icon">{p.icon}</div>
                <h3>{p.name}</h3>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-light)', marginBottom: 16 }}>{p.desc}</p>
                <div className="fee-amount">₹{p.price.toLocaleString()}<small>/month</small></div>
                <ul className="fee-features">
                  {p.features.map(f => <li key={f}>{f}</li>)}
                </ul>
                <Link to="/login" className={`btn ${p.featured ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'center' }}>Get Started</Link>
              </div>
            ))}
          </div>

          <div className="section-header" style={{ marginTop: 32 }}>
            <p className="pre-label">Individual Courses</p>
            <h2 className="section-title">Per-Course Fees</h2>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>Course</th><th>Duration</th><th>Instructor</th><th>Monthly Fee</th><th>Action</th></tr>
              </thead>
              <tbody>
                {courses.map(c => (
                  <tr key={c.id}>
                    <td><span style={{ marginRight: 8 }}>{c.icon}</span><strong>{c.name}</strong></td>
                    <td>{c.duration}</td>
                    <td>{c.instructor}</td>
                    <td><strong style={{ color: 'var(--primary)' }}>₹{c.fee.toLocaleString()}</strong></td>
                    <td><Link to="/login" className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '0.8rem' }}>Enroll</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
