import React from 'react';
import './PageStyles.css';

const milestones = [
  { year: "2016", event: "Rhythmique founded with 3 instructors and 40 students" },
  { year: "2018", event: "Expanded to 3 studios and added classical dance programs" },
  { year: "2020", event: "Launched online classes; reached 300+ students nationwide" },
  { year: "2022", event: "Won Best Dance Academy award at National Arts Festival" },
  { year: "2024", event: "500+ active students, 15 instructors, 12 dance styles" },
];

const galleryImgs = [
  { src: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=600&q=80", label: "Ballet" },
  { src: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=600&q=80", label: "Hip-Hop" },
  { src: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=600&q=80", label: "Contemporary" },
  { src: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=600&q=80", label: "Performance" },
];

export default function About() {
  return (
    <div className="page-wrapper">
      <div className="page-hero about-hero">
        <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1600&q=80" alt="Dance" className="page-hero-bg-img" />
        <div className="page-hero-overlay" style={{ background: 'linear-gradient(135deg, rgba(76,29,149,0.82), rgba(147,51,234,0.7))' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className="pre-label-white">Our Story</p>
          <h1>About Rhythmique</h1>
          <p>Nurturing artists since 2016</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <p className="pre-label">Who We Are</p>
              <h2 className="section-title">A Legacy of Movement & Art</h2>
              <p>Rhythmique Dance Academy was founded with a single vision: to create a space where every dancer — from curious beginners to aspiring professionals — can grow, express, and shine.</p>
              <p style={{ marginTop: 16 }}>We believe dance is more than technique. It's storytelling, culture, emotion, and connection. Our curriculum blends classical traditions with contemporary energy.</p>
              <div className="about-values">
                {['Artistic Excellence', 'Inclusive Community', 'Personal Growth', 'Cultural Heritage'].map(v => (
                  <span key={v} className="badge badge-purple" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>{v}</span>
                ))}
              </div>
            </div>
            <div className="about-visual">
              <div className="about-img-grid">
                {galleryImgs.map((g, i) => (
                  <div key={i} className="about-img-item">
                    <img src={g.src} alt={g.label} />
                    <span>{g.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="section-header">
            <p className="pre-label">Our Journey</p>
            <h2 className="section-title">Milestones</h2>
          </div>
          <div className="timeline">
            {milestones.map((m, i) => (
              <div key={i} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content card">
                  <span className="timeline-year">{m.year}</span>
                  <p>{m.event}</p>
                </div>
                <div className="timeline-dot" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
