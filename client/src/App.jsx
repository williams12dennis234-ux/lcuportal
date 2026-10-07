import React, { useState, useEffect } from 'react';
import {
  Home,
  Bell,
  LogOut,
  Menu,
  X,
  CreditCard,
  BookOpen,
  FileText,
  Award,
  Calendar,
  Building,
  UserCheck,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Printer,
  DollarSign,
  Info,
  ShieldCheck,
  Facebook,
  Twitter,
  Instagram,
  ArrowLeft
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || '';

export default function App() {
  // Authentication & View State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState('dashboard'); // dashboard, courses, course-slip, wallet, results, hostel, id-card, timetable, notices, profile
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Login form state
  const [loginUsername, setLoginUsername] = useState('LCU/UG/23/25649');
  const [loginPassword, setLoginPassword] = useState('welead@uni');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Student State
  const [student, setStudent] = useState({
    matricNo: 'LCU/UG/23/25649',
    fullName: 'WILLIAMS Dennis Egwu',
    firstName: 'Williams',
    faculty: 'Applied Sciences',
    department: 'Computer and Physical Sciences',
    programme: 'Computer Science',
    level: '400',
    modeOfStudy: 'Full Time',
    session: '2026/2027 Session - First Semester',
    passportPhoto: '/assets/student_passport.png',
    totalAmount: 2572000,
    amountPaid: 1400000,
    balanceDue: 1172000,
    walletBalance: 0,
    registeredCourses: [],
    email: 'williams.dennis@lcu.edu.ng',
    phone: '+234 813 456 7890',
    gender: 'Male',
    dob: '14 August 2003',
    stateOfOrigin: 'Ebonyi State',
    nationality: 'Nigerian',
    bloodGroup: 'O+',
    genotype: 'AA',
    hostel: {
      allocated: true,
      hostelName: 'Emerald Hall (Male Block)',
      roomNumber: 'Room B-204',
      bedSpace: 'Bed 2',
      status: 'Confirmed'
    }
  });

  // Data Collections
  const [courses, setCourses] = useState([
    { code: 'CSC 411', title: 'Software Engineering II', units: 3, status: 'Compulsory', lecturer: 'Dr. A. O. Adeleke' },
    { code: 'CSC 413', title: 'Artificial Intelligence & Neural Networks', units: 3, status: 'Compulsory', lecturer: 'Prof. F. E. Babatunde' },
    { code: 'CSC 415', title: 'Computer Graphics & Interactive Systems', units: 3, status: 'Elective', lecturer: 'Dr. K. M. Ogunleye' },
    { code: 'CSC 417', title: 'Compiler Construction', units: 3, status: 'Compulsory', lecturer: 'Dr. S. O. Balogun' },
    { code: 'CSC 419', title: 'Net-Centric Computing & Cloud Systems', units: 3, status: 'Compulsory', lecturer: 'Engr. D. T. Alabi' },
    { code: 'CSC 421', title: 'Final Year Research Project I', units: 3, status: 'Compulsory', lecturer: 'Departmental Board' },
    { code: 'CSC 423', title: 'Data Mining and Warehousing', units: 2, status: 'Elective', lecturer: 'Dr. C. I. Okonkwo' }
  ]);
  const [selectedCourses, setSelectedCourses] = useState(['CSC 411', 'CSC 413', 'CSC 417', 'CSC 419', 'CSC 421']);

  const [paymentAmount, setPaymentAmount] = useState('1172000');
  const [paySuccess, setPaySuccess] = useState(false);

  // Sync profile from backend if running
  useEffect(() => {
    fetch(`${API_BASE}/student/profile`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.student) {
          setStudent(data.student);
        }
      })
      .catch(err => {
        console.log('Using default local state:', err);
      });
  }, []);

  // Format currency in Naira
  const formatNaira = (amt) => {
    return '₦' + Number(amt).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');

    fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: loginUsername, password: loginPassword })
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        if (data.success) {
          setIsAuthenticated(true);
          setActiveView('dashboard');
          if (data.student) setStudent(data.student);
        } else {
          setLoginError(data.message || 'Invalid credentials');
        }
      })
      .catch(() => {
        // Fallback for seamless direct login
        setLoading(false);
        setIsAuthenticated(true);
        setActiveView('dashboard');
      });
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsDrawerOpen(false);
    setActiveView('dashboard');
    setShowWelcomeModal(false);
  };

  // Course toggle
  const toggleCourse = (code) => {
    if (selectedCourses.includes(code)) {
      setSelectedCourses(selectedCourses.filter(c => c !== code));
    } else {
      setSelectedCourses([...selectedCourses, code]);
    }
  };

  // Submit Course Registration
  const submitCourseRegistration = () => {
    const reg = courses.filter(c => selectedCourses.includes(c.code));
    setStudent({
      ...student,
      registeredCourses: reg
    });
    alert(`Success! ${reg.length} courses registered for First Semester.`);
    setActiveView('course-slip');
  };

  // Handle Fee Payment
  const handlePayment = (e) => {
    e.preventDefault();
    const payVal = Number(paymentAmount);
    if (!payVal || payVal <= 0) return;

    setStudent(prev => {
      const newPaid = prev.amountPaid + payVal;
      const newDue = Math.max(0, prev.totalAmount - newPaid);
      return {
        ...prev,
        amountPaid: newPaid,
        balanceDue: newDue
      };
    });
    setPaySuccess(true);
    setTimeout(() => setPaySuccess(false), 4000);
  };

  /* ==========================================================
     1. LOGIN PAGE (Official Lead City University UI)
     ========================================================== */
  if (!isAuthenticated) {
    return (
      <div className="login-page-bg">
        {/* Top Header */}
        <div className="official-header">
          <img src="/assets/logo.png" alt="Lead City University Crest" />
          <h1>Lead City University, Ibadan</h1>
        </div>

        {/* Center Login Box */}
        <div className="wrapper-login">
          <h3>Undergraduate Login</h3>
          <p className="login-subtitle">Enter your username and password to login.</p>

          {loginError && (
            <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '8px 12px', borderRadius: '4px', marginBottom: '14px', fontSize: '13.5px' }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username / Matriculation Number</label>
              <input
                type="text"
                className="form-control"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="e.g. LCU/UG/23/25649"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="form-group" style={{ marginTop: '20px' }}>
              <button type="submit" className="btn-lcu-primary" disabled={loading}>
                {loading ? 'Authenticating...' : 'Login'}
              </button>
            </div>

            <div className="login-links">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Please contact ICT support desk or use your registered institutional email.'); }}>
                  Forgot Password
                </a>
                <a href="#hostel" onClick={(e) => { e.preventDefault(); setShowWelcomeModal(true); }}>
                  Book a room
                </a>
              </div>
              <div style={{ textAlign: 'right' }}>
                <a href="#private-hostel" onClick={(e) => { e.preventDefault(); alert('Redirecting to Iddo Care Private Hostel Portal'); }}>
                  Book a room in a Private Hostel
                </a>
              </div>
            </div>
          </form>
        </div>

        {/* Official Welcome Modal */}
        {showWelcomeModal && (
          <div className="modal-backdrop" onClick={() => setShowWelcomeModal(false)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-x" onClick={() => setShowWelcomeModal(false)}>×</button>
              <h4 className="modal-header-title">Welcome to the 2026/2027 Session!</h4>
              <div className="modal-body">
                <p>To book a room, please follow these steps:</p>
                <ul>
                  <li>Log into the portal</li>
                  <li>Make a payment of 1,400,000 for accommodation and feeding</li>
                  <li>Visit <strong>hostel.lcu.edu.ng</strong> immediately</li>
                  <li>On the hostel portal, login with your Student Portal username and the generic password: <strong>welead@uni</strong></li>
                  <li>Pick a room of your choice</li>
                </ul>
              </div>
              <div className="modal-footer">
                <button className="btn-modal-close" onClick={() => setShowWelcomeModal(false)}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Official Footer */}
        <footer className="portal-footer">
          <div className="footer-social-icons">
            <span className="social-btn"><Facebook size={22} /></span>
            <span className="social-btn"><Twitter size={22} /></span>
            <span className="social-btn"><Instagram size={22} /></span>
          </div>
          <div className="footer-links-row">
            <a href="https://www.lcu.edu.ng" target="_blank" rel="noreferrer" className="footer-link-blue">
              Visit University Website
            </a>
          </div>
          <p className="footer-copyright">©2026 - DICT</p>
        </footer>
      </div>
    );
  }

  /* ==========================================================
     2. AUTHENTICATED PORTAL PAGES & DASHBOARD
     ========================================================== */
  return (
    <div className="portal-container">
      {/* Header Banner - Tartan pattern + LCU Crest + Text */}
      <header className="lcu-header">
        <img
          src="/assets/header_banner.png"
          alt="Lead City University, Ibadan Banner"
          className="tartan-banner"
          onError={(e) => {
            // Fallback display if banner image fails
            e.target.style.display = 'none';
            document.getElementById('css-banner-fallback').style.display = 'block';
          }}
        />
        <div id="css-banner-fallback" className="tartan-css-banner" style={{ display: 'none' }}>
          <img src="/assets/logo.png" alt="LCU Crest" className="lcu-crest-img" />
          <h1 className="lcu-banner-title">Lead City University, Ibadan</h1>
        </div>
      </header>

      {/* Top Action Bar */}
      <div className="top-action-bar">
        <h2 className="dashboard-title">
          {activeView === 'dashboard' ? 'Student Dashboard' : getPageTitle(activeView)}
        </h2>
        <div className="header-icons">
          <button className="icon-btn" title="Home" onClick={() => setActiveView('dashboard')}>
            <Home size={22} />
          </button>
          <button className="icon-btn" title="Notifications" onClick={() => setNotificationOpen(!notificationOpen)}>
            <Bell size={22} />
            <span className="notification-badge">1</span>
          </button>
          <button className="icon-btn" title="Logout" onClick={handleLogout}>
            <LogOut size={22} />
          </button>
        </div>
      </div>

      {/* Notifications Popover */}
      {notificationOpen && (
        <div style={{
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
          margin: '0 18px 12px 18px',
          padding: '12px 16px',
          borderRadius: '6px',
          fontSize: '13.5px',
          color: '#1e3a8a',
          position: 'relative'
        }}>
          <strong>📢 Notice:</strong> 2026/2027 First Semester Course Registration is currently OPEN. Deadline for final sign-off is Friday, 31st October.
          <button
            onClick={() => setNotificationOpen(false)}
            style={{ position: 'absolute', right: '10px', top: '10px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
          >
            ×
          </button>
        </div>
      )}

      {/* Greeting */}
      <div className="student-greeting">
        Good morning, <strong>{student.firstName}</strong>
      </div>

      {/* Navigation Widget Row: Hamburger Menu + Financial Overview */}
      <div className="portal-widget-row">
        {/* Hamburger Menu Toggle (Drop Down of all pages) */}
        <button
          className="hamburger-btn"
          aria-label="Open Navigation Drop Down"
          onClick={() => setIsDrawerOpen(true)}
          title="Click to view all organized portal pages"
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>

        {/* Financial Summary */}
        <div className="financial-summary">
          <div className="fin-item">
            <span className="fin-label">Total Amount: </span>
            <span className="fin-val-total">{formatNaira(student.totalAmount)}</span>
          </div>
          <div className="fin-item">
            <span className="fin-label">Amount Paid: </span>
            <span className="fin-val-paid">{formatNaira(student.amountPaid)}</span>
          </div>
          <div className="fin-item">
            <span className="fin-label">Balance Due: </span>
            <span className="fin-val-due">{formatNaira(student.balanceDue)}</span>
          </div>
          <button className="wallet-btn" onClick={() => setActiveView('wallet')}>
            <CreditCard size={15} />
            My Wallet
          </button>
        </div>
      </div>

      {/* Session Header Banner */}
      <div className="session-banner">
        {student.session}
      </div>

      {/* ========================================================
          MAIN BODY VIEWS
          ======================================================== */}
      {activeView === 'dashboard' && (
        <main>
          {/* Student Profile Information */}
          <div className="student-bio-section">
            <div className="bio-row">
              <span className="bio-label">Matriculation Number: </span>
              <span className="bio-val">{student.matricNo}</span>
            </div>
            <div className="bio-row">
              <span className="bio-label">Name: </span>
              <span className="bio-val">{student.fullName}</span>
            </div>
            <div className="bio-row">
              <span className="bio-label">Faculty: </span>
              <span className="bio-val">{student.faculty}</span>
            </div>
            <div className="bio-row">
              <span className="bio-label">Department: </span>
              <span className="bio-val">{student.department}</span>
            </div>
            <div className="bio-row">
              <span className="bio-label">Programme: </span>
              <span className="bio-val">{student.programme}</span>
            </div>
            <div className="bio-row">
              <span className="bio-label">Level: </span>
              <span className="bio-val">{student.level}</span>
            </div>
            <div className="bio-row">
              <span className="bio-label">Mode of Study: </span>
              <span className="bio-val">{student.modeOfStudy}</span>
            </div>
          </div>

          {/* Course Registration Counter */}
          <div className="course-status-banner">
            <strong>{student.registeredCourses.length}</strong> courses registered.
          </div>

          {/* Student Passport Photo */}
          <div className="passport-container">
            <div className="passport-frame">
              <img
                src={student.passportPhoto}
                alt={student.fullName}
                className="passport-img"
              />
            </div>
          </div>

          {/* Quick Portal Action Buttons for quick navigation */}
          <div style={{ padding: '0 18px 24px 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button
              onClick={() => setActiveView('courses')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '11px',
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '6px',
                fontSize: '13.5px',
                fontWeight: '600',
                color: '#1d4ed8',
                cursor: 'pointer'
              }}
            >
              <BookOpen size={16} /> Course Registration
            </button>
            <button
              onClick={() => setActiveView('results')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '11px',
                backgroundColor: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '6px',
                fontSize: '13.5px',
                fontWeight: '600',
                color: '#15803d',
                cursor: 'pointer'
              }}
            >
              <Award size={16} /> Check Results
            </button>
            <button
              onClick={() => setActiveView('hostel')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '11px',
                backgroundColor: '#fdf4ff',
                border: '1px solid #f5d0fe',
                borderRadius: '6px',
                fontSize: '13.5px',
                fontWeight: '600',
                color: '#a21caf',
                cursor: 'pointer'
              }}
            >
              <Building size={16} /> Hostel Allocation
            </button>
            <button
              onClick={() => setActiveView('id-card')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '11px',
                backgroundColor: '#fffbeb',
                border: '1px solid #fde68a',
                borderRadius: '6px',
                fontSize: '13.5px',
                fontWeight: '600',
                color: '#b45309',
                cursor: 'pointer'
              }}
            >
              <UserCheck size={16} /> Digital ID Card
            </button>
          </div>
        </main>
      )}

      {/* 2. COURSE REGISTRATION VIEW */}
      {activeView === 'courses' && (
        <div className="subpage-container">
          <div className="subpage-header">
            <h3 className="subpage-title">400 Level Course Registration</h3>
            <button className="back-btn" onClick={() => setActiveView('dashboard')}>
              <ArrowLeft size={16} /> Back
            </button>
          </div>

          <div className="portal-card">
            <h4>Select Courses for {student.session}</h4>
            <p style={{ fontSize: '13.5px', color: '#64748b', marginBottom: '14px' }}>
              Minimum: 15 Units | Maximum: 24 Units. Select your required courses below:
            </p>

            <table className="lcu-table">
              <thead>
                <tr>
                  <th style={{ width: '36px' }}>Select</th>
                  <th>Code</th>
                  <th>Course Title</th>
                  <th>Units</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.code}>
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course.code)}
                        onChange={() => toggleCourse(course.code)}
                        style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                      />
                    </td>
                    <td><strong>{course.code}</strong></td>
                    <td>{course.title}</td>
                    <td>{course.units}</td>
                    <td>
                      <span style={{
                        fontSize: '11px',
                        padding: '2px 6px',
                        borderRadius: '3px',
                        backgroundColor: course.status === 'Compulsory' ? '#fee2e2' : '#fef3c7',
                        color: course.status === 'Compulsory' ? '#991b1b' : '#92400e',
                        fontWeight: '600'
                      }}>
                        {course.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                Total Units Selected: <span style={{ color: '#2563eb' }}>
                  {courses.filter(c => selectedCourses.includes(c.code)).reduce((acc, c) => acc + c.units, 0)} Units
                </span>
              </div>
              <button
                className="btn-lcu-primary"
                style={{ width: 'auto', padding: '9px 18px' }}
                onClick={submitCourseRegistration}
              >
                Submit Registration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. REGISTERED COURSES / COURSE SLIP VIEW */}
      {activeView === 'course-slip' && (
        <div className="subpage-container">
          <div className="subpage-header">
            <h3 className="subpage-title">Course Registration Slip</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="back-btn" onClick={() => window.print()}>
                <Printer size={15} /> Print Slip
              </button>
              <button className="back-btn" onClick={() => setActiveView('dashboard')}>
                <ArrowLeft size={16} /> Back
              </button>
            </div>
          </div>

          <div className="portal-card" style={{ border: '2px solid #071f43' }}>
            <div style={{ textAlign: 'center', borderBottom: '1.5px solid #071f43', paddingBottom: '12px', marginBottom: '14px' }}>
              <img src="/assets/logo.png" alt="LCU" style={{ width: '48px', height: '48px', margin: '0 auto' }} />
              <h4 style={{ fontSize: '16px', margin: '4px 0 2px 0' }}>LEAD CITY UNIVERSITY, IBADAN</h4>
              <p style={{ fontSize: '12px', color: '#475569' }}>FACULTY OF APPLIED SCIENCES • DEPT OF COMPUTER AND PHYSICAL SCIENCES</p>
              <h5 style={{ fontSize: '14px', marginTop: '4px', color: '#1e40af' }}>COURSE REGISTRATION FORM - 2026/2027 SESSION</h5>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12.5px', marginBottom: '14px' }}>
              <div><strong>Matric No:</strong> {student.matricNo}</div>
              <div><strong>Level:</strong> {student.level}</div>
              <div><strong>Name:</strong> {student.fullName}</div>
              <div><strong>Programme:</strong> {student.programme}</div>
            </div>

            {student.registeredCourses.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 0', color: '#64748b' }}>
                <p>No courses registered yet.</p>
                <button
                  className="btn-lcu-primary"
                  style={{ width: 'auto', marginTop: '10px', padding: '7px 16px', fontSize: '13px' }}
                  onClick={() => setActiveView('courses')}
                >
                  Register Courses Now
                </button>
              </div>
            ) : (
              <div>
                <table className="lcu-table">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Course Code</th>
                      <th>Course Title</th>
                      <th>Units</th>
                      <th>Lecturer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.registeredCourses.map((c, i) => (
                      <tr key={c.code}>
                        <td>{i + 1}</td>
                        <td><strong>{c.code}</strong></td>
                        <td>{c.title}</td>
                        <td>{c.units}</td>
                        <td>{c.lecturer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#334155' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ borderBottom: '1px solid #333', width: '130px', height: '24px' }}></div>
                    <span style={{ marginTop: '4px', display: 'block' }}>Student Signature</span>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ borderBottom: '1px solid #333', width: '130px', height: '24px' }}></div>
                    <span style={{ marginTop: '4px', display: 'block' }}>HOD Signature & Date</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. MY WALLET & BURSARY CLEARANCE */}
      {activeView === 'wallet' && (
        <div className="subpage-container">
          <div className="subpage-header">
            <h3 className="subpage-title">My Wallet & Bursary</h3>
            <button className="back-btn" onClick={() => setActiveView('dashboard')}>
              <ArrowLeft size={16} /> Back
            </button>
          </div>

          {/* Balance Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
            <div className="portal-card" style={{ borderLeft: '4px solid #168038', marginBottom: 0 }}>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Amount Paid</div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#168038' }}>{formatNaira(student.amountPaid)}</div>
              <span style={{ fontSize: '11px', color: '#166534' }}>✓ 60% Deposit Paid</span>
            </div>
            <div className="portal-card" style={{ borderLeft: '4px solid #dc2626', marginBottom: 0 }}>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Balance Outstanding</div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#dc2626' }}>{formatNaira(student.balanceDue)}</div>
              <span style={{ fontSize: '11px', color: '#991b1b' }}>Due before exams</span>
            </div>
          </div>

          {/* Quick Pay Box */}
          <div className="portal-card">
            <h4>Make Payment / Clear Outstanding Fee</h4>
            {paySuccess && (
              <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '10px', borderRadius: '4px', marginBottom: '12px', fontSize: '13px' }}>
                ✓ Payment recorded successfully! Receipt generated.
              </div>
            )}
            <form onSubmit={handlePayment} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type="number"
                className="form-control"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="Amount in Naira"
                style={{ flex: 1 }}
                required
              />
              <button type="submit" className="btn-lcu-primary" style={{ width: 'auto', padding: '10px 18px' }}>
                Pay Now
              </button>
            </form>
          </div>

          {/* Payment Receipts History */}
          <div className="portal-card">
            <h4>Payment Receipt & Verification</h4>
            <div className="receipt-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginBottom: '10px' }}>
                <strong>Receipt #: LCU/REC/2026/0942</strong>
                <span style={{ color: '#168038', fontWeight: '600' }}>✓ PAID</span>
              </div>
              <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                <div><strong>Payer:</strong> {student.fullName} ({student.matricNo})</div>
                <div><strong>Purpose:</strong> First Semester Tuition & Accommodation (Deposit)</div>
                <div><strong>Amount:</strong> {formatNaira(1400000)}</div>
                <div><strong>Channel:</strong> Paystack / Interswitch WebPay</div>
                <div><strong>Date:</strong> 15th September, 2026</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. ACADEMIC RESULTS VIEW */}
      {activeView === 'results' && (
        <div className="subpage-container">
          <div className="subpage-header">
            <h3 className="subpage-title">Examination Results & CGPA</h3>
            <button className="back-btn" onClick={() => setActiveView('dashboard')}>
              <ArrowLeft size={16} /> Back
            </button>
          </div>

          <div className="portal-card" style={{ background: 'linear-gradient(135deg, #071f43 0%, #1e40af 100%)', color: '#fff' }}>
            <div style={{ fontSize: '13px', opacity: 0.9 }}>Cumulative Grade Point Average (CGPA)</div>
            <div style={{ fontSize: '32px', fontWeight: '800', margin: '4px 0' }}>4.45 <span style={{ fontSize: '16px', fontWeight: '400' }}>/ 5.00</span></div>
            <div style={{ fontSize: '13px', color: '#93c5fd' }}>Standing: First Class Honors Candidate • Level: 400L</div>
          </div>

          <div className="portal-card">
            <h4>300 Level - Second Semester Results</h4>
            <div style={{ fontSize: '13px', marginBottom: '8px', color: '#64748b' }}>Semester GPA: <strong>4.60</strong></div>
            <table className="lcu-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Title</th>
                  <th>Units</th>
                  <th>Score</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>CSC 321</td><td>Database Design</td><td>3</td><td>82%</td><td><strong>A</strong></td></tr>
                <tr><td>CSC 323</td><td>Operating Systems</td><td>3</td><td>79%</td><td><strong>A</strong></td></tr>
                <tr><td>CSC 325</td><td>Formal Methods</td><td>2</td><td>68%</td><td><strong>B</strong></td></tr>
                <tr><td>CSC 327</td><td>Web App Architecture</td><td>3</td><td>85%</td><td><strong>A</strong></td></tr>
                <tr><td>SIWES 300</td><td>Industrial Attachment</td><td>6</td><td>88%</td><td><strong>A</strong></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. HOSTEL ACCOMMODATION VIEW */}
      {activeView === 'hostel' && (
        <div className="subpage-container">
          <div className="subpage-header">
            <h3 className="subpage-title">Hostel Accommodation</h3>
            <button className="back-btn" onClick={() => setActiveView('dashboard')}>
              <ArrowLeft size={16} /> Back
            </button>
          </div>

          <div className="portal-card">
            <h4>Bed Space & Hostel Allocation (2026/2027)</h4>
            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '14px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: '700', marginBottom: '6px' }}>
                <CheckCircle size={18} /> Allocated & Confirmed
              </div>
              <div style={{ fontSize: '13.5px', color: '#14532d' }}>
                Your accommodation and feeding fee of ₦1,400,000 has been cleared.
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13.5px' }}>
              <div className="portal-card" style={{ marginBottom: 0 }}>
                <div style={{ color: '#64748b', fontSize: '12px' }}>Hostel Block</div>
                <div style={{ fontWeight: '700', color: '#071f43' }}>{student.hostel.hostelName}</div>
              </div>
              <div className="portal-card" style={{ marginBottom: 0 }}>
                <div style={{ color: '#64748b', fontSize: '12px' }}>Room & Space</div>
                <div style={{ fontWeight: '700', color: '#071f43' }}>{student.hostel.roomNumber} ({student.hostel.bedSpace})</div>
              </div>
            </div>

            <div style={{ marginTop: '16px', fontSize: '13px', color: '#475569' }}>
              <strong>Hostel Portal Login:</strong> hostel.lcu.edu.ng | Default password: <code>welead@uni</code>
            </div>
          </div>
        </div>
      )}

      {/* 7. DIGITAL STUDENT ID CARD VIEW */}
      {activeView === 'id-card' && (
        <div className="subpage-container">
          <div className="subpage-header">
            <h3 className="subpage-title">Student Digital ID Card</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="back-btn" onClick={() => window.print()}>
                <Printer size={15} /> Print
              </button>
              <button className="back-btn" onClick={() => setActiveView('dashboard')}>
                <ArrowLeft size={16} /> Back
              </button>
            </div>
          </div>

          <div className="id-card-wrap">
            <div className="id-card-top">
              <img src="/assets/logo.png" alt="LCU" style={{ width: '42px', height: '42px', margin: '0 auto 4px auto', display: 'block' }} />
              <div style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '0.4px' }}>LEAD CITY UNIVERSITY</div>
              <div style={{ fontSize: '10.5px', opacity: 0.85 }}>STUDENT IDENTITY CARD</div>
            </div>

            <div className="id-card-content">
              <img src={student.passportPhoto} alt={student.fullName} className="id-photo" />
              <div className="id-details">
                <div><strong>NAME:</strong> {student.fullName}</div>
                <div><strong>MATRIC:</strong> {student.matricNo}</div>
                <div><strong>PROGRAMME:</strong> {student.programme}</div>
                <div><strong>FACULTY:</strong> {student.faculty}</div>
                <div><strong>LEVEL:</strong> {student.level}</div>
                <div><strong>BLOOD GROUP:</strong> {student.bloodGroup}</div>
              </div>
            </div>

            <div className="id-card-footer">
              Valid for 2026/2027 Academic Session • Lead City University, Ibadan
            </div>
          </div>
        </div>
      )}

      {/* 8. LECTURE TIMETABLE VIEW */}
      {activeView === 'timetable' && (
        <div className="subpage-container">
          <div className="subpage-header">
            <h3 className="subpage-title">Lecture & Exam Timetable</h3>
            <button className="back-btn" onClick={() => setActiveView('dashboard')}>
              <ArrowLeft size={16} /> Back
            </button>
          </div>

          <div className="portal-card">
            <h4>400L Computer Science Lecture Schedule</h4>
            <table className="lcu-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Time</th>
                  <th>Course</th>
                  <th>Venue</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Monday</td><td>09:00 - 11:00</td><td><strong>CSC 411</strong></td><td>ETF Lab 2</td></tr>
                <tr><td>Monday</td><td>12:00 - 14:00</td><td><strong>CSC 417</strong></td><td>Lecture Theatre C</td></tr>
                <tr><td>Tuesday</td><td>10:00 - 12:00</td><td><strong>CSC 413</strong></td><td>Hardware Lab</td></tr>
                <tr><td>Wednesday</td><td>08:00 - 10:00</td><td><strong>CSC 419</strong></td><td>Cyber Lab 1</td></tr>
                <tr><td>Thursday</td><td>11:00 - 13:00</td><td><strong>CSC 415</strong></td><td>Multimedia Lab</td></tr>
                <tr><td>Friday</td><td>14:00 - 16:00</td><td><strong>CSC 421</strong></td><td>Seminar Hall</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 9. NOTICES & ANNOUNCEMENTS VIEW */}
      {activeView === 'notices' && (
        <div className="subpage-container">
          <div className="subpage-header">
            <h3 className="subpage-title">Official Announcements</h3>
            <button className="back-btn" onClick={() => setActiveView('dashboard')}>
              <ArrowLeft size={16} /> Back
            </button>
          </div>

          <div className="portal-card">
            <div style={{ borderLeft: '4px solid #2563eb', paddingLeft: '12px', marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>October 1, 2026 • Academic</div>
              <h4 style={{ margin: '3px 0 6px 0', fontSize: '15px' }}>Commencement of First Semester 2026/2027 Lectures</h4>
              <p style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5' }}>
                All returning undergraduate students (200L to 400L) are to note that lecture sessions have officially commenced. Departmental clearance must be finalized before the end of the month.
              </p>
            </div>

            <div style={{ borderLeft: '4px solid #168038', paddingLeft: '12px' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>September 28, 2026 • Accommodation</div>
              <h4 style={{ margin: '3px 0 6px 0', fontSize: '15px' }}>Hostel Bed Space Allocation Procedures</h4>
              <p style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5' }}>
                Students who made their ₦1,400,000 accommodation and feeding deposit can inspect allocated rooms at Emerald and Platinum Halls with hostel marshals.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 10. STUDENT PROFILE / BIODATA VIEW */}
      {activeView === 'profile' && (
        <div className="subpage-container">
          <div className="subpage-header">
            <h3 className="subpage-title">Student Profile & Biodata</h3>
            <button className="back-btn" onClick={() => setActiveView('dashboard')}>
              <ArrowLeft size={16} /> Back
            </button>
          </div>

          <div className="portal-card">
            <h4>Biodata Details</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px', marginTop: '12px' }}>
              <div><strong>Full Name:</strong> {student.fullName}</div>
              <div><strong>Matric No:</strong> {student.matricNo}</div>
              <div><strong>Email:</strong> {student.email}</div>
              <div><strong>Phone:</strong> {student.phone}</div>
              <div><strong>Gender:</strong> {student.gender}</div>
              <div><strong>Date of Birth:</strong> {student.dob}</div>
              <div><strong>State of Origin:</strong> {student.stateOfOrigin}</div>
              <div><strong>Blood Group:</strong> {student.bloodGroup}</div>
              <div><strong>Genotype:</strong> {student.genotype}</div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          3. DROP DOWN / SLIDE-OUT MENU DRAWER
          (The organized menu containing all portal pages)
          ======================================================== */}
      {isDrawerOpen && (
        <div className="drawer-overlay" onClick={() => setIsDrawerOpen(false)}>
          <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            {/* Drawer User Banner */}
            <div className="drawer-header">
              <button className="drawer-close-btn" onClick={() => setIsDrawerOpen(false)} title="Close Menu">
                <X size={16} />
              </button>
              <div className="drawer-user-info">
                <img src={student.passportPhoto} alt={student.fullName} className="drawer-avatar" />
                <div>
                  <div className="drawer-user-name">{student.fullName}</div>
                  <div className="drawer-user-matric">{student.matricNo}</div>
                  <div className="drawer-user-dept">400L • Computer Science</div>
                </div>
              </div>
            </div>

            {/* Navigation Groups */}
            <div className="drawer-nav-group">
              <div className="drawer-group-title">Academic Services</div>
              <div
                className={`drawer-item ${activeView === 'dashboard' ? 'active' : ''}`}
                onClick={() => { setActiveView('dashboard'); setIsDrawerOpen(false); }}
              >
                <div className="drawer-item-left">
                  <Home size={18} color="#2563eb" />
                  <span>Student Dashboard</span>
                </div>
                <ChevronRight size={16} color="#94a3b8" />
              </div>
              <div
                className={`drawer-item ${activeView === 'courses' ? 'active' : ''}`}
                onClick={() => { setActiveView('courses'); setIsDrawerOpen(false); }}
              >
                <div className="drawer-item-left">
                  <BookOpen size={18} color="#2563eb" />
                  <span>Course Registration</span>
                </div>
                <span className="drawer-badge">Open</span>
              </div>
              <div
                className={`drawer-item ${activeView === 'course-slip' ? 'active' : ''}`}
                onClick={() => { setActiveView('course-slip'); setIsDrawerOpen(false); }}
              >
                <div className="drawer-item-left">
                  <FileText size={18} color="#2563eb" />
                  <span>Course Form / Slip</span>
                </div>
                <ChevronRight size={16} color="#94a3b8" />
              </div>
              <div
                className={`drawer-item ${activeView === 'results' ? 'active' : ''}`}
                onClick={() => { setActiveView('results'); setIsDrawerOpen(false); }}
              >
                <div className="drawer-item-left">
                  <Award size={18} color="#2563eb" />
                  <span>Results & Transcript</span>
                </div>
                <span className="drawer-badge" style={{ backgroundColor: '#16a34a' }}>4.45</span>
              </div>
              <div
                className={`drawer-item ${activeView === 'timetable' ? 'active' : ''}`}
                onClick={() => { setActiveView('timetable'); setIsDrawerOpen(false); }}
              >
                <div className="drawer-item-left">
                  <Calendar size={18} color="#2563eb" />
                  <span>Lecture Timetable</span>
                </div>
                <ChevronRight size={16} color="#94a3b8" />
              </div>
            </div>

            <div className="drawer-nav-group">
              <div className="drawer-group-title">Finance & Bursary</div>
              <div
                className={`drawer-item ${activeView === 'wallet' ? 'active' : ''}`}
                onClick={() => { setActiveView('wallet'); setIsDrawerOpen(false); }}
              >
                <div className="drawer-item-left">
                  <CreditCard size={18} color="#168038" />
                  <span>My Wallet & Invoices</span>
                </div>
                <ChevronRight size={16} color="#94a3b8" />
              </div>
            </div>

            <div className="drawer-nav-group">
              <div className="drawer-group-title">Campus & Services</div>
              <div
                className={`drawer-item ${activeView === 'hostel' ? 'active' : ''}`}
                onClick={() => { setActiveView('hostel'); setIsDrawerOpen(false); }}
              >
                <div className="drawer-item-left">
                  <Building size={18} color="#9333ea" />
                  <span>Hostel Accommodation</span>
                </div>
                <span className="drawer-badge" style={{ backgroundColor: '#9333ea' }}>B-204</span>
              </div>
              <div
                className={`drawer-item ${activeView === 'id-card' ? 'active' : ''}`}
                onClick={() => { setActiveView('id-card'); setIsDrawerOpen(false); }}
              >
                <div className="drawer-item-left">
                  <UserCheck size={18} color="#d97706" />
                  <span>Student ID Card</span>
                </div>
                <ChevronRight size={16} color="#94a3b8" />
              </div>
              <div
                className={`drawer-item ${activeView === 'notices' ? 'active' : ''}`}
                onClick={() => { setActiveView('notices'); setIsDrawerOpen(false); }}
              >
                <div className="drawer-item-left">
                  <Bell size={18} color="#dc2626" />
                  <span>Notice Board</span>
                </div>
                <span className="drawer-badge" style={{ backgroundColor: '#dc2626' }}>1</span>
              </div>
              <div
                className={`drawer-item ${activeView === 'profile' ? 'active' : ''}`}
                onClick={() => { setActiveView('profile'); setIsDrawerOpen(false); }}
              >
                <div className="drawer-item-left">
                  <ShieldCheck size={18} color="#0284c7" />
                  <span>Biodata & Profile</span>
                </div>
                <ChevronRight size={16} color="#94a3b8" />
              </div>
            </div>

            <div style={{ padding: '14px', marginTop: 'auto' }}>
              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px',
                  backgroundColor: '#fee2e2',
                  color: '#991b1b',
                  border: '1px solid #fecaca',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                <LogOut size={16} /> Logout from Portal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          4. FOOTER (Matching user screenshot)
          ======================================================== */}
      <footer className="portal-footer">
        <div className="footer-social-icons">
          <span className="social-btn" title="Facebook"><Facebook size={22} /></span>
          <span className="social-btn" title="Twitter"><Twitter size={22} /></span>
          <span className="social-btn" title="Instagram"><Instagram size={22} /></span>
        </div>
        <div className="footer-links-row">
          <a href="https://www.lcu.edu.ng" target="_blank" rel="noreferrer" className="footer-link-blue">
            Visit University Website
          </a>
          <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Lead City University Privacy Policy: Student records are strictly protected under GDPR and NDPR protocols.'); }} className="footer-link-red">
            Our Privacy Policy
          </a>
        </div>
        <div className="footer-links-secondary">
          <span className="footer-sublink" onClick={() => alert('Lead City University Support: dict@lcu.edu.ng')}>
            FAQ
          </span>
          <span className="footer-sublink" onClick={handleLogout}>
            Logout
          </span>
        </div>
        <p className="footer-copyright">©2026 - DICT</p>
      </footer>
    </div>
  );
}

// Helper to return page titles
function getPageTitle(view) {
  switch (view) {
    case 'courses': return 'Course Registration';
    case 'course-slip': return 'Course Form Slip';
    case 'wallet': return 'My Wallet';
    case 'results': return 'Semester Results';
    case 'hostel': return 'Hostel Accommodation';
    case 'id-card': return 'Digital ID Card';
    case 'timetable': return 'Lecture Timetable';
    case 'notices': return 'Announcements';
    case 'profile': return 'Student Biodata';
    default: return 'Student Portal';
  }
}
