const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'leadcity_secret_key_2026';

app.use(cors());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// Initial student state matching the user's screenshots
const studentState = {
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
  stateOfOrigin: 'Ebonyi',
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
};

// Course catalog for 400 Level Computer Science
const availableCourses = [
  { code: 'CSC 411', title: 'Software Engineering II', units: 3, status: 'Compulsory', lecturer: 'Dr. A. O. Adeleke' },
  { code: 'CSC 413', title: 'Artificial Intelligence & Neural Networks', units: 3, status: 'Compulsory', lecturer: 'Prof. F. E. Babatunde' },
  { code: 'CSC 415', title: 'Computer Graphics & Interactive Systems', units: 3, status: 'Elective', lecturer: 'Dr. K. M. Ogunleye' },
  { code: 'CSC 417', title: 'Compiler Construction', units: 3, status: 'Compulsory', lecturer: 'Dr. S. O. Balogun' },
  { code: 'CSC 419', title: 'Net-Centric Computing & Cloud Systems', units: 3, status: 'Compulsory', lecturer: 'Engr. D. T. Alabi' },
  { code: 'CSC 421', title: 'Final Year Research Project I', units: 3, status: 'Compulsory', lecturer: 'Departmental Board' },
  { code: 'CSC 423', title: 'Data Mining and Warehousing', units: 2, status: 'Elective', lecturer: 'Dr. C. I. Okonkwo' }
];

// Academic Results records
const academicHistory = [
  {
    session: '2025/2026 Session - Second Semester (300L)',
    gpa: '4.60',
    cgpa: '4.45',
    courses: [
      { code: 'CSC 321', title: 'Database Design & Management', units: 3, grade: 'A', score: 82 },
      { code: 'CSC 323', title: 'Operating Systems Architecture', units: 3, grade: 'A', score: 79 },
      { code: 'CSC 325', title: 'Formal Methods in Software', units: 2, grade: 'B', score: 68 },
      { code: 'CSC 327', title: 'Web Application Architecture', units: 3, grade: 'A', score: 85 },
      { code: 'CSC 329', title: 'Operations Research', units: 2, grade: 'A', score: 74 },
      { code: 'SIWES 300', title: 'Industrial Training / Attachment', units: 6, grade: 'A', score: 88 }
    ]
  },
  {
    session: '2025/2026 Session - First Semester (300L)',
    gpa: '4.35',
    cgpa: '4.40',
    courses: [
      { code: 'CSC 311', title: 'Structured Programming (Java)', units: 3, grade: 'A', score: 80 },
      { code: 'CSC 313', title: 'Computer Networks & Telecom', units: 3, grade: 'B', score: 67 },
      { code: 'CSC 315', title: 'Automata Theory & Computability', units: 3, grade: 'A', score: 76 },
      { code: 'CSC 317', title: 'System Analysis & Design', units: 2, grade: 'A', score: 75 },
      { code: 'MTH 311', title: 'Numerical Analysis', units: 3, grade: 'B', score: 65 }
    ]
  }
];

// Timetable
const timetable = [
  { day: 'Monday', time: '09:00 - 11:00', course: 'CSC 411', venue: 'ETF Lab 2', lecturer: 'Dr. Adeleke' },
  { day: 'Monday', time: '12:00 - 14:00', course: 'CSC 417', venue: 'Lecture Theatre C', lecturer: 'Dr. Balogun' },
  { day: 'Tuesday', time: '10:00 - 12:00', course: 'CSC 413', venue: 'Hardware Lab', lecturer: 'Prof. Babatunde' },
  { day: 'Wednesday', time: '08:00 - 10:00', course: 'CSC 419', venue: 'Cyber Lab 1', lecturer: 'Engr. Alabi' },
  { day: 'Thursday', time: '11:00 - 13:00', course: 'CSC 415', venue: 'Multimedia Lab', lecturer: 'Dr. Ogunleye' },
  { day: 'Friday', time: '14:00 - 16:00', course: 'CSC 421', venue: 'Department Seminar Hall', lecturer: 'Board' }
];

// Payment transactions
const paymentHistory = [
  {
    receiptNo: 'LCU/REC/2026/0942',
    date: '15-Sep-2026',
    description: 'First Semester Tuition & Accommodation (60% Deposit)',
    amount: 1400000,
    status: 'Successful',
    paymentMethod: 'Paystack / Interswitch WebPay'
  }
];

// Notice board announcements
const notifications = [
  {
    id: 1,
    title: 'Welcome to the 2026/2027 Academic Session',
    date: 'October 1, 2026',
    category: 'Academic',
    body: 'All undergraduate students are hereby informed that lecture activities for the first semester 2026/2027 session have commenced. Ensure all course registrations are finalized.'
  },
  {
    id: 2,
    title: 'Accommodation and Hostel Clearance Notice',
    date: 'September 28, 2026',
    category: 'Hostel',
    body: 'Students who paid the mandatory ₦1,400,000 accommodation and feeding deposit can now visit hostel.lcu.edu.ng with default password welead@uni for bed allocation.'
  },
  {
    id: 3,
    title: 'Departmental Dues and ICT Verification',
    date: 'September 20, 2026',
    category: 'Department',
    body: 'Physical and Computer Sciences departmental orientation for graduating 400L students holds at ETF Hall this Friday.'
  }
];

// Middleware for auth verification
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No authentication token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token invalid or expired' });
    req.user = user;
    next();
  });
}

// 1. Auth Login Route
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    return res.status(400).json({ message: 'Please enter your Matriculation Number or Username' });
  }

  // Accepts student's matriculation number, full name or username
  const token = jwt.sign(
    { matricNo: studentState.matricNo, name: studentState.fullName },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return res.json({
    success: true,
    message: 'Login successful',
    token,
    student: studentState
  });
});

// 2. Student Profile
app.get('/api/student/profile', (req, res) => {
  res.json({
    success: true,
    student: studentState
  });
});

// Update Profile
app.put('/api/student/profile', authenticateToken, (req, res) => {
  const updates = req.body;
  Object.assign(studentState, updates);
  res.json({
    success: true,
    message: 'Profile updated successfully',
    student: studentState
  });
});

// 3. Courses API
app.get('/api/courses', (req, res) => {
  res.json({
    success: true,
    availableCourses,
    registeredCourses: studentState.registeredCourses,
    coursesRegisteredCount: studentState.registeredCourses.length
  });
});

app.post('/api/courses/register', authenticateToken, (req, res) => {
  const { courseCodes } = req.body;
  if (!Array.isArray(courseCodes)) {
    return res.status(400).json({ message: 'Invalid courses list' });
  }

  studentState.registeredCourses = availableCourses.filter(c => courseCodes.includes(c.code));
  res.json({
    success: true,
    message: 'Courses registered successfully',
    registeredCourses: studentState.registeredCourses,
    coursesRegisteredCount: studentState.registeredCourses.length
  });
});

// 4. Wallet & Payments API
app.get('/api/wallet', (req, res) => {
  res.json({
    success: true,
    totalAmount: studentState.totalAmount,
    amountPaid: studentState.amountPaid,
    balanceDue: studentState.balanceDue,
    walletBalance: studentState.walletBalance,
    paymentHistory
  });
});

app.post('/api/wallet/pay', authenticateToken, (req, res) => {
  const { amount, purpose } = req.body;
  const payVal = Number(amount);
  if (!payVal || payVal <= 0) {
    return res.status(400).json({ message: 'Invalid payment amount' });
  }

  studentState.amountPaid += payVal;
  studentState.balanceDue = Math.max(0, studentState.totalAmount - studentState.amountPaid);

  const receipt = {
    receiptNo: 'LCU/REC/2026/' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    description: purpose || 'Tuition / Sundry Balance Payment',
    amount: payVal,
    status: 'Successful',
    paymentMethod: 'Online WebPay'
  };

  paymentHistory.unshift(receipt);

  res.json({
    success: true,
    message: 'Payment completed successfully',
    receipt,
    balanceDue: studentState.balanceDue,
    amountPaid: studentState.amountPaid
  });
});

// 5. Results API
app.get('/api/results', (req, res) => {
  res.json({
    success: true,
    academicHistory,
    currentCGPA: '4.45'
  });
});

// 6. Timetable API
app.get('/api/timetable', (req, res) => {
  res.json({
    success: true,
    timetable
  });
});

// 7. Notifications API
app.get('/api/notifications', (req, res) => {
  res.json({
    success: true,
    notifications
  });
});

// 8. Hostel API
app.get('/api/hostel', (req, res) => {
  res.json({
    success: true,
    hostel: studentState.hostel
  });
});

// Serve Vite frontend build if available
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res, next) => {
  if (req.url.startsWith('/api') || req.url.startsWith('/assets')) {
    return next();
  }
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`LCU Student Portal API Server running on port ${PORT}`);
});

