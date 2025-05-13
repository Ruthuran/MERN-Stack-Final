import express from 'express';
import mongoose from 'mongoose';
import Course from '../models/Course.js';
import User from '../models/user.js'; // Make sure the User model import is correct

const router = express.Router();
router.use(express.json());

/* ----------------------------------------
   GET all courses or courses for a specific mentor
---------------------------------------- */
router.get('/', async (req, res) => {
  try {
    const { mentorId } = req.query; // Use query parameter for mentorId

    if (mentorId) {
      // If mentorId is provided, fetch the assigned course for that mentor
      const mentor = await User.findById(mentorId);
      if (!mentor || mentor.role !== 'mentor') {
        return res.status(404).json({ message: 'Mentor not found or role mismatch' });
      }

      // Check if the mentor has a course assigned
      if (!mentor.course) {
        // If no course is assigned to the mentor, return an empty list
        return res.status(200).json([]); // Returning an empty array is okay, but you could add a message if needed
      }

      // Fetch the assigned course for the mentor
      const course = await Course.findById(mentor.course);
      if (!course) {
        return res.status(404).json({ message: 'Course not found for this mentor' });
      }

      return res.status(200).json([course]); // Return the course in an array for consistency
    }

    // If no mentorId is provided, return all courses
    const courses = await Course.find();
    if (!courses.length) {
      return res.status(404).json({ message: 'No courses found' });
    }
    res.status(200).json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ message: 'Failed to fetch courses', error: err.message });
  }
});

/* ----------------------------------------
   PUT to update a course by ID
---------------------------------------- */
router.put('/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    const updatedData = req.body;

    // Validate the courseId and the updatedData to ensure the update is valid
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }

    const updatedCourse = await Course.findByIdAndUpdate(courseId, updatedData, {
      new: true, // Return the modified document
      runValidators: true, // Validate before updating
    });

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(updatedCourse); // Send the updated course back as a response
  } catch (err) {
    console.error('Error updating course:', err); // Log error for debugging
    res.status(500).json({ message: 'Failed to update course', error: err.message });
  }
});

/* ----------------------------------------
   GET a single course by ID
---------------------------------------- */
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (err) {
    console.error('Error fetching course:', err);
    res.status(500).json({ message: 'Error fetching course', error: err.message });
  }
});

/* ----------------------------------------
   GET the course assigned to a specific mentor
---------------------------------------- */
router.get('/mentor/:mentorId/course', async (req, res) => {
  try {
    const { mentorId } = req.params;

    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== 'mentor') {
      return res.status(404).json({ message: 'Mentor not found or role mismatch' });
    }

    // Only return the course assigned to this mentor
    const course = await Course.findOne({ _id: mentor.course });

    if (!course) {
      return res.status(404).json({ message: 'No course assigned or course not found' });
    }

    res.status(200).json(course);
  } catch (err) {
    console.error('Error fetching assigned course:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

/* ----------------------------------------
   PUT to update the syllabus of a course by ID
---------------------------------------- */
router.put('/:id/syllabus', async (req, res) => {
  try {
    const courseId = req.params.id;
    const { syllabus } = req.body;

    // Validate the courseId and syllabus format if necessary
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }

    // Validate the syllabus structure (if necessary)
    if (!Array.isArray(syllabus)) {
      return res.status(400).json({ message: 'Invalid syllabus format' });
    }

    // Find the course and update the syllabus
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { syllabus },
      { new: true, runValidators: true } // Consider setting runValidators to true if the syllabus follows a schema
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ message: 'Syllabus updated', syllabus: updatedCourse.syllabus });
  } catch (err) {
    console.error('Error updating syllabus:', err);
    res.status(500).json({ message: 'Failed to update syllabus', error: err.message });
  }
});

export default router;
