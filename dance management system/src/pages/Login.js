import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GiFlowerEmblem } from 'react-icons/gi';
import { FiMail, FiLock, FiUser, FiPhone, FiArrowRight, FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi';
import './Login.css';

const Field = ({ icon, name, type = 'text', label, value, onChange }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <span className="field-icon">{icon}</span>
    <input
      id={name}
      type={type}
      name={name}
      placeholder={`Enter your ${label.toLowerCase()}`}
      value={value}
      autoComplete={type === 'password' ? 'current-password' : type === 'email' ? 'email' : 'off'}
      onChange={onChange}
    />
  </div>
);

export default function Login({ setIsLoggedIn }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please enter your email and password.');
      return;
    }
    if (isRegister && !form.name) {
      setError('Please enter your full name.');
      return;
    }
    if (isRegister && !agreeTerms) {
      setError('You must agree to the Terms and Conditions.');
      return;
    }
    setError('');
    setIsLoggedIn(true);
    navigate('/');
  };



  return (
    <div className="login-page">
      <div className="login-left">
        <img src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=900&q=80" alt="Ballet dancer" className="login-left-bg" />
        <div className="login-left-overlay" />
        <div className="login-brand">
          <GiFlowerEmblem className="lb-icon" />
          <h1>Rhythmique</h1>
          <p>Where Passion Meets Rhythm</p>
          <div className="lb-stats">
            <div><strong>500+</strong><span>Students</span></div>
            <div><strong>15+</strong><span>Instructors</span></div>
            <div><strong>12+</strong><span>Styles</span></div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-wrap">
          <h2>{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="login-sub">
            {isRegister ? 'Join the Rhythmique family today' : 'Sign in to continue to Rhythmique'}
          </p>

          {error && (
            <div className="login-error">
              <FiAlertCircle /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            {isRegister && (
              <>
                <Field
                  icon={<FiUser />}
                  name="name"
                  label="Full Name"
                  value={form.name || ''}
                  onChange={e => {
                    setError('');
                    setForm({ ...form, name: e.target.value });
                  }}
                />
                <Field
                  icon={<FiPhone />}
                  name="phone"
                  type="tel"
                  label="Phone Number"
                  value={form.phone || ''}
                  onChange={e => {
                    setError('');
                    setForm({ ...form, phone: e.target.value });
                  }}
                />
                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <span className="field-icon"><FiUser /></span>
                  <select
                    id="role"
                    name="role"
                    value={form.role}
                    onChange={e => setForm({ ...form, role: e.target.value })}
                  >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </>
            )}

            <Field
              icon={<FiMail />}
              name="email"
              type="email"
              label="Email Address"
              value={form.email || ''}
              onChange={e => {
                setError('');
                setForm({ ...form, email: e.target.value });
              }}
            />

            {/* Password field with show/hide toggle */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <span className="field-icon"><FiLock /></span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                value={form.password}
                autoComplete="current-password"
                onChange={e => { setError(''); setForm({ ...form, password: e.target.value }); }}
                style={{ paddingRight: 48 }}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* Password strength indicator */}
            {form.password.length > 0 && (
              <div className="password-strength">
                <div className="strength-bars">
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className="strength-bar"
                      style={{
                        background: i <= getStrength(form.password)
                          ? getStrengthColor(form.password)
                          : '#e5e7eb'
                      }}
                    />
                  ))}
                </div>
                <span style={{ color: getStrengthColor(form.password), fontSize: '0.75rem', fontWeight: 600 }}>
                  {getStrengthLabel(form.password)}
                </span>
              </div>
            )}

            {!isRegister && (
              <div className="forgot">
                <Link to="#">Forgot password?</Link>
              </div>
            )}

            {isRegister && (
              <div className="terms-container" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '-4px', marginBottom: '8px' }}>
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={e => setAgreeTerms(e.target.checked)}
                  style={{
                    width: '18px',
                    height: '18px',
                    accentColor: 'var(--primary)',
                    cursor: 'pointer'
                  }}
                />
                <label htmlFor="agreeTerms" style={{ fontSize: '0.88rem', color: 'var(--text-light)', cursor: 'pointer', userSelect: 'none', margin: 0, textTransform: 'none', fontWeight: '500' }}>
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => setShowTermsModal(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--primary)',
                      textDecoration: 'underline',
                      fontFamily: 'inherit',
                      fontSize: 'inherit',
                      padding: 0,
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Terms and Conditions
                  </button>
                </label>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem', marginTop: 4 }}
            >
              {isRegister ? 'Create Account' : 'Sign In'} <FiArrowRight />
            </button>
          </form>

          <p className="toggle-auth">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}
            <button onClick={() => { setIsRegister(!isRegister); setError(''); setShowPassword(false); setAgreeTerms(false); }}>
              {isRegister ? ' Sign In' : ' Register'}
            </button>
          </p>
        </div>
      </div>

      {showTermsModal && (
        <div className="terms-modal-overlay" onClick={() => setShowTermsModal(false)}>
          <div className="terms-modal" onClick={e => e.stopPropagation()}>
            <div className="terms-modal-header">
              <h3>Terms and Conditions</h3>
              <button className="terms-modal-close" onClick={() => setShowTermsModal(false)}>&times;</button>
            </div>
            <div className="terms-modal-content">
              <p>Welcome to <strong>Rhythmique Dance Academy</strong>. By registering or using our application, you agree to comply with and be bound by the following terms and conditions:</p>
              
              <h4>1. Enrollment and Membership</h4>
              <p>Enrollment is subject to class availability. Members must provide accurate personal information and notify us of any updates immediately.</p>
              
              <h4>2. Code of Conduct</h4>
              <p>All students, instructors, and visitors are expected to behave respectfully. Disruptive or offensive behavior may result in suspension or termination of membership.</p>
              
              <h4>3. Fee Policy</h4>
              <p>Fees are payable in advance of course start dates. Late payments may incur overdue charges, and unpaid fees can lead to temporary suspension from classes.</p>
              
              <h4>4. Liability Release</h4>
              <p>Participation in dance training carries inherent physical risks. Rhythmique is not responsible for any personal injuries, damage, or loss of personal property during classes or events.</p>
              
              <h4>5. Privacy & Data Protection</h4>
              <p>We respect your privacy. All registration information (name, email, phone) is securely stored in MongoDB and used solely for management and communications.</p>
            </div>
            <div className="terms-modal-footer">
              <button type="button" className="btn btn-primary" style={{ padding: '8px 20px' }} onClick={() => setShowTermsModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getStrength(pwd) {
  let score = 0;
  if (pwd.length >= 6) score++;
  if (pwd.length >= 10) score++;
  if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
}
function getStrengthColor(pwd) {
  const s = getStrength(pwd);
  return ['#ef4444', '#f59e0b', '#3b82f6', '#16a34a'][s - 1] || '#ef4444';
}
function getStrengthLabel(pwd) {
  return ['Weak', 'Fair', 'Good', 'Strong'][getStrength(pwd) - 1] || 'Weak';
}
