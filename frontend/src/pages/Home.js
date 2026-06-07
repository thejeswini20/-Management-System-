import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiUsers, FiAward, FiMusic, FiInstagram, FiFacebook, FiYoutube, FiPlay } from 'react-icons/fi';
import { courses, testimonials } from '../data/data';
import './Home.css';

/* ── Animated counter hook ── */
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

/* ── 3D Dance pose cards data ── */
const dancePoses = [
  { img: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=500&q=90", style: "Ballet", color: "#7c3aed", light: "#ede9fe" },
  { img: "https://harpeggioacademy.com/wp-content/uploads/2020/09/hip-hop-western-dance.jpg", style: "Hip-Hop", color: "#ec4899", light: "#fce7f3" },
  { img: "https://thumbs.dreamstime.com/b/mysore-india-june-kathak-artist-beautiful-performance-mysore-india-june-kathak-artist-beautifully-performs-187100221.jpg", style: "Kathak", color: "#f59e0b", light: "#fef3c7" },
  { img: "https://nrityacreations.com/wp-content/uploads/2022/02/Article3.jpg", style: "Contemporary", color: "#0d9488", light: "#ccfbf1" },
  { img: "https://t4.ftcdn.net/jpg/05/16/29/71/360_F_516297190_K0EWU3OgMejuE72ZQTtCSGNd5gfyngHQ.jpg", style: "Salsa", color: "#ef4444", light: "#fee2e2" },
  { img: "https://i.pinimg.com/736x/00/c2/95/00c29550b9aecde2831faea8d37beac0.jpg", style: "Bharatanatyam", color: "#6366f1", light: "#e0e7ff" },
];

/* ── 3D Tilt Card Component ── */
function TiltCard({ img, style, color, light }) {
  const cardRef = useRef(null);
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04,1.04,1.04)`;
  };
  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
  };
  return (
    <div
      ref={cardRef}
      className="dance-3d-card"
      style={{ '--card-color': color, '--card-light': light }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="dance-3d-img-wrap">
        <img src={img} alt={style} />
        <div className="dance-3d-shine" />
      </div>
      <div className="dance-3d-label">
        <span className="dance-3d-dot" style={{ background: color }} />
        {style}
      </div>
    </div>
  );
}

/* ── Stats counter section ── */
const stats = [
  { value: 500, suffix: '+', label: 'Happy Students', icon: <FiUsers /> },
  { value: 12, suffix: '+', label: 'Dance Styles', icon: <FiMusic /> },
  { value: 15, suffix: '+', label: 'Expert Instructors', icon: <FiAward /> },
  { value: 8, suffix: ' yrs', label: 'Of Excellence', icon: <FiStar /> },
];

function StatsSection() {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const c0 = useCounter(stats[0].value, 2000, started);
  const c1 = useCounter(stats[1].value, 1500, started);
  const c2 = useCounter(stats[2].value, 1800, started);
  const c3 = useCounter(stats[3].value, 1200, started);
  const counts = [c0, c1, c2, c3];
  return (
    <section className="section stats-section" ref={ref}>
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stats-item">
              <div className="stats-icon">{s.icon}</div>
              <div className="stats-number">{counts[i]}{s.suffix}</div>
              <div className="stats-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Hero background slideshow images — all pure dancing */
const heroBgSlides = [
  "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=1920&q=90",
  "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=1920&q=90",
  "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=1920&q=90",
  "https://upload.wikimedia.org/wikipedia/commons/c/c9/Kathak_contemporary_03.jpg",
];

const heroDancers = [
  { src: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400&q=80", cls: "hd1", alt: "Ballet" },
  { src: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=400&q=80", cls: "hd2", alt: "Hip-hop" },
  { src: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400&q=80", cls: "hd3", alt: "Contemporary" },
  { src: "https://static.vecteezy.com/system/resources/thumbnails/046/276/203/small/giraffes-in-a-red-dress-are-dancing-in-a-smoke-filled-room-photo.jpg", cls: "hd4", alt: "Salsa" },
];

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % heroBgSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home page-fade-in">

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg">
          {heroBgSlides.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className={`hero-bg-img hero-slide${i === slideIndex ? ' active' : ''}`}
            />
          ))}
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
          {/* Slide dots */}
          <div className="hero-slide-dots">
            {heroBgSlides.map((_, i) => (
              <button key={i} className={`slide-dot${i === slideIndex ? ' active' : ''}`} onClick={() => setSlideIndex(i)} />
            ))}
          </div>
        </div>
        <div className="container hero-content">
          <p className="hero-tagline">✦ Premier Dance Academy Since 2016</p>
          <h1 className="hero-title">
            Where Passion<br />
            <span className="gradient-text">Meets Rhythm</span>
          </h1>
          <p className="hero-subtitle">
            Discover the art of movement through world-class instruction in Ballet, Hip-Hop, Kathak, Contemporary, and more.
          </p>
          <div className="hero-actions">
            <Link to="/courses" className="btn btn-accent">Explore Courses <FiArrowRight /></Link>
            <Link to="/fees" className="btn btn-outline-white"><FiPlay size={14} /> Join Academy</Link>
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

      {/* ── 3D DANCE STYLES SHOWCASE ── */}
      <section className="section dance-3d-section">
        <div className="container">
          <div className="section-header">
            <p className="pre-label">Our Art Forms</p>
            <h2 className="section-title">Experience Dance in 3D</h2>
            <p className="section-subtitle">Hover over each card to feel the movement</p>
          </div>
          <div className="dance-3d-grid">
            {dancePoses.map((d, i) => <TiltCard key={i} {...d} />)}
          </div>
        </div>
      </section>

      {/* ── ANIMATED STATS ── */}
      <StatsSection />

      {/* ── WHY US ── */}
      <section className="section why-us">
        <div className="container">
          <div className="why-us-inner">
            <div className="why-us-left">
              <p className="pre-label">Why Choose Us</p>
              <h2 className="section-title" style={{ marginBottom: 16 }}>The Rhythmique<br />Difference</h2>
              <p style={{ color: 'var(--text-light)', lineHeight: 1.8, marginBottom: 32, fontSize: '0.95rem' }}>
                We don't just teach dance — we build confidence, discipline, and a lifelong love for the art. Our approach combines classical tradition with modern teaching methods.
              </p>
              <div className="why-list">
                {[
                  { icon: <FiAward />, t: "Award-Winning Faculty", d: "National-level performers with 5–15 years of experience." },
                  { icon: <FiMusic />, t: "12+ Dance Styles", d: "Classical to contemporary — every style under one roof." },
                  { icon: <FiUsers />, t: "Small Batch Sizes", d: "Max 15 students per batch for personal attention." },
                  { icon: <FiStar />, t: "Performance Opportunities", d: "Recitals, competitions, and stage shows every season." },
                ].map((item, i) => (
                  <div key={i} className="why-item">
                    <div className="why-item-icon">{item.icon}</div>
                    <div><strong>{item.t}</strong><p>{item.d}</p></div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn btn-primary" style={{ marginTop: 8 }}>Learn More About Us <FiArrowRight /></Link>
            </div>
            <div className="why-us-right">
              <div className="why-img-stack">
                <div className="why-img-main">
                  <img src="https://t3.ftcdn.net/jpg/03/65/13/52/360_F_365135250_D4slgOo8wAYADnqNvaMtR9hIu17ySXmV.jpg" alt="Dance class" />
                </div>
                <div className="why-img-small">
                  <img src="https://images.stockcake.com/public/4/9/b/49b84fa6-1a91-4916-acc5-9f6f61801928_large/ballet-dancer-illuminated-stockcake.jpg" alt="Ballet" />
                </div>
                 <div className="why-floating-badge">
                   <span className="wfb-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b', fontSize: '1.5rem' }}><FiAward /></span>
                   <div><strong>Best Academy</strong><span>National Arts Award 2022</span></div>
                 </div>
              </div>
            </div>
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
                    <Link to="/fees" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.8rem' }}>Enroll <FiArrowRight /></Link>
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
                  <div><strong>{t.name}</strong><small>{t.role}</small></div>
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
            <img src="https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=1400&q=85" alt="" className="cta-bg-img" />
            <div className="cta-overlay" />
            <div className="cta-shapes"><div className="cs1"/><div className="cs2"/></div>
            <div className="cta-content">
              <p className="pre-label" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', marginBottom: 16 }}>Start Today</p>
              <h2>Ready to Start Your Dance Journey?</h2>
              <p>Join 500+ students who have discovered their passion at Rhythmique Dance Academy</p>
              <div className="cta-actions">
                <Link to="/fees" className="btn btn-accent">Register Now <FiArrowRight /></Link>
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
              <a href="#" aria-label="Instagram"><FiInstagram /></a>
              <a href="#" aria-label="Facebook"><FiFacebook /></a>
              <a href="#" aria-label="YouTube"><FiYoutube /></a>
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
