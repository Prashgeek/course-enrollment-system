import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <span className="brand-icon">🎓</span>
          Course Hub
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            All Courses
          </Link>
          <Link 
            to="/my-enrollments" 
            className={`nav-link ${isActive('/my-enrollments') ? 'active' : ''}`}
          >
            My Enrollments
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
