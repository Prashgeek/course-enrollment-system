const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @desc    Get current student's enrollments
// @route   GET /api/enrollments/me
// @access  Public (with dummy student)
const getMyEnrollments = async (req, res) => {
  try {
    const studentId = 'dummyStudent123';
    
    const enrollments = await Enrollment.find({ studentId })
      .populate('courseId', 'title description instructor duration category')
      .sort({ enrollmentDate: -1 });
    
    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments
    });
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error - Unable to fetch enrollments'
    });
  }
};

// @desc    Create new enrollment
// @route   POST /api/enrollments
// @access  Public
const createEnrollment = async (req, res) => {
  try {
    const { courseId } = req.body;
    const studentId = 'dummyStudent123';
    
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({ courseId, studentId });
    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }
    
    // Create enrollment
    const enrollment = await Enrollment.create({
      courseId,
      studentId,
      enrollmentDate: new Date()
    });
    
    // Populate course details
    await enrollment.populate('courseId', 'title description instructor duration');
    
    res.status(201).json({
      success: true,
      message: 'Successfully enrolled in course',
      data: enrollment
    });
  } catch (error) {
    console.error('Error creating enrollment:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete enrollment
// @route   DELETE /api/enrollments/:id
// @access  Public
const deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }
    
    await enrollment.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Enrollment removed successfully'
    });
  } catch (error) {
    console.error('Error deleting enrollment:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error - Unable to remove enrollment'
    });
  }
};

module.exports = {
  getMyEnrollments,
  createEnrollment,
  deleteEnrollment
};
