import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import CourseList from './pages/CourseList';
import MyEnrollments from './pages/MyEnrollments';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<CourseList />} />
            <Route path="/my-enrollments" element={<MyEnrollments />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <div className="footer-content">
            <p>&copy; 2025 Course Hub. Built with MERN Stack.</p>
          </div>
        </footer>
      </Router>
    </div>
  );
}

export default App;
