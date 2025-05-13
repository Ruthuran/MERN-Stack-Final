import express from 'express';
import mongoose from 'mongoose';
import Enrollment from '../models/Enrollment.js';
import Student from '../models/Student.js';
import Course from '../models/Course.js';

const router = express.Router();

// POST: Enroll a student
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, course, instructor, amount, fromDate, paymentMethod } = req.body;

    if (!name || !email || !phone || !course || !instructor || !amount || !fromDate || !paymentMethod) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    const existingEnrollment = await Enrollment.findOne({ studentId: student._id, course });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'You are already enrolled in this course.' });
    }

    const courseData = await Course.findOne({ name: course, instructor });
    if (!courseData) {
      return res.status(404).json({ message: 'Course not found.' });
    }
    if (!courseData.isPublished) {
      return res.status(403).json({ message: 'This course is not currently published for enrollment.' });
    }

    const enrollment = new Enrollment({
      studentId: student._id,
      name,
      email,
      phone,
      course,
      instructor,
      amount,
      fromDate,
      paymentMethod,
    });

    await enrollment.save();

    res.status(201).json({
      message: 'Enrollment successful',
      enrollment,
    });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({ message: 'Enrollment failed', error: error.message });
  }
});

// GET: All enrollments
router.get('/', async (req, res) => {
  try {
    const enrollments = await Enrollment.find();

    const totalEnrollments = enrollments.length;
    const totalEarnings = enrollments.reduce((sum, enrollment) => sum + (enrollment.amount || 0), 0);

    res.status(200).json({
      enrollments,
      totalEnrollments,
      totalEarnings
    });
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    res.status(500).json({ message: "Error fetching enrollments." });
  }
});

// GET: Enrollments for a specific mentor
router.get('/mentor/:mentorId/enrollments', async (req, res) => {
  try {
    const { mentorId } = req.params;

    const mentorEnrollments = await Enrollment.find({ instructor: mentorId });

    if (!mentorEnrollments || mentorEnrollments.length === 0) {
      return res.status(404).json({ message: 'No enrollments found for this mentor' });
    }

    res.status(200).json(mentorEnrollments);
  } catch (error) {
    console.error("Error fetching mentor enrollments:", error);
    res.status(500).json({ message: "Failed to fetch mentor enrollments", error: error.message });
  }
});

// GET: Enrollments for a specific student
router.get('/student/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;

    const objectId = new mongoose.Types.ObjectId(studentId);

    const studentEnrollments = await Enrollment.find({ studentId: objectId });

    if (!studentEnrollments || studentEnrollments.length === 0) {
      return res.status(404).json({ message: 'No enrollments found for this student.' });
    }

    res.status(200).json(studentEnrollments);
  } catch (error) {
    console.error("Error fetching student enrollments:", error);
    res.status(500).json({ message: "Failed to fetch student enrollments", error: error.message });
  }
});

// ✅ NEW ROUTE: Get enrolled students for a mentor
router.get('/students/:mentorId', async (req, res) => {
  try {
    const { mentorId } = req.params;

    const enrollments = await Enrollment.find({ instructor: mentorId });

    if (!enrollments || enrollments.length === 0) {
      return res.status(404).json({ message: 'No students found for this mentor.' });
    }

    const students = enrollments.map((enroll) => ({
      name: enroll.name,
      email: enroll.email,
    }));

    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students by mentor:", error);
    res.status(500).json({ message: "Failed to fetch students", error: error.message });
  }
});

export default router;
