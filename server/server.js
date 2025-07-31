const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();

// Allowed frontend origins (local + production)
const allowedOrigins = [
  'http://localhost:3000',                    // Local React dev server
  'https://course-enrollment-system-ya7v.vercel.app'     // Production frontend URL (replace this)
];

// CORS configuration allowing multiple origins dynamically
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      const msg = `The CORS policy for this site does not allow access from origin: ${origin}`;
      return callback(new Error(msg), false);
    }
  },
  credentials: true  // Allow cookies, auth headers (if needed)
}));

// Parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/courses', require('./routes/courses'));
app.use('/api/enrollments', require('./routes/enrollments'));

// Health check endpoint
app.get('/api/health', (req, res) =>
  res.status(200).json({ success: true, message: 'Server is running properly' })
);

// Root info endpoint
app.get('/', (req, res) =>
  res.status(200).json({ message: 'Course Enrollment API is running!' })
);

// 404 handler with named wildcard (Express 5+ syntax)
app.use('/*splat', (req, res) =>
  res.status(404).json({ success: false, message: 'Route not found' })
);

// Error handling middleware (last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;
