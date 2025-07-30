const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  instructor: {
    type: String,
    required: [true, 'Instructor name is required'],
    trim: true,
    maxlength: [50, 'Instructor name cannot exceed 50 characters']
  },
  duration: {
    type: String,
    required: [true, 'Course duration is required'],
    trim: true
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  category: {
    type: String,
    required: [true, 'Course category is required']
  },
  price: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
