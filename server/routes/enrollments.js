const express = require('express');
const router = express.Router();
const { 
  getMyEnrollments, 
  createEnrollment, 
  deleteEnrollment 
} = require('../controllers/enrollmentController');

router.route('/me')
  .get(getMyEnrollments);

router.route('/')
  .post(createEnrollment);

router.route('/:id')
  .delete(deleteEnrollment);

module.exports = router;
