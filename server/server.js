import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import studentRoutes from './routes/studentRoutes.js'; 
import enrollmentRoutes from './routes/enrollments.js';
import assignmentRoutes from './routes/assignments.js'; 
import connectDB from './db.js';

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());


connectDB();


app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/assignments', assignmentRoutes); 


app.use((err, req, res, next) => {
  console.error('Error:', err.stack || err.message);
  res.status(500).json({ message: 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
