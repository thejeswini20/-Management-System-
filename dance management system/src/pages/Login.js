import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GiFlowerEmblem } from 'react-icons/gi';
import { FiMail, FiLock, FiUser, FiPhone, FiArrowRight, FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi';
import './Login.css';

export default function Login({ setIsLoggedIn }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    setError('');
    setIsLoggedIn(true);
    navigate('/');
  };

  const Field = ({ icon, name, type = 'text', label }) => (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <span className="field-icon">{icon}</span>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={`Enter your ${label.toLowerCase()}`}
        value={form[name] || ''}
        autoComplete={type === 'password' ? 'current-password' : type === 'email' ? 'email' : 'off'}
        onChange={e => { setError(''); setForm({ ...form, [name]: e.target.value }); }}
      />
    </div>
  );

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
                <Field icon={<FiUser />} name="name" label="Full Name" />
                <Field icon={<FiPhone />} name="phone" type="tel" label="Phone Number" />
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

            <Field icon={<FiMail />} name="email" type="email" label="Email Address" />

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
            <button onClick={() => { setIsRegister(!isRegister); setError(''); setShowPassword(false); }}>
              {isRegister ? ' Sign In' : ' Register'}
            </button>
          </p>
        </div>
      </div>
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
