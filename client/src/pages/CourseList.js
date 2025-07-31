import React, { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { courseAPI, enrollmentAPI } from '../services/api';
import './CourseList.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrollmentLoading, setEnrollmentLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [coursesResponse, enrollmentsResponse] = await Promise.all([
        courseAPI.getAllCourses(),
        enrollmentAPI.getMyEnrollments()
      ]);
      
      setCourses(coursesResponse.data || []);
      setEnrollments(enrollmentsResponse.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      setEnrollmentLoading(true);
      const response = await enrollmentAPI.createEnrollment(courseId);
      
      // Add new enrollment to state
      setEnrollments(prev => [...prev, response.data]);
      
      // Show success message
      alert('Successfully enrolled in the course!');
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert(error.message || 'Failed to enroll in course');
    } finally {
      setEnrollmentLoading(false);
    }
  };

  const handleUnenroll = async (enrollmentId) => {
    try {
      setEnrollmentLoading(true);
      await enrollmentAPI.deleteEnrollment(enrollmentId);
      
      // Remove enrollment from state
      setEnrollments(prev => prev.filter(e => e._id !== enrollmentId));
      
      // Show success message
      alert('Successfully unenrolled from the course!');
    } catch (error) {
      console.error('Error unenrolling from course:', error);
      alert(error.message || 'Failed to unenroll from course');
    } finally {
      setEnrollmentLoading(false);
    }
  };

  const isEnrolled = (courseId) => {
    return enrollments.some(enrollment => 
      enrollment.courseId._id === courseId || enrollment.courseId === courseId
    );
  };

  const getEnrollmentId = (courseId) => {
    const enrollment = enrollments.find(e => 
      e.courseId._id === courseId || e.courseId === courseId
    );
    return enrollment?._id;
  };

  if (loading) {
    return <LoadingSpinner message="Loading courses..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadData} />;
  }

  return (
    <div className="course-list-container">
      <header className="course-list-header">
        <h1>Available Courses</h1>
        <p className="course-list-subtitle">
          Discover and enroll in courses to enhance your skills
        </p>
        {enrollmentLoading && (
          <div className="enrollment-loading">
            <span>Processing enrollment...</span>
          </div>
        )}
      </header>

      <div className="courses-grid">
        {courses.length === 0 ? (
          <div className="no-courses">
            <h3>No courses available</h3>
            <p>Check back later for new courses!</p>
          </div>
        ) : (
          courses.map(course => (
            <CourseCard
              key={course._id}
              course={course}
              isEnrolled={isEnrolled(course._id)}
              enrollmentId={getEnrollmentId(course._id)}
              onEnroll={handleEnroll}
              onUnenroll={handleUnenroll}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CourseList;
