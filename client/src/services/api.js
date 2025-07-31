import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    const errorMessage = error.response?.data?.message || 'An error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

export const courseAPI = {
  // Get all courses
  getAllCourses: () => api.get('/courses'),
  
  // Get single course
  getCourse: (id) => api.get(`/courses/${id}`),
  
  // Create course (admin functionality)
  createCourse: (courseData) => api.post('/courses', courseData),
};

export const enrollmentAPI = {
  // Get current student's enrollments
  getMyEnrollments: () => api.get('/enrollments/me'),
  
  // Create new enrollment
  createEnrollment: (courseId) => api.post('/enrollments', { courseId }),
  
  // Delete enrollment
  deleteEnrollment: (enrollmentId) => api.delete(`/enrollments/${enrollmentId}`),
};

export default api;
