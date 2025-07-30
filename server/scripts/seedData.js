const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('../models/Course');

dotenv.config();

const sampleCourses = [
  {
    title: "Full Stack Web Development",
    description: "Learn to build complete web applications using modern technologies including React, Node.js, Express, and MongoDB. Perfect for beginners looking to become full-stack developers.",
    instructor: "John Smith",
    duration: "12 weeks",
    level: "Beginner",
    category: "Web Development",
    price: 299
  },
  {
    title: "Advanced JavaScript Concepts",
    description: "Deep dive into advanced JavaScript topics including closures, prototypes, async/await, and ES6+ features. Ideal for developers wanting to master JavaScript.",
    instructor: "Sarah Johnson",
    duration: "8 weeks",
    level: "Advanced",
    category: "Programming",
    price: 199
  },
  {
    title: "React.js Fundamentals",
    description: "Master React.js from the ground up. Learn components, hooks, state management, and modern React patterns to build powerful user interfaces.",
    instructor: "Mike Chen",
    duration: "6 weeks",
    level: "Intermediate",
    category: "Frontend Development",
    price: 179
  },
  {
    title: "Node.js Backend Development",
    description: "Build scalable backend applications with Node.js and Express. Cover RESTful APIs, database integration, authentication, and deployment strategies.",
    instructor: "Emily Davis",
    duration: "10 weeks",
    level: "Intermediate",
    category: "Backend Development",
    price: 249
  },
  {
    title: "MongoDB Database Design",
    description: "Learn NoSQL database design principles with MongoDB. Understand schema design, indexing, aggregation, and optimization techniques.",
    instructor: "Alex Rodriguez",
    duration: "4 weeks",
    level: "Beginner",
    category: "Database",
    price: 129
  },
  {
    title: "DevOps Essentials",
    description: "Introduction to DevOps practices including CI/CD, containerization with Docker, cloud deployment, and monitoring. Essential for modern development.",
    instructor: "Robert Wilson",
    duration: "8 weeks",
    level: "Intermediate",
    category: "DevOps",
    price: 219
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing courses
    await Course.deleteMany({});
    console.log('Cleared existing courses');

    // Insert sample courses
    const courses = await Course.insertMany(sampleCourses);
    console.log(`Created ${courses.length} sample courses`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
