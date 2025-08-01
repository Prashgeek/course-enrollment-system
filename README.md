# Course Listing & Student Enrollment Module

A modern, full-stack Learning Management System (LMS) module built with the MERN stack, featuring course browsing and student enrollment functionality.

## 🚀 Live Demo  (note:- when you visit website and if its show no available courses than re-fresh website 2-3 times)
Link -> https://beautiful-dango-1e55db.netlify.app/

screenshots
<img width="1919" height="1076" alt="Screenshot 2025-07-31 045718" src="https://github.com/user-attachments/assets/0e7694af-8491-4d3f-bdb0-40a34433bf5c" />
<img width="1919" height="1079" alt="Screenshot 2025-07-31 045749" src="https://github.com/user-attachments/assets/703a0fd9-9fcf-4b78-8283-8b8f43111a0b" />
<img width="1919" height="1079" alt="Screenshot 2025-07-31 045737" src="https://github.com/user-attachments/assets/d423a20b-d7c8-4f8b-8842-7aaa3936fb3e" />
<img width="1918" height="1032" alt="Screenshot 2025-07-31 045501" src="https://github.com/user-attachments/assets/697c90fd-5ab5-45d2-9769-dee517ea6558" />




##  Features

### Core Functionality
-  Browse available courses with detailed information
-  Enroll/unenroll in courses with real-time status updates
-  View personal enrollment history and progress
-  Responsive design for all devices
-  Professional UI with smooth animations

### Technical Features
-  Error handling and validation
-  Mobile-responsive design
-  Optimized performance
-  Real-time enrollment status
-  RESTful API architecture

##  Technology Stack

### Frontend
- **React.js** - UI library with hooks
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Modern styling with flexbox/grid

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM

### Deployment
- **Netlify** - Frontend hosting
- **Render** - Backend hosting
- **MongoDB Atlas** - Database hosting

##  Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Backend Setup
Install backend dependencies
cd server
npm install

Set up environment variables
cp .env
PORT=5000

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/course-enrollment

NODE_ENV=development

Edit .env with your MongoDB URI and other settings
Seed database with sample data
node scripts/seedData.js

Start development server
npm run dev


### Frontend Setup
Install frontend dependencies
cd ../client
npm install

Set up environment variables
cp  .env

Edit .env with your API URL(when your deploye project)
Start development server
npm start





end
