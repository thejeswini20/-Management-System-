import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiUsers, FiAward, FiMusic, FiInstagram, FiFacebook, FiYoutube } from 'react-icons/fi';
import { courses, testimonials } from '../data/data';
import './Home.css';

const heroDancers = [
  { src: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=300&q=80", cls: "hd1", alt: "Ballet" },
  { src: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=300&q=80", cls: "hd2", alt: "Hip-hop" },
  { src: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=300&q=80", cls: "hd3", alt: "Contemporary" },
  { src: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=300&q=80", cls: "hd4", alt: "Salsa" },
];

const features = [
  { icon: <FiAward />, title: "Award-Winning Faculty", desc: "National-level performers with 5–15 years of teaching experience.", color: "#ede9fe", img: "https://images.unsplash.com/photo-1554743395-0e89eaf6b9e5?w=400&q=80" },
  { icon: <FiMusic />, title: "12+ Dance Styles", desc: "From classical Bharatanatyam to contemporary Hip-Hop — find your rhythm.", color: "#fce7f3", img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&q=80" },
  { icon: <FiUsers />, title: "Small Batch Sizes", desc: "Personalized attention with a maximum of 15 students per batch.", color: "#fef3c7", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80" },
  { icon: <FiStar />, title: "Performance Opportunities", desc: "Regular recitals, competitions, and stage performances for all students.", color: "#ccfbf1", img: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&q=80" },
];

export default function Home() {
  return (
    <div className="home">
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1547153760-18fc86324498?w=1600&q=80" alt="" className="hero-bg-img" />
          <div className="hero-overlay" />
          <div className="hero-shapes">
            <div className="shape shape1" /><div className="shape shape2" /><div className="shape shape3" />
          </div>
          <div className="dancing-figures">
            {heroDancers.map((d, i) => (
              <div key={i} className={`dancer-float ${d.cls}`}>
                <img src={d.src} alt={d.alt} />
              </div>
            ))}
          </div>
        </div>

        <div className="container hero-content">
          <p className="hero-tagline">✦ Premier Dance Academy</p>
          <h1 className="hero-title">
            Where Passion<br />
            <span className="gradient-text">Meets Rhythm</span>
          </h1>
          <p className="hero-subtitle">
            Discover the art of movement through world-class instruction in Ballet, Hip-Hop, Kathak, Contemporary, and more. Your dance journey starts here.
          </p>
          <div className="hero-actions">
            <Link to="/courses" className="btn btn-accent">Explore Courses <FiArrowRight /></Link>
            <Link to="/login" className="btn btn-outline-white">Join Academy</Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><strong>500+</strong><span>Students</span></div>
            <div className="hero-stat-divider" />
            <div className="hero-stat"><strong>12+</strong><span>Dance Styles</span></div>
            <div className="hero-stat-divider" />
            <div className="hero-stat"><strong>15+</strong><span>Instructors</span></div>
            <div className="hero-stat-divider" />
            <div className="hero-stat"><strong>8 yrs</strong><span>Excellence</span></div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-dot" /><div className="scroll-dot" /><div className="scroll-dot" />
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="section why-us">
        <div className="container">
          <div className="section-header">
            <p className="pre-label">Why Choose Us</p>
            <h2 className="section-title">The Rhythmique Difference</h2>
            <p className="section-subtitle">More than a dance school — a community of artists</p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card card">
                <div className="feature-img-wrap">
                  <img src={f.img} alt={f.title} className="feature-img" />
                  <div className="feature-icon-badge" style={{ background: f.color }}>{f.icon}</div>
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSES ── */}
      <section className="section courses-preview">
        <div className="container">
          <div className="section-header">
            <p className="pre-label">Our Programs</p>
            <h2 className="section-title">Dance Styles We Teach</h2>
            <p className="section-subtitle">Expert-led programs for every age and skill level</p>
          </div>
          <div className="courses-grid">
            {courses.map(c => (
              <div key={c.id} className="course-card card">
                <div className="course-img-wrap">
                  <img src={c.image} alt={c.name} className="course-img" />
                  <div className="course-img-overlay">
                    <span className="course-name-overlay">{c.name}</span>
                  </div>
                </div>
                <div className="course-body">
                  <div className="course-top">
                    <h3>{c.name}</h3>
                    <span className="badge badge-purple">{c.level}</span>
                  </div>
                  <p>{c.desc}</p>
                  <div className="course-meta">
                    <span>⏱ {c.duration}</span>
                    <span>👥 {c.students} students</span>
                  </div>
                  <div className="course-footer">
                    <span className="course-fee">₹{c.fee.toLocaleString()}<small>/month</small></span>
                    <Link to="/login" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.8rem' }}>Enroll <FiArrowRight /></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section testimonials">
        <div className="container">
          <div className="section-header">
            <p className="pre-label">Testimonials</p>
            <h2 className="section-title">What They Say</h2>
            <p className="section-subtitle">Stories from our dance family</p>
          </div>
          <div className="testi-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testi-card card">
                <div className="testi-stars">{'★'.repeat(5)}</div>
                <p className="testi-text">"{t.text}"</p>
                <div className="testi-author">
                  <img src={t.image} alt={t.name} className="testi-avatar-img" />
                  <div>
                    <strong>{t.name}</strong>
                    <small>{t.role}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-box">
            <img src="https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=1200&q=80" alt="" className="cta-bg-img" />
            <div className="cta-overlay" />
            <div className="cta-shapes"><div className="cs1"/><div className="cs2"/></div>
            <div className="cta-content">
              <h2>Ready to Start Your Dance Journey?</h2>
              <p>Join 500+ students who have discovered their passion at Rhythmique Dance Academy</p>
              <div className="cta-actions">
                <Link to="/login" className="btn btn-accent">Register Now <FiArrowRight /></Link>
                <Link to="/timetable" className="btn btn-outline-white">View Timetable</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <span className="footer-logo">Rhythmique</span>
            <p>Premier dance academy committed to artistic excellence and nurturing the next generation of dancers since 2016.</p>
            <div className="footer-social">
              <a href="#"><FiInstagram /></a>
              <a href="#"><FiFacebook /></a>
              <a href="#"><FiYoutube /></a>
            </div>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <Link to="/courses">Courses</Link>
            <Link to="/instructors">Instructors</Link>
            <Link to="/timetable">Timetable</Link>
            <Link to="/fees">Fees</Link>
            <Link to="/about">About Us</Link>
          </div>
          <div className="footer-contact">
            <h4>Contact</h4>
            <p><span>📍</span> 12 Harmony Lane, Bandra, Mumbai</p>
            <p><span>📞</span> +91 98765 43210</p>
            <p><span>✉️</span> info@rhythmique.in</p>
            <p><span>🕐</span> Mon–Sat: 6 AM – 9 PM</p>
          </div>
        </div>
        <div className="footer-bottom container">
          <span>© 2024 Rhythmique Dance Academy. All rights reserved.</span>
          <span>Made with ♥ for dancers</span>
        </div>
      </footer>
    </div>
  );
}
