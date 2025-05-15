import express from 'express';
import mongoose from 'mongoose';
import Assignment from '../models/Assignment.js';
import Submission from '../models/Submission.js';
import User from '../models/user.js';
import Student from '../models/Student.js';

const router = express.Router();

const validateObjectId = (req, res, next) => {
  const { assignmentId, studentId, submissionId, mentorId } = req.params;
  const invalidId = [assignmentId, studentId, submissionId, mentorId].find(
    id => id && !mongoose.Types.ObjectId.isValid(id)
  );
  if (invalidId) {
    return res.status(400).json({ message: `Invalid ID format: ${invalidId}` });
  }
  next();
};

router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate('assignedBy', 'name')
      .exec();

    res.status(200).json({
      message: 'Assignments retrieved successfully',
      data: assignments,
    });
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ message: 'Error fetching assignments', error: error.message });
  }
});

router.get('/submissions', async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate('assignmentId', 'title')
      .populate('studentId', 'name email')
      .exec();

    res.status(200).json({
      message: 'Submissions retrieved successfully',
      data: submissions,
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ message: 'Error fetching submissions', error: error.message });
  }
});

router.get('/submissions/by-student', async (req, res) => {
  try {
    const { studentId } = req.query;

    if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: 'Valid studentId is required as query parameter.' });
    }

    const submissions = await Submission.find({ studentId })
      .populate({
        path: 'assignmentId',
        select: 'title courseId',
        populate: {
          path: 'courseId',
          select: 'name',
        },
      })
      .exec();

    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error fetching student submissions:', error);
    res.status(500).json({ message: 'Error fetching student submissions', error: error.message });
  }
});

router.post('/create', async (req, res) => {
  try {
    const { courseId, title, description, deadline, fileUrl, assignedBy } = req.body;

    if (!courseId || !title || !assignedBy) {
      return res.status(400).json({ message: 'Course ID, title, and assignedBy are required.' });
    }

    const newAssignment = new Assignment({ courseId, title, description, deadline, fileUrl, assignedBy });
    await newAssignment.save();

    res.status(201).json({
      message: 'Assignment created successfully',
      assignment: newAssignment,
    });
  } catch (error) {
    console.error('Error creating assignment:', error);
    res.status(500).json({ message: 'Error creating assignment', error: error.message });
  }
});

router.post('/submit/:assignmentId', validateObjectId, async (req, res) => {
  try {
    const { link, studentId } = req.body;
    const { assignmentId } = req.params;

    if (!link || !studentId) {
      return res.status(400).json({ message: 'Link and studentId are required.' });
    }

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    const existing = await Submission.findOne({ assignmentId, studentId });
    if (existing) return res.status(400).json({ message: 'Submission already exists' });

    const newSubmission = new Submission({
      assignmentId,
      studentId,
      file: link,
    });

    await newSubmission.save();

    await Assignment.findByIdAndUpdate(
      assignmentId,
      { $push: { submissions: newSubmission._id }, status: 'Completed' },
      { new: true }
    );

    res.status(201).json({
      message: 'Submission successful and assignment marked as Completed',
      submission: newSubmission,
    });
  } catch (error) {
    console.error('Error submitting assignment:', error);
    res.status(500).json({ message: 'Error submitting assignment', error: error.message });
  }
});

router.put('/review-by-assignment/:assignmentId', validateObjectId, async (req, res) => {
  const { assignmentId } = req.params;
  const { grade, feedback } = req.body;

  if (!grade || !feedback) {
    return res.status(400).json({ message: 'Grade and feedback are required.' });
  }

  try {
    const submission = await Submission.findOneAndUpdate(
      { assignmentId },
      {
        grade,
        feedback,
        status: 'Reviewed',
      },
      { new: true }
    ).populate('assignmentId', 'title assignedBy');

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found for the given assignment ID.' });
    }

    res.status(200).json({
      message: 'Submission reviewed successfully by assignment ID',
      submission,
    });
  } catch (err) {
    console.error('Error reviewing submission by assignmentId:', err);
    res.status(500).json({ message: 'Server error while updating submission by assignmentId' });
  }
});

router.get('/mentor', async (req, res) => {
  try {
    const { mentorId } = req.query;

    if (!mentorId || !mongoose.Types.ObjectId.isValid(mentorId)) {
      return res.status(400).json({ message: 'Valid mentorId is required as a query parameter.' });
    }

    const assignments = await Assignment.find({ assignedBy: mentorId })
      .populate('courseId', 'name')
      .exec();

    res.status(200).json({
      message: 'Assignments created by the mentor retrieved successfully',
      data: assignments,
    });
  } catch (error) {
    console.error('Error fetching mentor assignments:', error);
    res.status(500).json({ message: 'Error fetching mentor assignments', error: error.message });
  }
});

router.get('/users', async (req, res) => {
  const { studentId } = req.query;
  if (!studentId) {
    return res.status(400).send('studentId query parameter is required');
  }
  try {
    const user = await User.findById(studentId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json({ name: user.name });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).send('Error fetching user');
  }
});

export default router;
