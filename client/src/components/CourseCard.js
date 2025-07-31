import React, { useState } from 'react';
import './CourseCard.css';

const CourseCard = ({ course, isEnrolled, onEnroll, onUnenroll, enrollmentId }) => {
  const [loading, setLoading] = useState(false);

  const handleEnrollClick = async () => {
    setLoading(true);
    try {
      if (isEnrolled) {
        await onUnenroll(enrollmentId);
      } else {
        await onEnroll(course._id);
      }
    } catch (error) {
      console.error('Error handling enrollment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="course-card">
      <div className="course-header">
        <h3 className="course-title">{course.title}</h3>
        <span className={`course-level ${course.level?.toLowerCase()}`}>
          {course.level}
        </span>
      </div>
      
      <div className="course-content">
        <p className="course-description">{course.description}</p>
        
        <div className="course-details">
          <div className="detail-item">
            <span className="detail-label">Instructor:</span>
            <span className="detail-value">{course.instructor}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Duration:</span>
            <span className="detail-value">{course.duration}</span>
          </div>
          
          {course.category && (
            <div className="detail-item">
              <span className="detail-label">Category:</span>
              <span className="detail-value">{course.category}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="course-actions">
        <button
          className={`btn ${isEnrolled ? 'btn-enrolled' : 'btn-enroll'}`}
          onClick={handleEnrollClick}
          disabled={loading}
        >
          {loading ? (
            <span className="loading-spinner">⏳</span>
          ) : (
            isEnrolled ? 'Enrolled ✓' : 'Enroll'
          )}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
