import React, { useState } from 'react';
import { instructors } from '../data/data';

export default function TrialBooking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    instructor: '',
    preferredDate: '',
    preferredTime: '',
    danceStyle: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Trial booking data:', formData);
    setSubmitted(true);
    // You can add API call here
  };

  return (
    <div className="trial-booking-page">
      <section className="trial-hero">
        <h1>Book Your Free Trial Class</h1>
        <p>Experience the joy of dance with our expert instructors</p>
      </section>

      <div className="trial-container">
        <div className="trial-form-wrapper">
          <h2>Get Started Today</h2>
          <p>Fill out the form below and we'll contact you to schedule your free trial</p>

          {submitted ? (
            <div className="success-message">
              <h3>✓ Trial Request Submitted!</h3>
              <p>We'll contact you within 24 hours to schedule your class.</p>
              <button onClick={() => setSubmitted(false)} className="book-another-btn">
                Book Another Trial
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="trial-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="form-group">
                <label>Select Instructor (Optional)</label>
                <select name="instructor" value={formData.instructor} onChange={handleChange}>
                  <option value="">Any Instructor</option>
                  {instructors.map(instructor => (
                    <option key={instructor.id} value={instructor.name}>
                      {instructor.name} - {instructor.specialization}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Dance Style Interest *</label>
                <select name="danceStyle" required value={formData.danceStyle} onChange={handleChange}>
                  <option value="">Select a dance style</option>
                  <option value="kathak">Kathak</option>
                  <option value="bharatnatyam">Bharatnatyam</option>
                  <option value="hiphop">Hip Hop</option>
                  <option value="contemporary">Contemporary</option>
                  <option value="fusion">Fusion</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Preferred Date</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Preferred Time</label>
                  <select name="preferredTime" value={formData.preferredTime} onChange={handleChange}>
                    <option value="">Select time</option>
                    <option value="morning">Morning (9 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (2 PM - 5 PM)</option>
                    <option value="evening">Evening (6 PM - 9 PM)</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="submit-trial-btn">
                Book Free Trial →
              </button>
            </form>
          )}
        </div>

        <div className="trial-info-wrapper">
          <div className="info-card">
            <h3>What to Expect</h3>
            <ul>
              <li>✓ 30-minute one-on-one session</li>
              <li>✓ Assessment of your skill level</li>
              <li>✓ Introduction to basic techniques</li>
              <li>✓ Discussion of your dance goals</li>
              <li>✓ Studio tour and facility overview</li>
            </ul>
          </div>

          <div className="info-card">
            <h3>Why Book a Trial?</h3>
            <ul>
              <li>🎯 Experience our teaching style</li>
              <li>💪 Meet our expert instructors</li>
              <li>🏫 Explore our facilities</li>
              <li>💰 No commitment required</li>
              <li>⭐ 100% satisfaction guaranteed</li>
            </ul>
          </div>

          <div className="info-card highlight">
            <h3>Limited Time Offer</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b9d', margin: '10px 0' }}>
              FREE Trial Class
            </p>
            <p>No credit card required • Cancel anytime</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .trial-booking-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .trial-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-align: center;
          padding: 80px 20px;
        }

        .trial-hero h1 {
          font-size: 3rem;
          margin-bottom: 16px;
          animation: fadeInDown 0.6s ease;
        }

        .trial-hero p {
          font-size: 1.2rem;
          opacity: 0.9;
          animation: fadeInUp 0.6s ease;
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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

        .trial-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        @media (max-width: 768px) {
          .trial-container {
            grid-template-columns: 1fr;
          }
        }

        .trial-form-wrapper {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          animation: fadeInLeft 0.6s ease;
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .trial-form-wrapper h2 {
          color: #333;
          margin-bottom: 8px;
          font-size: 28px;
        }

        .trial-form-wrapper p {
          color: #666;
          margin-bottom: 20px;
        }

        .trial-form {
          margin-top: 30px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #555;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .submit-trial-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
        }

        .submit-trial-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
        }

        .success-message {
          text-align: center;
          padding: 40px;
          background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
          border-radius: 12px;
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .success-message h3 {
          color: #2e7d32;
          margin-bottom: 12px;
          font-size: 24px;
        }

        .book-another-btn {
          margin-top: 20px;
          padding: 10px 24px;
          background: #2e7d32;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
        }

        .trial-info-wrapper {
          display: flex;
          flex-direction: column;
          gap: 24px;
          animation: fadeInRight 0.6s ease;
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .info-card {
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }

        .info-card:hover {
          transform: translateY(-5px);
        }

        .info-card h3 {
          color: #667eea;
          margin-bottom: 20px;
          font-size: 22px;
        }

        .info-card ul {
          list-style: none;
          padding: 0;
        }

        .info-card li {
          padding: 10px 0;
          color: #555;
          border-bottom: 1px solid #f0f0f0;
        }

        .info-card.highlight {
          background: linear-gradient(135deg, #fff5f5, #ffffff);
          border: 2px solid #ff6b9d;
          text-align: center;
        }

        .info-card.highlight h3 {
          color: #ff6b9d;
        }
      `}</style>
    </div>
  );
}
