# Lead City University Student Portal (MERN Stack)

A full-stack replica of the official **Lead City University (LCU), Ibadan** student portal and dashboard.

---

## 🌟 Key Features

1. **Official Lead City University Login Page UI**:
   - Matching the official `portal.lcu.edu.ng` undergraduate login layout.
   - Session announcement modal: *"Welcome to the 2026/2027 Session!"* with room booking instructions.
   - Pre-filled credentials for **WILLIAMS Dennis Egwu** (`LCU/UG/23/25649`).
   - Links for *Book a room*, *Forgot Password*, and *Private Hostel*.

2. **Student Dashboard (Pixel-Perfect to Screenshots)**:
   - **Header Banner**: Tartan/plaid navy & magenta pattern, official university crest, and *"Lead City University, Ibadan"*.
   - **Top Action Bar**: *"Student Dashboard"*, Home icon, Notification bell with badge `[1]`, and Logout button.
   - **Greeting**: *"Good morning, Williams"*.
   - **Financial Overview**:
     - Total Amount: `₦2,572,000.00`
     - Amount Paid: `₦1,400,000.00` (in green)
     - Balance Due: `₦1,172,000.00` (in red)
     - `💳 My Wallet` button.
   - **Session Banner**: `2026/2027 Session - First Semester`.
   - **Student Bio Details**:
     - Matriculation Number: `LCU/UG/23/25649`
     - Name: `WILLIAMS Dennis Egwu`
     - Faculty: `Applied Sciences`
     - Department: `Computer and Physical Sciences`
     - Programme: `Computer Science`
     - Level: `400`
     - Mode of Study: `Full Time`
   - **Course Counter**: `0 courses registered` (dynamically updates upon registration).
   - **Student Passport Photo**: Extracted high-resolution passport photo of Williams Dennis Egwu.
   - **Official Footer**: Social icons, University website link, Privacy Policy, FAQ, and `©2026 - DICT`.

3. **Neatly Organized Drop-Down / Slide-Out Menu Drawer**:
   - Toggled via the hamburger button (`☰`) on the top-left of the financial bar.
   - Features dedicated interactive pages:
     - 🎓 **Academics**:
       - *Student Dashboard*
       - *Course Registration* (Course selection, unit calculator, and submission)
       - *Course Form / Slip* (Official printable registration form with signature lines)
       - *Results & Transcript* (GPA: 4.60, CGPA: 4.45 First Class Honors standing)
       - *Lecture Timetable* (Weekly 400L Computer Science schedule)
     - 💳 **Finance & Bursary**:
       - *My Wallet & Invoices* (Live balance clearing simulator & receipts)
       - *Payment Receipt & Clearance* (`LCU/REC/2026/0942`)
     - 🏛️ **Campus Services & Biodata**:
       - *Hostel Accommodation* (Emerald Hall Room B-204 confirmation)
       - *Student Digital ID Card* (Printable digital ID card)
       - *Notice Board* (Official session announcements)
       - *Student Biodata* (Comprehensive profile)
       - *Logout* (Returns to official login page)

---

## 🚀 Running the Application

### Backend API (Express + Node.js)
```bash
node server/server.js
```
Runs on `http://localhost:5000`

### Frontend Application (Vite + React)
```bash
npm --prefix client run dev
```
Runs on `http://localhost:3000` (with automatic proxy to backend on port 5000).

Or serve the compiled bundle directly through Express at `http://localhost:5000`.

---

## 🔐 Login Credentials
- **Username / Matric No**: `LCU/UG/23/25649`
- **Password**: `welead@uni`
