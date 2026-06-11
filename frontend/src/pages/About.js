import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PageStyles.css';

const milestones = [
  { year: "2016", event: "Rhythmique founded with 3 instructors and 40 students", icon: "🎭" },
  { year: "2018", event: "Expanded to 3 studios and added classical dance programs", icon: "🏛️" },
  { year: "2020", event: "Launched online classes; reached 300+ students nationwide", icon: "💻" },
  { year: "2022", event: "Won Best Dance Academy award at National Arts Festival", icon: "🏆" },
  { year: "2024", event: "500+ active students, 15 instructors, 12 dance styles", icon: "⭐" },
];

const galleryImgs = [
  { src: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&q=80", label: "Ballet", category: "Classical" },
  { src: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=800&q=80", label: "Hip-Hop", category: "Urban" },
  { src: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800&q=80", label: "Contemporary", category: "Modern" },
  { src: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&q=80", label: "Flamenco", category: "Cultural" },
];

const stats = [
  { value: "500+", label: "Active Students" },
  { value: "15", label: "Expert Instructors" },
  { value: "12", label: "Dance Styles" },
  { value: "8", label: "Awards Won" },
];

export default function About() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-image"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-badge">EST. 2016</span>
          <h1 className="hero-title">
            Where Movement<br />
            <span className="hero-highlight">Tells Your Story</span>
          </h1>
          <p className="hero-subtitle">
            Rhythmique Dance Academy — nurturing artists, building confidence, and creating
            breathtaking performances since 2016.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => navigate('/enroll')}>Join Our Family</button>
            <button className="btn-outline" onClick={() => navigate('/trial')}>Book Free Trial →</button>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Stats Section - New addition for credibility */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Main Section - Restructured for better readability */}
      <section className="about-main">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <span className="section-badge">Who We Are</span>
              <h2 className="section-title">A Legacy of<br />Artistic Excellence</h2>
              <div className="about-description">
                <p className="lead-text">
                  Rhythmique isn't just a dance academy — it's a creative sanctuary where
                  passion meets precision and every student discovers their unique voice.
                </p>
                <p>
                  Founded with a vision to transcend traditional dance education, we've built
                  a curriculum that honors classical foundations while embracing contemporary
                  innovation. Our students don't just learn steps; they learn storytelling,
                  discipline, and the joy of self-expression.
                </p>
                <p>
                  With 500+ active students and 15 world-class instructors, we've created a
                  vibrant community that celebrates diversity, creativity, and personal growth.
                </p>
              </div>
              <div className="value-pills">
                <span className="pill">🎨 Artistic Excellence</span>
                <span className="pill">🤝 Inclusive Community</span>
                <span className="pill">🌱 Personal Growth</span>
                <span className="pill">📿 Cultural Heritage</span>
              </div>
            </div>
            <div className="about-gallery">
              <div className="gallery-grid">
                {galleryImgs.map((img, idx) => (
                  <div key={idx} className="gallery-item">
                    <div className="gallery-image">
                      <img src={img.src} alt={img.label} loading="lazy" />
                      <div className="gallery-overlay">
                        <span className="gallery-category">{img.category}</span>
                        <span className="gallery-label">{img.label}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section - Adds depth */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>To provide world-class dance education that nurtures technical excellence, creative expression, and lifelong confidence in every student.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">👁️</div>
              <h3>Our Vision</h3>
              <p>To become India's most inspiring dance academy, recognized for artistic innovation, inclusive community building, and transformative performances.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">💎</div>
              <h3>Our Philosophy</h3>
              <p>Every body can dance. Every story deserves to be told. Every student is an artist in the making.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section - Vertical timeline for better mobile experience */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Journey</span>
            <h2 className="section-title">Milestones That<br />Defined Us</h2>
            <p className="section-subtitle">From a small studio to a national phenomenon — every step of our journey has been fueled by passion and purpose.</p>
          </div>
          <div className="timeline-vertical">
            {milestones.map((item, idx) => (
              <div key={idx} className="timeline-node">
                <div className="timeline-marker">
                  <div className="timeline-icon">{item.icon}</div>
                  <div className="timeline-line"></div>
                </div>
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <p className="timeline-event">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Strong closing */}
      <section className="cta-section">
        <div className="cta-bg-pattern"></div>
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Dance Journey?</h2>
            <p>Join 500+ dancers who've found their rhythm at Rhythmique. Your first trial class is on us.</p>
            <div className="cta-buttons">
              <button className="btn-primary-large" onClick={() => navigate('/trial')}>Book Free Trial Class →</button>
              <button className="btn-outline-light" onClick={() => navigate('/enroll')}>Enroll Now</button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-page {
          width: 100%;
          overflow-x: hidden;
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #1a1520;
        }

        .hero-bg-image {
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=1600&q=80');
          background-size: cover;
          background-position: center 30%;
          filter: brightness(0.65) saturate(0.9);
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(44, 22, 48, 0.75) 0%,
            rgba(30, 15, 40, 0.55) 40%,
            rgba(20, 10, 30, 0.65) 100%
          );
          backdrop-filter: blur(2px);
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 800px;
          padding: 0 24px;
          color: white;
        }

        .hero-badge {
          display: inline-block;
          padding: 8px 22px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(12px);
          border-radius: 100px;
          font-size: 0.82rem;
          letter-spacing: 2.5px;
          margin-bottom: 28px;
          border: 1px solid rgba(255,255,255,0.2);
          color: #f0dce8;
        }

        .hero-title {
          font-size: 3.2rem;
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 24px;
          text-shadow: 0 2px 40px rgba(0,0,0,0.3);
        }

        @media (min-width: 768px) {
          .hero-title {
            font-size: 4.5rem;
          }
        }

        .hero-highlight {
          background: linear-gradient(135deg, #e8b4cb, #d4a0d8, #c2a8e2);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.85);
          margin-bottom: 36px;
          max-width: 580px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-cta {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary, .btn-outline {
          padding: 14px 32px;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          font-size: 1rem;
          letter-spacing: 0.3px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #c9749a, #a678b8);
          color: white;
          box-shadow: 0 4px 20px rgba(169,100,140,0.4);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(169,100,140,0.5);
          filter: brightness(1.08);
        }

        .btn-outline {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          border: 1.5px solid rgba(255,255,255,0.35);
          color: white;
        }

        .btn-outline:hover {
          background: rgba(255,255,255,0.2);
          transform: translateY(-2px);
        }

        .hero-scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          color: rgba(255,255,255,0.6);
          font-size: 0.78rem;
          letter-spacing: 1px;
        }

        .scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.5), transparent);
          margin: 8px auto 0;
          animation: scrollPulse 2s ease-in-out infinite;
        }

        @keyframes scrollPulse {
          0%, 100% { height: 30px; opacity: 0.3; }
          50% { height: 50px; opacity: 1; }
        }

        /* Stats Section */
        .stats-section {
          background: white;
          padding: 60px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 32px;
          text-align: center;
        }

        .stat-card {
          padding: 24px;
        }

        .stat-value {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #c9749a, #a678b8);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 8px;
        }

        .stat-label {
          color: #666;
          font-weight: 500;
          letter-spacing: 1px;
        }

        /* About Main */
        .about-main {
          padding: 80px 0;
          background: #faf9fc;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }

        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .section-badge {
          display: inline-block;
          padding: 6px 16px;
          background: linear-gradient(135deg, #c9749a20, #a678b820);
          color: #9a5f7a;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 24px;
          color: #1a1a2e;
        }

        @media (min-width: 768px) {
          .section-title {
            font-size: 3rem;
          }
        }

        .lead-text {
          font-size: 1.2rem;
          line-height: 1.6;
          color: #2d2d44;
          font-weight: 500;
          margin-bottom: 20px;
        }

        .about-description p {
          color: #555;
          line-height: 1.7;
          margin-bottom: 16px;
        }

        .value-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 32px;
        }

        .pill {
          padding: 8px 18px;
          background: white;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 500;
          color: #2d2d44;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          border: 1px solid #e0e0e0;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .gallery-item {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
        }

        .gallery-image {
          position: relative;
          aspect-ratio: 1;
          overflow: hidden;
        }

        .gallery-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .gallery-item:hover img {
          transform: scale(1.05);
        }

        .gallery-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 12px;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          color: white;
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }

        .gallery-item:hover .gallery-overlay {
          transform: translateY(0);
        }

        .gallery-category {
          display: block;
          font-size: 0.7rem;
          opacity: 0.8;
        }

        .gallery-label {
          display: block;
          font-weight: 600;
          font-size: 0.9rem;
        }

        /* Mission Section */
        .mission-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #2c1630 0%, #1e1428 100%);
          color: white;
        }

        .mission-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }

        .mission-card {
          text-align: center;
          padding: 32px;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.3s ease;
        }

        .mission-card:hover {
          transform: translateY(-8px);
          background: rgba(255,255,255,0.08);
        }

        .mission-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .mission-card h3 {
          font-size: 1.5rem;
          margin-bottom: 16px;
        }

        .mission-card p {
          line-height: 1.6;
          opacity: 0.9;
        }

        /* Timeline Section */
        .timeline-section {
          padding: 80px 0;
          background: white;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-subtitle {
          max-width: 600px;
          margin: 16px auto 0;
          color: #666;
          line-height: 1.6;
        }

        .timeline-vertical {
          max-width: 700px;
          margin: 0 auto;
          position: relative;
        }

        .timeline-vertical::before {
          content: '';
          position: absolute;
          left: 40px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #c9749a, #a678b8);
        }

        .timeline-node {
          display: flex;
          gap: 30px;
          margin-bottom: 48px;
          position: relative;
        }

        .timeline-marker {
          position: relative;
          flex-shrink: 0;
        }

        .timeline-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #c9749a, #a678b8);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          z-index: 2;
          position: relative;
          box-shadow: 0 4px 15px rgba(166,120,184,0.3);
        }

        .timeline-line {
          position: absolute;
          top: 60px;
          left: 29px;
          width: 2px;
          height: calc(100% + 48px);
          background: linear-gradient(to bottom, #a678b8, #c9749a);
        }

        .timeline-node:last-child .timeline-line {
          display: none;
        }

        .timeline-content {
          flex: 1;
          padding-bottom: 20px;
        }

        .timeline-year {
          font-size: 1.25rem;
          font-weight: 700;
          color: #9a5f7a;
          margin-bottom: 8px;
        }

        .timeline-event {
          color: #555;
          line-height: 1.6;
        }

        /* CTA Section */
        .cta-section {
          position: relative;
          padding: 100px 0;
          background: linear-gradient(135deg, #2c1630 0%, #1e1428 100%);
          overflow: hidden;
        }

        .cta-bg-pattern {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .cta-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
          max-width: 700px;
          margin: 0 auto;
        }

        .cta-content h2 {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }

        @media (min-width: 768px) {
          .cta-content h2 {
            font-size: 3rem;
          }
        }

        .cta-content p {
          font-size: 1.125rem;
          margin-bottom: 32px;
          opacity: 0.9;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary-large {
          padding: 14px 32px;
          background: linear-gradient(135deg, #c9749a, #a678b8);
          border: none;
          border-radius: 50px;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary-large:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(169,100,140,0.4);
        }

        .btn-outline-light {
          padding: 14px 32px;
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.35);
          border-radius: 50px;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-outline-light:hover {
          background: rgba(255,255,255,0.1);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
