import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FiArrowRight,
  FiCheck,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiCreditCard,
  FiSmartphone,
  FiLoader,
  FiCheckCircle,
  FiPercent,
  FiHelpCircle,
  FiAward,
  FiMusic,
  FiShield,
  FiStar,
  FiUsers,
  FiBriefcase,
  FiBookOpen,
  FiPlay
} from 'react-icons/fi';
import { courses } from '../data/data';
import { useAuth } from '../context/AuthContext';
import { post } from '../utils/api';

const plans = [
  {
    id: 'starter',
    name: "RHYTHM STARTER",
    icon: <FiMusic />,
    price: 2499,
    tagline: "Begin Your Dance Journey",
    description: "Perfect for hobbyists and beginners discovering their passion",
    features: [
      { text: "Any 1 dance style", included: true },
      { text: "2 classes per week", included: true },
      { text: "Group training (15-20 students)", included: true },
      { text: "Basic practice material", included: true },
      { text: "Monthly progress assessment", included: true },
      { text: "Access to online portal", included: true },
      { text: "Competition entry", included: false },
      { text: "1-on-1 mentor session", included: false },
      { text: "Performance opportunities", included: false }
    ],
    color: "#0d9488",
    gradient: "linear-gradient(135deg, #0d9488 0%, #115e59 100%)",
    shadow: "rgba(13, 148, 136, 0.15)",
    badge: null,
    recommended: false
  },
  {
    id: 'elite',
    name: "ELITE DANCER",
    icon: <FiStar />,
    price: 3999,
    tagline: "Most Popular Choice",
    description: "For dedicated dancers ready to level up their skills",
    features: [
      { text: "Any 2 dance styles", included: true },
      { text: "5 classes per week", included: true },
      { text: "Small group (8-10 students)", included: true },
      { text: "Premium practice material", included: true },
      { text: "Bi-weekly assessments", included: true },
      { text: "Access to online portal", included: true },
      { text: "2 competition entries", included: true },
      { text: "Monthly 1-on-1 mentor session", included: true },
      { text: "Performance opportunities", included: false }
    ],
    color: "#d97706",
    gradient: "linear-gradient(135deg, #ec4899 0%, #7c3aed 100%)",
    shadow: "rgba(124, 58, 237, 0.25)",
    badge: "MOST POPULAR",
    recommended: true
  },
  {
    id: 'pro',
    name: "PRO MASTER",
    icon: <FiAward />,
    price: 5999,
    tagline: "Professional Track",
    description: "For aspiring professionals and serious performers",
    features: [
      { text: "Unlimited dance styles", included: true },
      { text: "Daily classes + open practice", included: true },
      { text: "Private coaching (1-3 students)", included: true },
      { text: "Elite practice material + choreography", included: true },
      { text: "Weekly assessments with feedback", included: true },
      { text: "Premium online portal access", included: true },
      { text: "All competition entries", included: true },
      { text: "Weekly 1-on-1 mentor session", included: true },
      { text: "Stage performances & showcases", included: true }
    ],
    color: "#7c3aed",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)",
    shadow: "rgba(109, 40, 217, 0.2)",
    badge: "EXPERT RECOMMENDED",
    recommended: false
  },
];

const combos = [
  { name: "Family Pack", icon: <FiUsers />, price: 6999, description: "2 adults + 2 kids", features: ["All Elite plan benefits", "Family workshops", "Group performance"] },
  { name: "Student Special", icon: <FiBookOpen />, price: 2999, description: "Valid student ID required", features: ["Any 1 style", "Flexible timings", "Exam break adjustment"] },
  { name: "Corporate Wellness", icon: <FiBriefcase />, price: 8999, description: "For organizations", features: ["Team building sessions", "Stress relief workshops", "Custom schedule"] }
];

const enhancedCourses = [
  { id: 1, name: "Hip Hop", duration: "2 months", fee: 2999, schedule: "Mon/Wed/Fri", bgImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop" },
  { id: 2, name: "Bollywood", duration: "2 months", fee: 2799, schedule: "Tue/Thu/Sat", bgImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=300&fit=crop" },
  { id: 3, name: "Contemporary", duration: "3 months", fee: 3499, schedule: "Mon/Thu", bgImage: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=400&h=300&fit=crop" },
  { id: 4, name: "Ballet", duration: "4 months", fee: 3999, schedule: "Tue/Fri", bgImage: "https://images.unsplash.com/photo-1545529468-42764ef8c85f?w=400&h=300&fit=crop" },
  { id: 5, name: "Salsa", duration: "2 months", fee: 2899, schedule: "Wed/Sat", bgImage: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400&h=300&fit=crop" },
  { id: 6, name: "Breakdance", duration: "3 months", fee: 3299, schedule: "Mon/Fri", bgImage: "https://images.unsplash.com/photo-1508609540374-67d1601ba51b?w=400&h=300&fit=crop" }
];

const paymentOptions = [
  { id: 'card', name: "Credit/Debit Card", icon: <FiCreditCard /> },
  { id: 'upi', name: "UPI ID / QR Code", icon: <FiSmartphone /> }
];

export default function Fees() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedItem, setSelectedItem] = useState(null); // plan, combo, or course object
  const [selectedType, setSelectedType] = useState(null); // 'plan', 'combo', or 'course'

  const [selectedPayment, setSelectedPayment] = useState('card');
  const [scrolled, setScrolled] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);

  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1 = Details/Payment, 2 = Success
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  // Form states
  const [cardForm, setCardForm] = useState({ number: '', name: '', expiry: '', cvc: '' });
  const [upiForm, setUpiForm] = useState({ upiId: '' });
  const [advisorForm, setAdvisorForm] = useState({ name: '', phone: '', style: 'Ballet' });
  const [advisorSubmitted, setAdvisorSubmitted] = useState(false);
  const [showAdvisorModal, setShowAdvisorModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.state && location.state.autoBookTrial) {
      const instName = location.state.instructorName || "";
      handleOpenCheckout({
        name: `Free Trial Class with ${instName || "Expert Instructor"}`,
        price: 0
      }, 'trial');

      // Clear navigation state to prevent re-opening modal on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const getMultiplierAndDiscount = () => {
    switch (billingCycle) {
      case 'quarterly': return { months: 3, discount: 0.1, label: '10% Off' };
      case 'halfYearly': return { months: 6, discount: 0.15, label: '15% Off' };
      case 'yearly': return { months: 12, discount: 0.25, label: '25% Off' };
      default: return { months: 1, discount: 0, label: '' };
    }
  };

  const calculateTotal = (basePrice) => {
    const { months, discount } = getMultiplierAndDiscount();
    const subtotal = basePrice * months * (1 - discount);
    const gst = subtotal * 0.18;
    const total = subtotal + gst;
    return {
      subtotal: Math.round(subtotal),
      gst: Math.round(gst),
      total: Math.round(total)
    };
  };

  const handleOpenCheckout = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
    setCheckoutStep(1);
    setShowCheckout(true);
    setTransactionId('');
  };

  const handleConfirmPayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate api network latency
    await new Promise(resolve => setTimeout(resolve, 2000));

    const invoiceNum = 'INV-' + Math.floor(100000 + Math.random() * 900000);
    const calculated = calculateTotal(selectedItem.price || selectedItem.fee);

    try {
      // Create a student/fee record in backend if user is authenticated
      if (user) {
        await post('/api/fees', {
          studentId: Math.floor(100 + Math.random() * 900), // Fallback numeric ID for demo consistency
          amount: calculated.total,
          dueDate: new Date().toISOString().split('T')[0],
          status: 'Paid'
        });
      }
    } catch (err) {
      console.warn('API sync warning (mock database fallback used):', err);
    }

    // Update state to success step
    setTransactionId(invoiceNum);
    setIsProcessing(false);
    setCheckoutStep(2);
  };

  const faqs = [
    { q: "Can I switch plans later?", a: "Yes! You can upgrade or downgrade your plan at any time. The change will be effective from your next billing cycle." },
    { q: "Is there an additional registration fee?", a: "There is a one-time registration fee of ₹999 which includes a welcome academy kit, a custom team T-shirt, and an ID card." },
    { q: "What if I miss a class?", a: "We offer 2 complimentary make-up classes per month. These must be booked within 30 days and do not carry over to the next month." },
    { q: "Do you offer trial classes?", a: "Absolutely! The first class is completely free. No commitment or credit card is required." },
    { q: "Is there a refund policy?", a: "We offer a 7-day money-back guarantee if you are not fully satisfied with your first week of classes." }
  ];

  const calculatedValues = selectedItem ? calculateTotal(selectedItem.price || selectedItem.fee) : { subtotal: 0, gst: 0, total: 0 };

  return (
    <div className="fees-page page-fade-in" style={{ background: '#090514', color: '#fff', minHeight: '100vh', fontFamily: "'Poppins', sans-serif" }}>

      {/* Dynamic Glow Orbs */}
      <div className="glow-orb orb-1" />
      <div className="glow-orb orb-2" />

      {/* Hero Section */}
      <div className="fees-hero">
        <div className="fees-hero-overlay" />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <span className="premium-tag">
            EXCLUSIVE MEMBERSHIPS & OFFERS
          </span>
          <h1 className="hero-title">
            Invest in Your <span className="gradient-text">Passion</span>
          </h1>
          <p className="hero-subtitle">
            Choose a plan that fits your dance ambitions. From beginner classes to professional certification tracks.
          </p>
        </div>
      </div>

      {/* Main pricing content */}
      <section className="section-pricing" style={{ padding: '20px 0 80px', position: 'relative', zIndex: 5 }}>
        <div className="container">

          {/* Billing Cycle Switcher */}
          <div className="billing-cycle-wrap">
            <div className="billing-cycle-container">
              {[
                { id: 'monthly', label: 'Monthly', desc: 'No commitment' },
                { id: 'quarterly', label: 'Quarterly', desc: 'Save 10%' },
                { id: 'halfYearly', label: '6 Months', desc: 'Save 15%' },
                { id: 'yearly', label: 'Yearly', desc: 'Save 25%' }
              ].map(cycle => (
                <button
                  key={cycle.id}
                  onClick={() => setBillingCycle(cycle.id)}
                  className={`billing-btn ${billingCycle === cycle.id ? 'active' : ''}`}
                >
                  <span className="billing-label">{cycle.label}</span>
                  {cycle.desc && <span className="billing-desc">{cycle.desc}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Core Plans */}
          <div className="pricing-grid">
            {plans.map((plan) => {
              const computed = calculateTotal(plan.price);
              const { months } = getMultiplierAndDiscount();

              return (
                <div
                  key={plan.name}
                  className={`pricing-card-wrap ${plan.recommended ? 'recommended' : ''}`}
                >
                  {plan.badge && (
                    <div className="card-badge-glow">
                      {plan.badge}
                    </div>
                  )}

                  <div className="pricing-card">
                    <div className="card-head">
                      <div className="card-icon-wrap" style={{ background: plan.recommended ? 'linear-gradient(135deg, #ec4899, #7c3aed)' : 'rgba(255,255,255,0.05)' }}>
                        <span className="card-icon">{plan.icon}</span>
                      </div>
                      <h3 className="card-tagline">{plan.tagline}</h3>
                      <h2 className="card-name">{plan.name}</h2>
                      <p className="card-description">{plan.description}</p>
                    </div>

                    <div className="price-tag-wrap">
                      <span className="price-symbol">₹</span>
                      <span className="price-amount">{Math.round(computed.total / months).toLocaleString()}</span>
                      <span className="price-period">/month</span>
                    </div>
                    {months > 1 && (
                      <div className="price-billed-total">
                        Billed ₹{computed.total.toLocaleString()} every {months} months
                      </div>
                    )}

                    <div className="features-list">
                      {plan.features.map((feature, i) => (
                        <div key={i} className={`feature-item ${feature.included ? 'included' : 'excluded'}`}>
                          <span className="feature-marker">
                            {feature.included ? <FiCheck /> : <FiX />}
                          </span>
                          <span className="feature-text">{feature.text}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handleOpenCheckout(plan, 'plan')}
                      className={`btn-choose ${plan.recommended ? 'recommended' : ''}`}
                    >
                      Get Started <FiArrowRight />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Premium Combos */}
          <div className="special-offers-section" style={{ margin: '80px 0' }}>
            <div className="section-header-center">
              <span className="pre-label">BEST VALUE COMBOS</span>
              <h2>Curated Special Packages</h2>
              <p>Tailored for families, corporate teams, and long-term students</p>
            </div>

            <div className="combos-grid">
              {combos.map(combo => (
                <div key={combo.name} className="combo-card">
                  <div className="combo-icon-pill">{combo.icon}</div>
                  <h3 className="combo-name">{combo.name}</h3>
                  <p className="combo-desc">{combo.description}</p>

                  <div className="combo-price">
                    <span className="combo-amount">₹{combo.price.toLocaleString()}</span>
                    <span className="combo-period">/month</span>
                  </div>

                  <ul className="combo-features">
                    {combo.features.map(f => (
                      <li key={f}>
                        <FiCheck className="combo-check-icon" /> {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleOpenCheckout(combo, 'combo')}
                    className="combo-btn"
                  >
                    Select Combo <FiArrowRight />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pay Per Course */}
          <div className="individual-courses-section" style={{ margin: '80px 0' }}>
            <div className="section-header-center">
              <span className="pre-label">FLEXIBLE ENROLLMENT</span>
              <h2>Pay Per Course</h2>
              <p>No memberships. Pick single programs and study at your own pace.</p>
            </div>

            <div className="courses-price-grid">
              {enhancedCourses.map(course => (
                <div key={course.id} className="course-price-card">
                  <div className="course-card-bg" style={{ backgroundImage: `url(${course.bgImage})` }} />
                  <div className="course-card-gradient" />

                  <div className="course-card-content">
                    <span className="course-duration-tag">⏱ {course.duration} • {course.schedule}</span>
                    <h3 className="course-title">{course.name}</h3>

                    <div className="course-price-bottom">
                      <div>
                        <span className="course-price-label">Price per month</span>
                        <div className="course-price-val">₹{course.fee.toLocaleString()}</div>
                      </div>

                      <button
                        onClick={() => handleOpenCheckout(course, 'course')}
                        className="course-enroll-btn"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="faq-section" style={{ maxWidth: 850, margin: '80px auto 40px' }}>
            <div className="section-header-center">
              <span className="pre-label">SUPPORT & FAQ</span>
              <h2>Got Questions?</h2>
              <p>Everything you need to know about pricing, billing, and cancellations</p>
            </div>

            <div className="faq-accordion">
              {faqs.map((faq, idx) => {
                const isOpen = faqOpen === idx;
                return (
                  <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                    <button
                      onClick={() => setFaqOpen(isOpen ? null : idx)}
                      className="faq-trigger"
                    >
                      <span className="faq-question">
                        <FiHelpCircle className="faq-icon-help" /> {faq.q}
                      </span>
                      <span className="faq-icon-arrow">
                        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                      </span>
                    </button>
                    <div className="faq-content-wrap">
                      <div className="faq-content">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Call To Action */}
          <div className="final-trial-cta">
            <div className="cta-glow-effect" />
            <div className="cta-inner">
              <span className="cta-tag">ZERO RISK TRIAL</span>
              <h2>Start Your Dance Journey Today</h2>
              <p>Book a free 30-minute introductory trial session with one of our certified instructors.</p>

              <div className="cta-actions">
                <button
                  onClick={() => handleOpenCheckout({ name: "Free Trial Class", price: 0 }, 'trial')}
                  className="btn-trial-accent"
                >
                  Book Free Trial Class
                </button>
                <button
                  onClick={() => setShowAdvisorModal(true)}
                  className="btn-trial-outline"
                >
                  Request Callback
                </button>
              </div>
              <span className="cta-subtext">No credit card required • Book in under 60 seconds</span>
            </div>
          </div>

        </div>
      </section>

      {/* CHECKOUT MODAL */}
      {showCheckout && selectedItem && (
        <div className="checkout-overlay" onClick={() => !isProcessing && setShowCheckout(false)}>
          <div className="checkout-modal" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => !isProcessing && setShowCheckout(false)}
              className="checkout-close"
              disabled={isProcessing}
            >
              <FiX />
            </button>

            {checkoutStep === 1 ? (
              <div className="checkout-step-1">
                <h2 className="modal-title">Complete Enrollment</h2>
                <p className="modal-subtitle">Review your selection and complete secure payment</p>

                <div className="checkout-layout">

                  {/* Left Column: Order Summary */}
                  <div className="checkout-summary-box">
                    <h3 className="summary-title">Order Summary</h3>

                    <div className="summary-details">
                      <div className="item-badge-row">
                        <span className="item-name">{selectedItem.name}</span>
                        <span className="item-type-tag">{selectedType.toUpperCase()}</span>
                      </div>

                      {selectedType === 'plan' && (
                        <div className="cycle-indicator-row">
                          <span>Billing Cycle:</span>
                          <strong>{billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)}</strong>
                        </div>
                      )}
                    </div>

                    <div className="invoice-breakdown">
                      <div className="invoice-row">
                        <span>Base Price</span>
                        <span>₹{(selectedItem.price || selectedItem.fee || 0).toLocaleString()}</span>
                      </div>

                      {selectedType === 'plan' && getMultiplierAndDiscount().months > 1 && (
                        <>
                          <div className="invoice-row">
                            <span>Duration</span>
                            <span>x {getMultiplierAndDiscount().months} Months</span>
                          </div>
                          {getMultiplierAndDiscount().discount > 0 && (
                            <div className="invoice-row discount-row">
                              <span>Plan Discount ({getMultiplierAndDiscount().label})</span>
                              <span>- ₹{Math.round((selectedItem.price * getMultiplierAndDiscount().months) * getMultiplierAndDiscount().discount).toLocaleString()}</span>
                            </div>
                          )}
                        </>
                      )}

                      <div className="invoice-row">
                        <span>Subtotal</span>
                        <span>₹{calculatedValues.subtotal.toLocaleString()}</span>
                      </div>

                      <div className="invoice-row">
                        <span>GST (18%)</span>
                        <span>₹{calculatedValues.gst.toLocaleString()}</span>
                      </div>

                      <div className="invoice-divider" />

                      <div className="invoice-row total-row">
                        <span>Grand Total</span>
                        <span>₹{calculatedValues.total.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="secure-badge">
                      <FiShield className="shield-icon" />
                      <span>Secured with 256-bit SSL encryption</span>
                    </div>
                  </div>

                  {/* Right Column: Payment Form */}
                  <div className="checkout-payment-box">
                    <h3 className="payment-title">Select Payment Method</h3>

                    <div className="payment-methods">
                      {paymentOptions.map(opt => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedPayment(opt.id)}
                          className={`payment-method-btn ${selectedPayment === opt.id ? 'active' : ''}`}
                        >
                          <span className="opt-icon">{opt.icon}</span>
                          <span className="opt-name">{opt.name}</span>
                        </button>
                      ))}
                    </div>

                    <form onSubmit={handleConfirmPayment} className="payment-form">
                      {selectedPayment === 'card' ? (
                        <div className="card-fields">
                          {/* Premium Card Display Mockup */}
                          <div className="credit-card-mockup">
                            <div className="card-glow" />
                            <div className="card-logo">Rhythmique Pay</div>
                            <div className="card-chip" />
                            <div className="card-number-display">
                              {cardForm.number || '••••  ••••  ••••  ••••'}
                            </div>
                            <div className="card-bottom-row">
                              <div>
                                <span className="label">CARDHOLDER</span>
                                <span className="val">{cardForm.name.toUpperCase() || 'YOUR NAME'}</span>
                              </div>
                              <div>
                                <span className="label">EXPIRES</span>
                                <span className="val">{cardForm.expiry || 'MM/YY'}</span>
                              </div>
                            </div>
                          </div>

                          {/* Inputs */}
                          <div className="form-group-light">
                            <label>Card Number</label>
                            <input
                              type="text"
                              required
                              maxLength="19"
                              placeholder="4111 2222 3333 4444"
                              value={cardForm.number}
                              onChange={e => {
                                const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                                setCardForm({ ...cardForm, number: val });
                              }}
                            />
                          </div>

                          <div className="form-group-light">
                            <label>Cardholder Name</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. John Doe"
                              value={cardForm.name}
                              onChange={e => setCardForm({ ...cardForm, name: e.target.value })}
                            />
                          </div>

                          <div className="form-row">
                            <div className="form-group-light">
                              <label>Expiry Date</label>
                              <input
                                type="text"
                                required
                                maxLength="5"
                                placeholder="MM/YY"
                                value={cardForm.expiry}
                                onChange={e => {
                                  let val = e.target.value.replace(/\D/g, '');
                                  if (val.length > 2) val = val.substring(0, 2) + '/' + val.substring(2);
                                  setCardForm({ ...cardForm, expiry: val });
                                }}
                              />
                            </div>
                            <div className="form-group-light">
                              <label>CVC / CVV</label>
                              <input
                                type="password"
                                required
                                maxLength="3"
                                placeholder="•••"
                                value={cardForm.cvc}
                                onChange={e => setCardForm({ ...cardForm, cvc: e.target.value.replace(/\D/g, '') })}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="upi-fields">
                          <div className="upi-qr-box">
                            <div className="qr-placeholder">
                              {/* Inline SVG QR Mockup */}
                              <svg width="120" height="120" viewBox="0 0 100 100">
                                <rect x="0" y="0" width="100" height="100" fill="white" />
                                <rect x="10" y="10" width="20" height="20" fill="black" />
                                <rect x="15" y="15" width="10" height="10" fill="white" />
                                <rect x="70" y="10" width="20" height="20" fill="black" />
                                <rect x="75" y="15" width="10" height="10" fill="white" />
                                <rect x="10" y="70" width="20" height="20" fill="black" />
                                <rect x="15" y="75" width="10" height="10" fill="white" />
                                <rect x="40" y="40" width="20" height="20" fill="black" />
                                <rect x="45" y="45" width="10" height="10" fill="white" />
                                <rect x="50" y="70" width="10" height="10" fill="black" />
                                <rect x="70" y="50" width="10" height="10" fill="black" />
                                <rect x="80" y="80" width="10" height="10" fill="black" />
                              </svg>
                            </div>
                            <p className="qr-caption">Scan QR code using any UPI app to pay</p>
                          </div>

                          <div className="upi-divider"><span>OR PAY WITH UPI ID</span></div>

                          <div className="form-group-light">
                            <label>UPI ID</label>
                            <input
                              type="text"
                              required={selectedPayment === 'upi'}
                              placeholder="username@okaxis"
                              value={upiForm.upiId}
                              onChange={e => setUpiForm({ ...upiForm, upiId: e.target.value })}
                            />
                          </div>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="btn-pay-submit"
                      >
                        {isProcessing ? (
                          <>
                            <FiLoader className="spinner" /> Processing Securely...
                          </>
                        ) : (
                          <>
                            Confirm Payment • ₹{calculatedValues.total.toLocaleString()}
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                </div>
              </div>
            ) : (
              <div className="checkout-step-2">
                <div className="success-badge-wrap">
                  <FiCheckCircle className="success-icon-check" />
                </div>
                <h2 className="success-title">Enrollment Successful!</h2>
                <p className="success-desc">
                  Congratulations! Your transaction has completed successfully. You are now officially enrolled in the academy.
                </p>

                <div className="success-invoice-card">
                  <div className="invoice-header">
                    <h4>Receipt / Invoice</h4>
                    <span>Paid</span>
                  </div>
                  <div className="invoice-body">
                    <div className="invoice-row-light">
                      <span>Purchased Package:</span>
                      <strong>{selectedItem.name}</strong>
                    </div>
                    <div className="invoice-row-light">
                      <span>Transaction Invoice:</span>
                      <strong>{transactionId}</strong>
                    </div>
                    <div className="invoice-row-light">
                      <span>Amount Billed:</span>
                      <strong>₹{calculatedValues.total.toLocaleString()}</strong>
                    </div>
                    <div className="invoice-row-light">
                      <span>Authorized Account:</span>
                      <strong>{user ? user.email : 'Guest Student'}</strong>
                    </div>
                  </div>
                </div>

                <div className="success-actions">
                  <Link
                    to="/dashboard"
                    onClick={() => setShowCheckout(false)}
                    className="success-btn-primary"
                  >
                    Go to Student Dashboard
                  </Link>
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="success-btn-secondary"
                  >
                    Back to Academy Shop
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ADVISOR CONSULTATION MODAL */}
      {showAdvisorModal && (
        <div className="checkout-overlay" onClick={() => setShowAdvisorModal(false)}>
          <div className="checkout-modal" style={{ maxWidth: 450, padding: 36 }} onClick={e => e.stopPropagation()}>
            <button
              onClick={() => { setShowAdvisorModal(false); setAdvisorSubmitted(false); }}
              className="checkout-close"
            >
              <FiX />
            </button>

            {advisorSubmitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div className="success-badge-wrap" style={{ background: '#ecfdf5', color: '#10b981', margin: '0 auto 20px' }}>
                  <FiCheckCircle style={{ fontSize: '2.5rem' }} />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: 12, fontWeight: 700 }}>Request Submitted!</h3>
                <p style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 24 }}>
                  Our dance coordinator will contact you at <strong>{advisorForm.phone}</strong> within 24 hours to schedule your personalized session.
                </p>
                <button
                  onClick={() => { setShowAdvisorModal(false); setAdvisorSubmitted(false); }}
                  className="success-btn-primary"
                  style={{ width: '100%', display: 'block' }}
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 'bold', marginBottom: 8 }}>Talk to a Dance Advisor</h3>
                <p style={{ color: '#bbb', fontSize: '0.88rem', marginBottom: 24, lineHeight: 1.5 }}>
                  Leave your details and a coordinator will guide you in choosing the best curriculum.
                </p>

                <form onSubmit={(e) => { e.preventDefault(); setAdvisorSubmitted(true); }}>
                  <div className="form-group-light" style={{ marginBottom: 16 }}>
                    <label>Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Doe"
                      value={advisorForm.name}
                      onChange={e => setAdvisorForm({ ...advisorForm, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group-light" style={{ marginBottom: 16 }}>
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={advisorForm.phone}
                      onChange={e => setAdvisorForm({ ...advisorForm, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group-light" style={{ marginBottom: 24 }}>
                    <label>Dance Style Preference</label>
                    <select
                      value={advisorForm.style}
                      onChange={e => setAdvisorForm({ ...advisorForm, style: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#1a142e',
                        border: '2px solid #2d264f',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '0.95rem',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="Ballet">Ballet</option>
                      <option value="Hip-Hop">Hip-Hop</option>
                      <option value="Kathak">Kathak</option>
                      <option value="Contemporary">Contemporary</option>
                      <option value="Salsa">Salsa</option>
                      <option value="Bharatanatyam">Bharatanatyam</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn-pay-submit"
                  >
                    Submit Request
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CORE CSS STYLING OVERHAUL */}
      <style>{`
        /* Orbs background */
        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          opacity: 0.15;
          z-index: 1;
          pointer-events: none;
        }
        .orb-1 {
          width: 500px;
          height: 500px;
          background: #7c3aed;
          top: 10%;
          left: -10%;
        }
        .orb-2 {
          width: 450px;
          height: 450px;
          background: #ec4899;
          bottom: 20%;
          right: -5%;
        }

        /* Hero */
        .fees-hero {
          position: relative;
          padding: 120px 0 80px;
          text-align: center;
          background: linear-gradient(180deg, #05020c 0%, #090514 100%);
          overflow: hidden;
        }
        .fees-hero-overlay {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 50% 50%, rgba(109, 40, 217, 0.08) 0%, transparent 70%);
        }
        .premium-tag {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 700;
          color: #fbbf24;
          background: rgba(251, 191, 36, 0.08);
          border: 1px solid rgba(251, 191, 36, 0.25);
          padding: 6px 18px;
          border-radius: 100px;
          margin-bottom: 24px;
          letter-spacing: 1.5px;
          text-shadow: 0 0 10px rgba(251, 191, 36, 0.2);
        }
        .hero-title {
          font-family: 'Poppins', sans-serif;
          font-size: 3.5rem;
          font-weight: 900;
          color: white;
          letter-spacing: -1px;
          margin-bottom: 18px;
          line-height: 1.25;
        }
        .gradient-text {
          background: linear-gradient(135deg, #a78bfa 0%, #ec4899 50%, #f43f5e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          font-size: 1.15rem;
          color: #9ca3af;
          max-width: 650px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Billing cycle switches */
        .billing-cycle-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 50px;
        }
        .billing-cycle-container {
          display: inline-flex;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 6px;
          border-radius: 100px;
          gap: 4px;
          backdrop-filter: blur(10px);
        }
        .billing-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 24px;
          border-radius: 100px;
          background: transparent;
          border: none;
          color: #9ca3af;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .billing-btn:hover {
          color: white;
          background: rgba(255, 255, 255, 0.02);
        }
        .billing-btn.active {
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          color: white;
          box-shadow: 0 4px 20px rgba(124, 58, 237, 0.3);
        }
        .billing-label {
          font-size: 0.9rem;
          font-weight: 700;
        }
        .billing-desc {
          font-size: 0.65rem;
          opacity: 0.8;
          font-weight: 500;
          margin-top: 2px;
          text-transform: uppercase;
        }

        /* Pricing grid */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }
        .pricing-card-wrap {
          position: relative;
          background: rgba(15, 10, 30, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 28px;
          padding: 2px;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          backdrop-filter: blur(20px);
        }
        .pricing-card-wrap:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }
        .pricing-card-wrap.recommended {
          background: linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(124, 58, 237, 0.2) 100%);
          border-color: rgba(124, 58, 237, 0.4);
          box-shadow: 0 10px 30px rgba(124, 58, 237, 0.15);
        }
        .pricing-card-wrap.recommended:hover {
          box-shadow: 0 25px 50px rgba(124, 58, 237, 0.35);
        }
        .pricing-card {
          padding: 40px 32px;
          height: 100%;
          display: flex;
          flex-direction: column;
          border-radius: 26px;
          background: #110c22;
        }
        .pricing-card-wrap.recommended .pricing-card {
          background: #150d2e;
        }

        /* Badges */
        .card-badge-glow {
          position: absolute;
          top: -16px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(90deg, #ec4899, #7c3aed);
          color: white;
          padding: 6px 20px;
          font-size: 0.75rem;
          font-weight: 800;
          border-radius: 50px;
          letter-spacing: 1px;
          box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4);
          z-index: 5;
        }

        /* Card components */
        .card-head {
          margin-bottom: 30px;
        }
        .card-icon-wrap {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          margin-bottom: 24px;
        }
        .card-tagline {
          font-size: 0.85rem;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .card-name {
          font-size: 1.8rem;
          font-weight: 800;
          color: white;
          margin-bottom: 12px;
        }
        .card-description {
          font-size: 0.9rem;
          color: #9ca3af;
          line-height: 1.5;
        }

        .price-tag-wrap {
          display: flex;
          align-items: baseline;
          margin-bottom: 6px;
        }
        .price-symbol {
          font-size: 1.8rem;
          font-weight: 700;
          color: white;
          margin-right: 4px;
        }
        .price-amount {
          font-size: 3rem;
          font-weight: 900;
          color: white;
          line-height: 1;
        }
        .price-period {
          font-size: 0.95rem;
          color: #9ca3af;
          margin-left: 6px;
        }
        .price-billed-total {
          font-size: 0.8rem;
          color: #a78bfa;
          font-weight: 600;
          margin-bottom: 30px;
        }

        /* Feature items */
        .features-list {
          margin-bottom: 40px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex-grow: 1;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.92rem;
        }
        .feature-item.included {
          color: #e5e7eb;
        }
        .feature-item.excluded {
          color: #4b5563;
          text-decoration: line-through;
        }
        .feature-marker {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
        }
        .feature-item.included .feature-marker {
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
        }
        .feature-item.excluded .feature-marker {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .btn-choose {
          width: 100%;
          padding: 15px;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s;
        }
        .btn-choose:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: scale(1.02);
        }
        .btn-choose.recommended {
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          border: none;
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
        }
        .btn-choose.recommended:hover {
          box-shadow: 0 8px 25px rgba(124, 58, 237, 0.5);
          background: linear-gradient(135deg, #8b5cf6, #f43f5e);
        }

        /* Center Titles */
        .section-header-center {
          text-align: center;
          margin-bottom: 50px;
        }
        .pre-label {
          font-size: 0.75rem;
          font-weight: 800;
          color: #a78bfa;
          letter-spacing: 2px;
          text-transform: uppercase;
          display: block;
          margin-bottom: 10px;
        }
        .section-header-center h2 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 12px;
        }
        .section-header-center p {
          color: #9ca3af;
          font-size: 1.05rem;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Combo layout */
        .combos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }
        .combo-card {
          background: #110c22;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          padding: 36px 30px;
          text-align: center;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .combo-card:hover {
          transform: translateY(-5px);
          border-color: rgba(124, 58, 237, 0.3);
          box-shadow: 0 15px 35px rgba(0,0,0,0.4);
        }
        .combo-icon-pill {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: rgba(124, 58, 237, 0.1);
          font-size: 1.8rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }
        .combo-name {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .combo-desc {
          font-size: 0.88rem;
          color: #9ca3af;
          margin-bottom: 20px;
        }
        .combo-price {
          margin-bottom: 24px;
        }
        .combo-amount {
          font-size: 2.2rem;
          font-weight: 800;
          color: white;
        }
        .combo-period {
          font-size: 0.85rem;
          color: #9ca3af;
        }
        .combo-features {
          list-style: none;
          padding: 0;
          margin: 0 0 30px 0;
          text-align: left;
          display: inline-block;
        }
        .combo-features li {
          font-size: 0.9rem;
          color: #d1d5db;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .combo-check-icon {
          color: #10b981;
          flex-shrink: 0;
        }
        .combo-btn {
          width: 100%;
          padding: 12px 20px;
          border-radius: 100px;
          background: transparent;
          border: 2px solid #7c3aed;
          color: #a78bfa;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
        }
        .combo-btn:hover {
          background: #7c3aed;
          color: white;
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
        }

        /* Pay Per Course cards */
        .courses-price-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 25px;
        }
        .course-price-card {
          position: relative;
          border-radius: 20px;
          height: 200px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          transition: transform 0.3s;
        }
        .course-price-card:hover {
          transform: scale(1.02);
        }
        .course-card-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 0.5s;
        }
        .course-price-card:hover .course-card-bg {
          transform: scale(1.08);
        }
        .course-card-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(9, 5, 20, 0.95) 0%, rgba(9, 5, 20, 0.4) 100%);
        }
        .course-card-content {
          position: relative;
          z-index: 2;
          padding: 24px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .course-duration-tag {
          font-size: 0.72rem;
          font-weight: 700;
          color: #fbbf24;
          text-transform: uppercase;
          margin-bottom: 6px;
          display: block;
        }
        .course-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: white;
          margin-bottom: 12px;
        }
        .course-price-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .course-price-label {
          font-size: 0.7rem;
          color: #9ca3af;
          display: block;
        }
        .course-price-val {
          font-size: 1.5rem;
          font-weight: 800;
          color: white;
        }
        .course-enroll-btn {
          padding: 8px 18px;
          border-radius: 80px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          backdrop-filter: blur(8px);
          transition: all 0.3s;
        }
        .course-enroll-btn:hover {
          background: white;
          color: #090514;
          border-color: white;
        }

        /* FAQ accordion */
        .faq-accordion {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .faq-item {
          background: #110c22;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s;
        }
        .faq-item.open {
          border-color: rgba(124, 58, 237, 0.3);
          background: #140f2a;
        }
        .faq-trigger {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          background: transparent;
          border: none;
          color: white;
          font-family: inherit;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          text-align: left;
        }
        .faq-question {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .faq-icon-help {
          color: #7c3aed;
          flex-shrink: 0;
        }
        .faq-icon-arrow {
          font-size: 1.2rem;
          color: #9ca3af;
        }
        .faq-content-wrap {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
        }
        .faq-item.open .faq-content-wrap {
          max-height: 200px;
        }
        .faq-content {
          padding: 0 24px 20px 56px;
          color: #9ca3af;
          font-size: 0.92rem;
          line-height: 1.6;
        }

        /* CTA */
        .final-trial-cta {
          position: relative;
          background: #110c22;
          border-radius: 28px;
          padding: 60px 40px;
          text-align: center;
          margin-top: 80px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .cta-glow-effect {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(236, 72, 153, 0.08) 0%, transparent 60%);
        }
        .cta-inner {
          position: relative;
          z-index: 2;
        }
        .cta-tag {
          font-size: 0.75rem;
          font-weight: 800;
          color: #ec4899;
          background: rgba(236, 72, 153, 0.1);
          border: 1px solid rgba(236, 72, 153, 0.2);
          padding: 4px 14px;
          border-radius: 50px;
          letter-spacing: 1px;
          margin-bottom: 18px;
          display: inline-block;
        }
        .final-trial-cta h2 {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 12px;
        }
        .final-trial-cta p {
          font-size: 1.05rem;
          color: #9ca3af;
          margin-bottom: 32px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .cta-actions {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .btn-trial-accent {
          padding: 14px 32px;
          border-radius: 100px;
          background: linear-gradient(135deg, #ec4899, #7c3aed);
          color: white;
          font-weight: 700;
          font-size: 0.95rem;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
          transition: all 0.3s;
        }
        .btn-trial-accent:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(236, 72, 153, 0.5);
        }
        .btn-trial-outline {
          padding: 14px 32px;
          border-radius: 100px;
          background: transparent;
          border: 2px solid white;
          color: white;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s;
        }
        .btn-trial-outline:hover {
          background: white;
          color: #090514;
          transform: translateY(-2px);
        }
        .cta-subtext {
          font-size: 0.78rem;
          color: #6b7280;
        }

        /* CHECKOUT MODAL STYLE */
        .checkout-overlay {
          position: fixed;
          inset: 0;
          background: rgba(9, 5, 20, 0.7);
          backdrop-filter: blur(12px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: modalFadeIn 0.3s ease-out;
        }
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .checkout-modal {
          background: #110c22;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 28px;
          width: 100%;
          max-width: 900px;
          position: relative;
          padding: 40px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
          animation: modalSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes modalSlideUp {
          from { transform: translateY(30px) scale(0.95); }
          to { transform: translateY(0) scale(1); }
        }
        .checkout-close {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: #9ca3af;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.1rem;
          transition: all 0.2s;
        }
        .checkout-close:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }
        .modal-title {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 6px;
        }
        .modal-subtitle {
          font-size: 0.9rem;
          color: #9ca3af;
          margin-bottom: 30px;
        }

        .checkout-layout {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 40px;
        }
        @media (max-width: 768px) {
          .checkout-layout {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        /* Order summary */
        .checkout-summary-box {
          background: #17102c;
          border-radius: 20px;
          padding: 28px;
          border: 1px solid rgba(124, 58, 237, 0.1);
        }
        .summary-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding-bottom: 12px;
        }
        .summary-details {
          margin-bottom: 24px;
        }
        .item-badge-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .item-name {
          font-size: 1.25rem;
          font-weight: 800;
          color: white;
        }
        .item-type-tag {
          font-size: 0.65rem;
          font-weight: 800;
          background: rgba(124, 58, 237, 0.15);
          color: #a78bfa;
          border: 1px solid rgba(124, 58, 237, 0.3);
          padding: 3px 10px;
          border-radius: 4px;
        }
        .cycle-indicator-row {
          font-size: 0.85rem;
          color: #9ca3af;
        }
        .cycle-indicator-row strong {
          color: white;
          margin-left: 6px;
        }

        .invoice-breakdown {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .invoice-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: #9ca3af;
        }
        .invoice-row.discount-row {
          color: #10b981;
          font-weight: 600;
        }
        .invoice-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          margin: 6px 0;
        }
        .invoice-row.total-row {
          font-size: 1.25rem;
          font-weight: 800;
          color: white;
        }

        .secure-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          color: #6b7280;
          margin-top: 30px;
          justify-content: center;
        }
        .shield-icon {
          color: #10b981;
        }

        /* Payment Form */
        .payment-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 16px;
        }
        .payment-methods {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
        }
        .payment-method-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: #9ca3af;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .payment-method-btn:hover {
          border-color: rgba(255, 255, 255, 0.15);
          color: white;
        }
        .payment-method-btn.active {
          background: rgba(124, 58, 237, 0.1);
          border-color: #7c3aed;
          color: #a78bfa;
        }

        /* Card form fields */
        .credit-card-mockup {
          position: relative;
          background: linear-gradient(135deg, #7c3aed 0%, #a21caf 100%);
          border-radius: 16px;
          padding: 24px;
          height: 160px;
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.4);
        }
        .card-glow {
          position: absolute;
          width: 150px;
          height: 150px;
          background: rgba(255,255,255,0.15);
          filter: blur(40px);
          border-radius: 50%;
          top: -50px;
          right: -50px;
        }
        .card-logo {
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        .card-chip {
          width: 32px;
          height: 24px;
          background: #f59e0b;
          border-radius: 4px;
          margin: 12px 0;
        }
        .card-number-display {
          font-size: 1.2rem;
          font-family: monospace;
          letter-spacing: 2px;
          margin-bottom: 12px;
        }
        .card-bottom-row {
          display: flex;
          justify-content: space-between;
        }
        .card-bottom-row .label {
          font-size: 0.55rem;
          color: rgba(255, 255, 255, 0.6);
          display: block;
          margin-bottom: 2px;
        }
        .card-bottom-row .val {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .form-group-light {
          display: flex;
          flex-direction: column;
          margin-bottom: 16px;
        }
        .form-group-light label {
          font-size: 0.78rem;
          font-weight: 600;
          color: #9ca3af;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .form-group-light input {
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(255, 255, 255, 0.06);
          padding: 12px 16px;
          border-radius: 12px;
          color: white;
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-group-light input:focus {
          border-color: #7c3aed;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        /* UPI layout */
        .upi-fields {
          text-align: center;
        }
        .upi-qr-box {
          background: rgba(255,255,255,0.02);
          border: 1px dashed rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 24px;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }
        .qr-placeholder {
          padding: 10px;
          background: white;
          border-radius: 8px;
          margin-bottom: 12px;
        }
        .qr-caption {
          font-size: 0.78rem;
          color: #9ca3af;
        }
        .upi-divider {
          position: relative;
          text-align: center;
          margin: 24px 0;
        }
        .upi-divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(255, 255, 255, 0.06);
        }
        .upi-divider span {
          position: relative;
          background: #110c22;
          padding: 0 16px;
          font-size: 0.72rem;
          color: #6b7280;
          font-weight: 700;
          letter-spacing: 1px;
        }

        /* Submit Button */
        .btn-pay-submit {
          width: 100%;
          padding: 16px;
          border-radius: 100px;
          background: linear-gradient(90deg, #7c3aed, #ec4899);
          border: none;
          color: white;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 10px;
          box-shadow: 0 5px 20px rgba(124, 58, 237, 0.3);
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .btn-pay-submit:hover {
          box-shadow: 0 8px 25px rgba(124, 58, 237, 0.5);
          transform: translateY(-2px);
        }
        .btn-pay-submit:disabled {
          background: #4c1d95;
          cursor: not-allowed;
          box-shadow: none;
        }
        .spinner {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* SUCCESS VIEW STYLE */
        .checkout-step-2 {
          text-align: center;
          padding: 20px 0;
          max-width: 500px;
          margin: 0 auto;
        }
        .success-badge-wrap {
          width: 76px;
          height: 76px;
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
        }
        .success-icon-check {
          font-size: 3rem;
        }
        .success-title {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 12px;
        }
        .success-desc {
          color: #9ca3af;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .success-invoice-card {
          background: #17102c;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 24px;
          text-align: left;
          margin-bottom: 36px;
        }
        .invoice-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 18px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding-bottom: 12px;
        }
        .invoice-header h4 {
          font-size: 1rem;
          font-weight: 700;
        }
        .invoice-header span {
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          padding: 3px 10px;
          font-size: 0.7rem;
          font-weight: 800;
          border-radius: 4px;
          text-transform: uppercase;
        }
        .invoice-body {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .invoice-row-light {
          display: flex;
          justify-content: space-between;
          font-size: 0.88rem;
        }
        .invoice-row-light span {
          color: #9ca3af;
        }

        .success-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .success-btn-primary {
          display: block;
          width: 100%;
          padding: 14px;
          border-radius: 100px;
          background: #7c3aed;
          color: white;
          font-weight: 700;
          text-align: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .success-btn-primary:hover {
          background: #6d28d9;
        }
        .success-btn-secondary {
          display: block;
          width: 100%;
          padding: 14px;
          border-radius: 100px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          color: #d1d5db;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .success-btn-secondary:hover {
          background: rgba(255,255,255,0.08);
          color: white;
        }
      `}</style>
    </div>
  );
}
