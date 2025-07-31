import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { enrollmentAPI } from '../services/api';
import './MyEnrollments.css';

const MyEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEnrollments();
  }, []);

  const loadEnrollments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await enrollmentAPI.getMyEnrollments();
      setEnrollments(response.data || []);
    } catch (error) {
      console.error('Error loading enrollments:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnenroll = async (enrollmentId, courseTitle) => {
    if (!window.confirm(`Are you sure you want to unenroll from "${courseTitle}"?`)) {
      return;
    }

    try {
      await enrollmentAPI.deleteEnrollment(enrollmentId);
      setEnrollments(prev => prev.filter(e => e._id !== enrollmentId));
      alert('Successfully unenrolled from the course!');
    } catch (error) {
      console.error('Error unenrolling:', error);
      alert(error.message || 'Failed to unenroll from course');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return <LoadingSpinner message="Loading your enrollments..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadEnrollments} />;
  }

  return (
    <div className="enrollments-container">
      <header className="enrollments-header">
        <h1>My Enrollments</h1>
        <p className="enrollments-subtitle">
          Courses you are currently enrolled in
        </p>
      </header>

      {enrollments.length === 0 ? (
        <div className="no-enrollments">
          <div className="no-enrollments-icon">📚</div>
          <h3>No enrollments yet</h3>
          <p>You haven't enrolled in any courses yet. Explore our course catalog to get started!</p>
          <a href="/" className="browse-courses-btn">Browse Courses</a>
        </div>
      ) : (
        <div className="enrollments-grid">
          {enrollments.map(enrollment => (
            <div key={enrollment._id} className="enrollment-card">
              <div className="enrollment-header">
                <h3 className="course-title">{enrollment.courseId.title}</h3>
                <span className={`status-badge ${enrollment.status}`}>
                  {enrollment.status}
                </span>
              </div>
              
              <div className="enrollment-content">
                <p className="course-description">
                  {enrollment.courseId.description}
                </p>
                
                <div className="enrollment-details">
                  <div className="detail-row">
                    <span className="detail-label">Instructor:</span>
                    <span className="detail-value">{enrollment.courseId.instructor}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Duration:</span>
                    <span className="detail-value">{enrollment.courseId.duration}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Enrolled on:</span>
                    <span className="detail-value">{formatDate(enrollment.enrollmentDate)}</span>
                  </div>
                  
                  {enrollment.progress !== undefined && (
                    <div className="detail-row">
                      <span className="detail-label">Progress:</span>
                      <div className="progress-section">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${enrollment.progress}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">{enrollment.progress}%</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="enrollment-actions">
                <button
                  className="unenroll-btn"
                  onClick={() => handleUnenroll(enrollment._id, enrollment.courseId.title)}
                >
                  Unenroll
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEnrollments;
