import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiClock, FiUser, FiUsers, FiStar, FiFilter, FiChevronDown, FiInfo } from 'react-icons/fi';
import { courses } from '../data/data';
import './PageStyles.css';

const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Professional', 'Classical'];
const styleCategories = ['All', 'Hip-Hop', 'Contemporary', 'Ballet', 'Kathak', 'Bharatanatyam', 'Jazz'];

export default function Courses() {
  const [activeLevel, setActiveLevel] = useState('All');
  const [activeStyle, setActiveStyle] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [expandedCard, setExpandedCard] = useState(null);

  const filtered = courses.filter(c => {
    const levelMatch = activeLevel === 'All' ||
      c.level.toLowerCase().includes(activeLevel.toLowerCase()) ||
      (activeLevel === 'Classical' && ['Kathak', 'Bharatanatyam'].includes(c.name));
    const styleMatch = activeStyle === 'All' ||
      c.category?.toLowerCase().includes(activeStyle.toLowerCase()) ||
      c.name.toLowerCase().includes(activeStyle.toLowerCase());
    return levelMatch && styleMatch;
  });

  const getLevelColor = (level) => {
    const colors = {
      'Beginner': '#10b981',
      'Intermediate': '#f59e0b',
      'Advanced': '#ef4444',
      'Professional': '#8b5cf6'
    };
    return colors[level] || '#6b7280';
  };

  const getDifficultyStars = (level) => {
    const stars = {
      'Beginner': 1,
      'Intermediate': 2,
      'Advanced': 3,
      'Professional': 4
    };
    return stars[level] || 2;
  };

  return (
    <div className="courses-page page-fade-in">
      {/* Hero Section - Enhanced with better visual impact */}
      <section className="courses-hero">
        <div className="hero-particles">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="particle-dot" style={{
              '--x': `${Math.random() * 100}%`,
              '--delay': `${Math.random() * 5}s`,
              '--duration': `${Math.random() * 10 + 5}s`
            }}></div>
          ))}
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-pulse">🔥 500+ Students Enrolled</span>
          </div>
          <h1 className="hero-title">
            Find Your<br />
            <span className="gradient-text">Perfect Rhythm</span>
          </h1>
          <p className="hero-subtitle">
            From first steps to stage-ready performances — expert-led courses designed
            for every dancer's journey
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">12+</span>
              <span className="stat-label">Dance Styles</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Weekly Classes</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">15</span>
              <span className="stat-label">Expert Faculty</span>
            </div>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="white"></path>
          </svg>
        </div>
      </section>

      {/* Filter Section - Improved with better UX */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-header">
            <div className="filter-results">
              <span className="results-count">{filtered.length} Courses Available</span>
              <span className="results-sub">Find the perfect class for your level</span>
            </div>
            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                ⊞ Grid
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                ☰ List
              </button>
            </div>
          </div>

          <div className="filter-chips">
            <div className="filter-group">
              <span className="filter-label">🎯 Level</span>
              <div className="chips">
                {levels.map(l => (
                  <button
                    key={l}
                    className={`chip ${activeLevel === l ? 'active' : ''}`}
                    onClick={() => setActiveLevel(l)}
                  >
                    {l}
                    {activeLevel === l && <span className="chip-check">✓</span>}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <span className="filter-label">💃 Style</span>
              <div className="chips">
                {styleCategories.map(s => (
                  <button
                    key={s}
                    className={`chip ${activeStyle === s ? 'active' : ''}`}
                    onClick={() => setActiveStyle(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid - Enhanced with better cards */}
      <section className="courses-section">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">💃</div>
              <h3>No courses found</h3>
              <p>Try adjusting your filters to find more options</p>
              <button className="btn-reset" onClick={() => { setActiveLevel('All'); setActiveStyle('All'); }}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className={`courses-container ${viewMode}`}>
              {filtered.map((course, idx) => (
                <div
                  key={course.id}
                  className={`course-card ${expandedCard === course.id ? 'expanded' : ''}`}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="card-image">
                    <img src={course.image} alt={course.name} loading="lazy" />
                    <div className="card-badges">
                      <span className="level-badge" style={{ background: getLevelColor(course.level) }}>
                        {course.level}
                      </span>
                      {course.popular && <span className="popular-badge">⭐ Most Popular</span>}
                    </div>
                    <button
                      className="quick-view-btn"
                      onClick={() => setExpandedCard(expandedCard === course.id ? null : course.id)}
                    >
                      <FiInfo />
                    </button>
                  </div>

                  <div className="card-content">
                    <div className="card-header">
                      <h3 className="course-title">{course.name}</h3>
                      <div className="rating">
                        <FiStar className="star-icon" />
                        <span>4.9</span>
                        <small>({course.students}+)</small>
                      </div>
                    </div>

                    <p className="course-description">{course.desc}</p>

                    <div className="course-meta">
                      <div className="meta-item">
                        <FiClock />
                        <span>{course.duration}</span>
                      </div>
                      <div className="meta-item">
                        <FiUser />
                        <span>{course.instructor}</span>
                      </div>
                      <div className="meta-item">
                        <FiUsers />
                        <span>{course.students} students</span>
                      </div>
                    </div>

                    <div className="difficulty">
                      <span className="difficulty-label">Difficulty:</span>
                      <div className="stars">
                        {[...Array(4)].map((_, i) => (
                          <span key={i} className={`star ${i < getDifficultyStars(course.level) ? 'filled' : ''}`}>★</span>
                        ))}
                      </div>
                    </div>

                    {expandedCard === course.id && (
                      <div className="expanded-details">
                        <div className="detail-section">
                          <h4>What You'll Learn</h4>
                          <ul>
                            <li>✓ Fundamental techniques and posture</li>
                            <li>✓ Choreography and performance skills</li>
                            <li>✓ Rhythm and musicality training</li>
                            <li>✓ Stage presence and expression</li>
                          </ul>
                        </div>
                        <div className="detail-section">
                          <h4>Includes</h4>
                          <div className="includes-badges">
                            <span>📹 24/7 Access</span>
                            <span>📝 Practice Materials</span>
                            <span>🎵 Music Library</span>
                            <span>🎓 Certificate</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="card-footer">
                      <div className="pricing">
                        <span className="price">₹{course.fee.toLocaleString()}</span>
                        <span className="period">/month</span>
                        {course.originalFee && (
                          <span className="original-price">₹{course.originalFee.toLocaleString()}</span>
                        )}
                      </div>
                      <Link to="/login" className="enroll-btn">
                        Enroll Now <FiArrowRight className="btn-icon" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Featured Section */}
          <div className="featured-section">
            <div className="featured-banner">
              <div className="featured-content">
                <span className="featured-badge">🎯 Limited Time Offer</span>
                <h3>Get 20% off on annual membership</h3>
                <p>Plus free access to practice rooms and performance workshops</p>
                <button className="featured-btn">Claim Offer →</button>
              </div>
              <div className="featured-image">
                <div className="floating-discount">-20%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .courses-page {
          width: 100%;
          overflow-x: hidden;
        }

        /* Hero Section */
        .courses-hero {
          position: relative;
          min-height: 85vh;
          background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero-particles {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .particle-dot {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(255,255,255,0.4);
          border-radius: 50%;
          left: var(--x);
          top: -10px;
          animation: float-particle var(--duration) linear infinite;
          animation-delay: var(--delay);
        }

        @keyframes float-particle {
          0% {
            top: -10px;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
          max-width: 800px;
          padding: 0 24px;
        }

        .hero-badge {
          margin-bottom: 24px;
        }

        .badge-pulse {
          display: inline-block;
          padding: 8px 20px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          border-radius: 100px;
          font-size: 0.85rem;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        @media (min-width: 768px) {
          .hero-title {
            font-size: 5rem;
          }
        }

        .gradient-text {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero-subtitle {
          font-size: 1.125rem;
          opacity: 0.9;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 48px;
          flex-wrap: wrap;
        }

        .hero-stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #f093fb, #f5576c);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .stat-label {
          font-size: 0.85rem;
          opacity: 0.8;
        }

        .hero-wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          line-height: 0;
        }

        .hero-wave svg {
          width: 100%;
          height: 60px;
        }

        /* Filter Section */
        .filter-section {
          padding: 40px 0;
          background: white;
          border-bottom: 1px solid #f0f0f0;
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(10px);
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .filter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .results-count {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a2e;
        }

        .results-sub {
          display: block;
          font-size: 0.85rem;
          color: #666;
          font-weight: normal;
          margin-top: 4px;
        }

        .view-toggle {
          display: flex;
          gap: 8px;
        }

        .view-btn {
          padding: 8px 16px;
          border: 1px solid #e0e0e0;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .view-btn.active {
          background: linear-gradient(135deg, #be185d, #7c3aed);
          color: white;
          border-color: transparent;
        }

        .filter-chips {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .filter-label {
          font-weight: 600;
          color: #333;
          min-width: 60px;
        }

        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .chip {
          padding: 8px 18px;
          border: 1px solid #e0e0e0;
          background: white;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.85rem;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .chip:hover {
          border-color: #be185d;
          background: #fef2f2;
        }

        .chip.active {
          background: linear-gradient(135deg, #be185d, #7c3aed);
          color: white;
          border-color: transparent;
        }

        .chip-check {
          font-size: 0.75rem;
        }

        /* Courses Section */
        .courses-section {
          padding: 60px 0 80px;
          background: #faf9fc;
        }

        .courses-container {
          display: grid;
          gap: 30px;
          margin-bottom: 60px;
        }

        .courses-container.grid {
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        }

        .courses-container.list {
          grid-template-columns: 1fr;
        }

        .course-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease backwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .course-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.12);
        }

        .course-card.expanded {
          transform: scale(1.02);
        }

        .card-image {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .course-card:hover .card-image img {
          transform: scale(1.05);
        }

        .card-badges {
          position: absolute;
          top: 16px;
          left: 16px;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .level-badge {
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 0.7rem;
          font-weight: 600;
          color: white;
        }

        .popular-badge {
          padding: 4px 12px;
          background: #f59e0b;
          border-radius: 100px;
          font-size: 0.7rem;
          font-weight: 600;
          color: white;
        }

        .quick-view-btn {
          position: absolute;
          bottom: 16px;
          right: 16px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          opacity: 0;
        }

        .course-card:hover .quick-view-btn {
          opacity: 1;
        }

        .card-content {
          padding: 24px;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 12px;
        }

        .course-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .star-icon {
          color: #f59e0b;
          fill: #f59e0b;
        }

        .rating span {
          font-weight: 600;
          color: #1a1a2e;
        }

        .rating small {
          color: #666;
          font-size: 0.7rem;
        }

        .course-description {
          color: #666;
          line-height: 1.5;
          margin-bottom: 16px;
          font-size: 0.9rem;
        }

        .course-meta {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f0f0f0;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: #666;
        }

        .difficulty {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .difficulty-label {
          font-size: 0.8rem;
          color: #666;
        }

        .stars {
          display: flex;
          gap: 4px;
        }

        .star {
          color: #e0e0e0;
          font-size: 0.9rem;
        }

        .star.filled {
          color: #f59e0b;
        }

        .expanded-details {
          margin: 16px 0;
          padding: 16px;
          background: #f8f9fa;
          border-radius: 12px;
        }

        .detail-section {
          margin-bottom: 16px;
        }

        .detail-section h4 {
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 10px;
          color: #333;
        }

        .detail-section ul {
          list-style: none;
          padding: 0;
        }

        .detail-section li {
          font-size: 0.8rem;
          color: #666;
          margin-bottom: 6px;
        }

        .includes-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .includes-badges span {
          padding: 4px 10px;
          background: white;
          border-radius: 6px;
          font-size: 0.7rem;
          color: #555;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #f0f0f0;
        }

        .pricing {
          display: flex;
          align-items: baseline;
          gap: 6px;
          flex-wrap: wrap;
        }

        .price {
          font-size: 1.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #be185d, #7c3aed);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .period {
          font-size: 0.75rem;
          color: #666;
        }

        .original-price {
          font-size: 0.8rem;
          color: #999;
          text-decoration: line-through;
        }

        .enroll-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: linear-gradient(135deg, #be185d, #7c3aed);
          color: white;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.85rem;
          transition: all 0.2s;
        }

        .enroll-btn:hover {
          transform: translateX(4px);
          box-shadow: 0 4px 12px rgba(190,24,93,0.3);
        }

        .btn-icon {
          transition: transform 0.2s;
        }

        .enroll-btn:hover .btn-icon {
          transform: translateX(4px);
        }

        /* No Results */
        .no-results {
          text-align: center;
          padding: 80px 20px;
        }

        .no-results-icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        .no-results h3 {
          font-size: 1.5rem;
          margin-bottom: 10px;
        }

        .btn-reset {
          margin-top: 20px;
          padding: 10px 24px;
          background: linear-gradient(135deg, #be185d, #7c3aed);
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
        }

        /* Featured Banner */
        .featured-section {
          margin-top: 40px;
        }

        .featured-banner {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 24px;
          padding: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 30px;
          position: relative;
          overflow: hidden;
        }

        .featured-content {
          flex: 1;
          color: white;
        }

        .featured-badge {
          display: inline-block;
          padding: 6px 14px;
          background: rgba(255,107,157,0.2);
          border-radius: 100px;
          font-size: 0.8rem;
          margin-bottom: 16px;
        }

        .featured-content h3 {
          font-size: 1.5rem;
          margin-bottom: 12px;
        }

        .featured-content p {
          opacity: 0.8;
          margin-bottom: 24px;
        }

        .featured-btn {
          padding: 12px 28px;
          background: linear-gradient(135deg, #ff6b9d, #c44569);
          border: none;
          border-radius: 10px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .featured-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255,107,157,0.3);
        }

        .featured-image {
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, #ff6b9d, #c44569);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .floating-discount {
          font-size: 1.5rem;
          font-weight: 800;
          color: white;
          animation: float 2s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
