import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import Course from '../models/Course.js';  // Import the Course model
import mongoose from 'mongoose'; // Required for ObjectId validation
// import { protect, admin } from '../middleware/authMiddleware.js'; // Add your auth middleware if needed

const router = express.Router();

// POST endpoint to add a new mentor with an assigned course
router.post('/add-mentor', async (req, res) => {
  const { name, email, password, course } = req.body;

  try {
    // Ensure the user is an admin
    const isAdmin = true; // Replace with real admin check, use auth middleware
    if (!isAdmin) {
      return res.status(403).json({ message: 'You are not authorized to add mentors.' });
    }

    // Check if mentor already exists
    const existingMentor = await User.findOne({ email });
    if (existingMentor) {
      return res.status(400).json({ message: 'Mentor already exists.' });
    }

    // Check if courseId is valid
    if (courseId && !mongoose.Types.ObjectId.isValid(course)) {
      return res.status(400).json({ message: 'Invalid course ID.' });
    }

    // Check if the course exists
    if (courseId) {
      const courseExists = await Course.findById(course);
      if (!courseExists) {
        return res.status(400).json({ message: 'Course not found.' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newMentor = new User({
      name,
      email,
      password: hashedPassword,
      role: 'mentor',
      course: courseId || null,
    });

    await newMentor.save();
    const populatedMentor = await User.findById(newMentor._id).populate('course'); // Ensure course is populated
    res.status(201).json({ message: 'Mentor added successfully.', mentor: populatedMentor });
  } catch (err) {
    console.error('Error adding mentor:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// PUT endpoint to update mentor information
router.put('/edit-mentor/:id', async (req, res) => {
  const { name, email, password, course } = req.body;
  const mentorId = req.params.id;

  try {
    // Ensure the user is an admin
    const isAdmin = true; // Replace with real admin check, use auth middleware
    if (!isAdmin) {
      return res.status(403).json({ message: 'You are not authorized to edit mentors.' });
    }

    const mentorToUpdate = await User.findById(mentorId);
    if (!mentorToUpdate) {
      return res.status(404).json({ message: 'Mentor not found.' });
    }

    if (name) mentorToUpdate.name = name;
    if (email) mentorToUpdate.email = email;

    if (course) {
      // Check if the courseId is valid (must exist in the Course collection)
      if (!mongoose.Types.ObjectId.isValid(course)) {
        return res.status(400).json({ message: 'Invalid course ID.' });
      }

      const courseExists = await Course.findById(course);
      if (!courseExists) {
        return res.status(400).json({ message: 'Course not found.' });
      }
      mentorToUpdate.course = course;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      mentorToUpdate.password = hashedPassword;
    }

    await mentorToUpdate.save();
    const populatedMentor = await User.findById(mentorToUpdate._id).populate('course'); // Ensure course is populated
    res.status(200).json({ message: 'Mentor updated successfully.', mentor: populatedMentor });
  } catch (err) {
    console.error('Error updating mentor:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// GET endpoint to fetch all mentors
router.get('/get-mentors', async (req, res) => {
  try {
    // Fetch all mentors and populate their course data
    const mentors = await User.find({ role: 'mentor' }).populate('course');

    if (mentors.length === 0) {
      return res.status(404).json({ message: 'No mentors found.' });
    }

    // Return mentors with course name or 'None' if no course assigned
    const mentorsWithCourse = mentors.map((mentor) => ({
      ...mentor.toObject(),
      course: mentor.course ? mentor.course.name : 'None',
    }));

    res.status(200).json(mentorsWithCourse);
  } catch (err) {
    console.error('Error fetching mentors:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;
