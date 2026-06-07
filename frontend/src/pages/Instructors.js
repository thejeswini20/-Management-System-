import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiStar, FiUsers, FiClock, FiAward, FiInstagram, FiTwitter, FiMail, FiChevronLeft, FiChevronRight, FiHeart, FiTrendingUp } from 'react-icons/fi';
import { instructors } from '../data/data';
import './PageStyles.css';

export default function Instructors() {
  const navigate = useNavigate();
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showBookingToast, setShowBookingToast] = useState(false);
  const [bookingInstructor, setBookingInstructor] = useState(null);

  const specializations = ['all', ...new Set(instructors.map(i => i.specialization?.split(',')[0] || 'Other'))];

  const filteredInstructors = filter === 'all'
    ? instructors
    : instructors.filter(i => i.specialization?.toLowerCase().includes(filter.toLowerCase()));

  const handleBookTrial = (instructor, e) => {
    if (e && e.stopPropagation) e.stopPropagation(); // Prevent opening the modal
    navigate('/fees', { state: { autoBookTrial: true, instructorName: instructor.name } });
  };

  const handleModalBookTrial = (instructor) => {
    setSelectedInstructor(null); // Close the modal
    navigate('/fees', { state: { autoBookTrial: true, instructorName: instructor.name } });
  };

  const handleSocialClick = (platform, instructor, e) => {
    e.stopPropagation();
    console.log(`Opening ${platform} for ${instructor.name}`);
    // Add actual social links here
    // window.open(`https://instagram.com/${instructor.instagram}`, '_blank');
  };

  return (
    <div className="instructors-page page-fade-in">
      {/* Toast Notification */}

      {/* Hero Section - Inspiring and dynamic */}
      <section className="instructors-hero">
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span>World-Class Faculty</span>
          </div>
          <h1 className="hero-title">
            Meet Our<br />
            <span className="gradient-text">Master Instructors</span>
          </h1>
          <p className="hero-subtitle">
            Learn from award-winning dancers, choreographers, and educators who are passionate <br />
            about nurturing the next generation of artists
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-wrapper">
            <span className="filter-label">Filter by Specialization:</span>
            <div className="filter-chips">
              {specializations.map(spec => (
                <button
                  key={spec}
                  className={`filter-chip ${filter === spec ? 'active' : ''}`}
                  onClick={() => setFilter(spec)}
                >
                  {spec === 'all' ? 'All Instructors' : spec}
                </button>
              ))}
            </div>
          </div>
          <div className="results-info">
            <span className="instructor-count">{filteredInstructors.length} Amazing Instructors</span>
            <span className="hire-text">✓ All instructors are verified professionals</span>
          </div>
        </div>
      </section>

      {/* Instructors Grid - Enhanced Cards */}
      <section className="instructors-grid-section">
        <div className="container">
          <div className="instructors-grid">
            {filteredInstructors.map((instructor, idx) => (
              <div
                key={instructor.id}
                className="instructor-card"
                style={{ animationDelay: `${idx * 0.1}s` }}
                onClick={() => setSelectedInstructor(instructor)}
              >
                <div className="card-image">
                  <img src={instructor.image} alt={instructor.name} loading="lazy" />
                  <div className="image-overlay">
                    <button className="quick-view">Quick View</button>
                  </div>
                  <div className="status-badge" data-status={instructor.status}>
                    {instructor.status === 'Active' ? 'Active' : 'Featured'}
                  </div>
                </div>

                <div className="card-content">
                  <div className="instructor-header">
                    <h3 className="instructor-name">{instructor.name}</h3>
                  </div>

                  <p className="specialization">
                    {instructor.specialization}
                  </p>

                  <div className="stats-grid">
                    <div className="stat-item">
                      <FiAward className="stat-icon" />
                      <div>
                        <span className="stat-value">{instructor.experience}</span>
                        <span className="stat-label">Experience</span>
                      </div>
                    </div>
                    <div className="stat-item">
                      <FiUsers className="stat-icon" />
                      <div>
                        <span className="stat-value">{instructor.students}+</span>
                        <span className="stat-label">Students</span>
                      </div>
                    </div>
                    <div className="stat-item">
                      <FiStar className="stat-icon star" />
                      <div>
                        <span className="stat-value">{instructor.rating}</span>
                        <span className="stat-label">Rating</span>
                      </div>
                    </div>
                  </div>

                  <div className="achievements">
                    {instructor.achievements?.slice(0, 2).map((achievement, i) => (
                      <span key={i} className="achievement-badge">{achievement}</span>
                    ))}
                    {!instructor.achievements && (
                      <>
                        <span className="achievement-badge">Professional Artist</span>
                        <span className="achievement-badge">Certified Instructor</span>
                      </>
                    )}
                  </div>

                  <div className="social-links">
                    <button
                      className="social-icon"
                      aria-label="Instagram"
                      onClick={(e) => handleSocialClick('Instagram', instructor, e)}
                    >
                      <FiInstagram />
                    </button>
                    <button
                      className="social-icon"
                      aria-label="Twitter"
                      onClick={(e) => handleSocialClick('Twitter', instructor, e)}
                    >
                      <FiTwitter />
                    </button>
                    <button
                      className="social-icon"
                      aria-label="Email"
                      onClick={(e) => handleSocialClick('Email', instructor, e)}
                    >
                      <FiMail />
                    </button>
                  </div>

                  <button
                    className="book-class-btn"
                    onClick={(e) => handleBookTrial(instructor, e)}
                  >
                    Book a Trial Class
                    <span className="btn-arrow">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Instructor Banner */}
      <section className="featured-instructor">
        <div className="container">
          <div className="featured-wrapper">
            <div className="featured-content">
              <span className="featured-tag">✨ Instructor of the Month</span>
              <h2>Priya Sharma</h2>
              <p className="featured-specialization">Kathak & Contemporary Fusion</p>
              <p className="featured-bio">
                With over 15 years of experience and training under legendary gurus,
                Priya has performed at prestigious venues including the Khajuraho Dance Festival
                and has choreographed for international dance productions.
              </p>
              <div className="featured-stats">
                <div>
                  <strong>500+</strong>
                  <span>Students Trained</span>
                </div>
                <div>
                  <strong>12</strong>
                  <span>Years Teaching</span>
                </div>
                <div>
                  <strong>4.9</strong>
                  <span>Rating</span>
                </div>
              </div>
              {/* Removed Learn More CTA */}
            </div>
            <div className="featured-image">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5w_kKE6EPtIC_roztA_jzQ6qthoHQvaOCnA&s"
                alt="Priya Sharma - Kathak dancer"
                className="featured-dancer-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Why Learn With Us</span>
            <h2 className="section-title">What Makes Our<br />Instructors Special</h2>
          </div>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon" style={{ color: '#7c3aed', display: 'flex', justifyContent: 'center', marginBottom: '16px' }}><FiAward size={40} /></div>
              <h3>Certified Experts</h3>
              <p>All instructors are professionally trained and certified in their respective dance forms.</p>
            </div>
            <div className="feature">
              <div className="feature-icon" style={{ color: '#f59e0b', display: 'flex', justifyContent: 'center', marginBottom: '16px' }}><FiStar size={40} /></div>
              <h3>Industry Experience</h3>
              <p>Our faculty has performed at national and international stages and events.</p>
            </div>
            <div className="feature">
              <div className="feature-icon" style={{ color: '#ec4899', display: 'flex', justifyContent: 'center', marginBottom: '16px' }}><FiHeart size={40} /></div>
              <h3>Personalized Attention</h3>
              <p>Small batch sizes ensure every student gets individual guidance and feedback.</p>
            </div>
            <div className="feature">
              <div className="feature-icon" style={{ color: '#0d9488', display: 'flex', justifyContent: 'center', marginBottom: '16px' }}><FiTrendingUp size={40} /></div>
              <h3>Proven Track Record</h3>
              <p>2000+ successful students, many now performing professionals themselves.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Instructor Details */}
      {selectedInstructor && (
        <div className="modal-overlay" onClick={() => setSelectedInstructor(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedInstructor(null)}>✕</button>
            <div className="modal-grid">
              <div className="modal-image">
                <img src={selectedInstructor.image} alt={selectedInstructor.name} />
              </div>
              <div className="modal-info">
                <h2>{selectedInstructor.name}</h2>
                <p className="modal-specialization">{selectedInstructor.specialization}</p>
                <div className="modal-stats">
                  <div><strong>{selectedInstructor.experience}</strong> Experience</div>
                  <div><strong>{selectedInstructor.students}+</strong> Students</div>
                  <div><strong>{selectedInstructor.rating}</strong> Rating</div>
                </div>
                <div className="modal-bio">
                  <h4>About</h4>
                  <p>Passionate educator with a mission to make dance accessible and enjoyable for all. Specializes in creating a supportive environment where students can explore their creativity while building strong technical foundations.</p>
                </div>
                <div className="modal-achievements">
                  <h4>Achievements</h4>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                    <li style={{ listStyle: 'disc' }}>National Dance Championship Winner 2019</li>
                    <li style={{ listStyleType: 'disc' }}>Performed at International Dance Festival</li>
                    <li style={{ listStyleType: 'disc' }}>Certified Master Trainer</li>
                    <li style={{ listStyleType: 'disc' }}>5-Star Rated Instructor</li>
                  </ul>
                </div>
                <button
                  className="modal-book-btn"
                  onClick={() => handleModalBookTrial(selectedInstructor)}
                >
                  Book a Free Trial →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .instructors-page {
          width: 100%;
          overflow-x: hidden;
        }

        /* Toast Notification */
        .booking-toast {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 1100;
          animation: slideInRight 0.3s ease;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .toast-content {
          background: white;
          border-radius: 12px;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          border-left: 4px solid #10b981;
          min-width: 300px;
        }

        .toast-icon {
          font-size: 1.5rem;
        }

        .toast-content strong {
          color: #1a1a2e;
          display: block;
          margin-bottom: 4px;
        }

        .toast-content p {
          font-size: 0.85rem;
          color: #666;
          margin: 0;
        }

        /* Hero Section */
        .instructors-hero {
          position: relative;
          min-height: 85vh;
          background: linear-gradient(135deg, #0f0c29 0%, #1a1a3e 50%, #0d2b3e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero-bg-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.3;
          animation: float 20s ease-in-out infinite;
        }

        .shape-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #ff6b9d, #c44569);
          top: -100px;
          left: -100px;
        }

        .shape-2 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #a363d9, #6c5ce7);
          bottom: -150px;
          right: -150px;
          animation-delay: 7s;
        }

        .shape-3 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #00cec9, #0984e3);
          top: 40%;
          left: 40%;
          animation-delay: 14s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -20px) scale(1.05); }
          66% { transform: translate(-15px, 15px) scale(0.98); }
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
          max-width: 900px;
          padding: 0 24px;
        }

        .hero-badge {
          margin-bottom: 24px;
        }

        .hero-badge span {
          display: inline-block;
          padding: 8px 20px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          border-radius: 100px;
          font-size: 0.85rem;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        @media (min-width: 768px) {
          .hero-title {
            font-size: 4.5rem;
          }
        }

        .gradient-text {
          background: linear-gradient(135deg, #ff6b9d, #a363d9, #00cec9);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero-subtitle {
          font-size: 1rem;
          opacity: 0.9;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        /* Filter Section */
        .filter-section {
          padding: 40px 0;
          background: white;
          border-bottom: 1px solid #f0f0f0;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .filter-wrapper {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .filter-label {
          font-weight: 600;
          color: #333;
        }

        .filter-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .filter-chip {
          padding: 8px 20px;
          border: 1px solid #e0e0e0;
          background: white;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.85rem;
        }

        .filter-chip:hover {
          border-color: #be185d;
          background: #fef2f2;
        }

        .filter-chip.active {
          background: linear-gradient(135deg, #be185d, #7c3aed);
          color: white;
          border-color: transparent;
        }

        .results-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          padding-top: 16px;
          border-top: 1px solid #f0f0f0;
        }

        .instructor-count {
          font-weight: 600;
          color: #1a1a2e;
        }

        .hire-text {
          font-size: 0.85rem;
          color: #10b981;
        }

        /* Instructors Grid */
        .instructors-grid-section {
          padding: 60px 0 80px;
          background: #faf9fc;
        }

        .instructors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
        }

        .instructor-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          cursor: pointer;
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

        .instructor-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }

        .card-image {
          position: relative;
          height: 280px;
          overflow: hidden;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .instructor-card:hover .card-image img {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .instructor-card:hover .image-overlay {
          opacity: 1;
        }

        .quick-view {
          padding: 10px 24px;
          background: white;
          border: none;
          border-radius: 30px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .quick-view:hover {
          transform: scale(1.05);
        }

        .status-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 600;
          background: rgba(0,0,0,0.7);
          color: white;
          backdrop-filter: blur(5px);
        }

        .status-badge[data-status="Featured"] {
          background: linear-gradient(135deg, #f59e0b, #ea580c);
        }

        .card-content {
          padding: 20px;
        }

        .instructor-name {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 6px;
          color: #1a1a2e;
        }

        .specialization {
          font-size: 0.85rem;
          color: #be185d;
          font-weight: 500;
          margin-bottom: 16px;
        }

        .stats-grid {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f0f0f0;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .stat-icon {
          color: #a363d9;
          font-size: 1rem;
        }

        .stat-icon.star {
          color: #f59e0b;
        }

        .stat-value {
          display: block;
          font-weight: 700;
          font-size: 0.9rem;
          color: #1a1a2e;
        }

        .stat-label {
          display: block;
          font-size: 0.7rem;
          color: #888;
        }

        .achievements {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }

        .achievement-badge {
          padding: 4px 10px;
          background: #fef2f2;
          border-radius: 20px;
          font-size: 0.7rem;
          color: #be185d;
        }

        .social-links {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }

        .social-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid #e0e0e0;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .social-icon:hover {
          background: linear-gradient(135deg, #be185d, #7c3aed);
          border-color: transparent;
          color: white;
        }

        .book-class-btn {
          width: 100%;
          padding: 12px;
          background: white;
          border: 2px solid #be185d;
          border-radius: 10px;
          color: #be185d;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.2s;
        }

        .book-class-btn:hover {
          background: linear-gradient(135deg, #be185d, #7c3aed);
          color: white;
          border-color: transparent;
        }

        .btn-arrow {
          transition: transform 0.2s;
        }

        .book-class-btn:hover .btn-arrow {
          transform: translateX(4px);
        }

        /* Featured Instructor */
        .featured-instructor {
          padding: 80px 0;
          background: white;
        }

        .featured-wrapper {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 30px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }

        @media (max-width: 768px) {
          .featured-wrapper {
            grid-template-columns: 1fr;
          }
        }

        .featured-content {
          padding: 50px;
          color: white;
        }

        .featured-tag {
          display: inline-block;
          padding: 6px 14px;
          background: rgba(255,107,157,0.2);
          border-radius: 20px;
          font-size: 0.8rem;
          margin-bottom: 20px;
        }

        .featured-content h2 {
          font-size: 2rem;
          margin-bottom: 8px;
        }

        .featured-specialization {
          font-size: 1rem;
          color: #ff6b9d;
          margin-bottom: 16px;
        }

        .featured-bio {
          line-height: 1.6;
          opacity: 0.9;
          margin-bottom: 24px;
        }

        .featured-stats {
          display: flex;
          gap: 30px;
          margin-bottom: 30px;
        }

        .featured-stats div {
          text-align: center;
        }

        .featured-stats strong {
          display: block;
          font-size: 1.5rem;
        }

        .featured-stats span {
          font-size: 0.8rem;
          opacity: 0.7;
        }

        .featured-cta {
          padding: 12px 28px;
          background: linear-gradient(135deg, #ff6b9d, #c44569);
          border: none;
          border-radius: 30px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .featured-cta:hover {
          transform: translateX(4px);
        }

        .featured-image {
          background: linear-gradient(135deg, #ff6b9d20, #a363d920);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        .featured-dancer-image {
          width: 100%;
          max-width: 350px;
          height: auto;
          border-radius: 20px;
          object-fit: cover;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          transition: transform 0.3s ease;
        }

        .featured-dancer-image:hover {
          transform: scale(1.02);
        }

        /* Why Choose Section */
        .why-choose-section {
          padding: 80px 0;
          background: #faf9fc;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-badge {
          display: inline-block;
          padding: 6px 16px;
          background: linear-gradient(135deg, #ff6b9d20, #a363d920);
          color: #be185d;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1a1a2e;
        }

        @media (min-width: 768px) {
          .section-title {
            font-size: 2.5rem;
          }
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .feature {
          text-align: center;
          padding: 30px;
          background: white;
          border-radius: 20px;
          transition: all 0.3s;
        }

        .feature:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 16px;
        }

        .feature h3 {
          font-size: 1.2rem;
          margin-bottom: 12px;
          color: #1a1a2e;
        }

        .feature p {
          color: #666;
          line-height: 1.5;
          font-size: 0.9rem;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: white;
          border-radius: 24px;
          max-width: 900px;
          width: 90%;
          max-height: 85vh;
          overflow-y: auto;
          position: relative;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #f0f0f0;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          z-index: 1;
        }

        .modal-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 30px;
          padding: 30px;
        }

        @media (max-width: 768px) {
          .modal-grid {
            grid-template-columns: 1fr;
          }
        }

        .modal-image img {
          width: 100%;
          border-radius: 16px;
        }

        .modal-info h2 {
          font-size: 1.8rem;
          margin-bottom: 8px;
        }

        .modal-specialization {
          color: #be185d;
          font-weight: 500;
          margin-bottom: 20px;
        }

        .modal-stats {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #f0f0f0;
        }

        .modal-bio {
          margin-bottom: 20px;
        }

        .modal-bio h4, .modal-achievements h4 {
          margin-bottom: 10px;
          color: #333;
        }

        .modal-achievements ul {
          list-style: none;
          padding: 0;
        }

        .modal-achievements li {
          padding: 6px 0;
          color: #666;
        }

        .modal-book-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #be185d, #7c3aed);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}
