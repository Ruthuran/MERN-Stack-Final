import express from 'express';
import User from '../models/user.js';  // Assuming your model is User, and it contains mentors, admins, and students

const router = express.Router();

// GET all students
router.get('/', async (req, res) => {
  try {
    // Fetch only students from the 'users' collection
    const students = await User.find({ role: 'student' });

    // Check if students were found
    if (!students || students.length === 0) {
      return res.status(404).json({ message: 'No students found' });
    }

    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);  // Log error
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

export default router;
