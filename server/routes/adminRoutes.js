import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import Course from '../models/Course.js'; 
import mongoose from 'mongoose'; 


const router = express.Router();


router.post('/add-mentor', async (req, res) => {
  const { name, email, password, courseId } = req.body;

  try {
    const isAdmin = true; 
    if (!isAdmin) {
      return res.status(403).json({ message: 'You are not authorized to add mentors.' });
    }

    const existingMentor = await User.findOne({ email });
    if (existingMentor) {
      return res.status(400).json({ message: 'Mentor already exists.' });
    }

    if (courseId && !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid course ID.' });
    }

    if (courseId) {
      const courseExists = await Course.findById(courseId);
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

router.put('/edit-mentor/:id', async (req, res) => {
  const { name, email, password, course } = req.body;
  const mentorId = req.params.id;

  try {
    const isAdmin = true; 
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

router.get('/get-mentors', async (req, res) => {
  try {
    const mentors = await User.find({ role: 'mentor' }).populate('course');

    if (mentors.length === 0) {
      return res.status(404).json({ message: 'No mentors found.' });
    }
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
