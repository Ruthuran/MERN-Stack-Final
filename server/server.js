import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import studentRoutes from './routes/studentRoutes.js'; // ✅ Import student routes
import enrollmentRoutes from './routes/enrollments.js';
import assignmentRoutes from './routes/assignments.js'; // ✅ Import assignment routes
import connectDB from './db.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/students', studentRoutes); // ✅ Register student route
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/assignments', assignmentRoutes); // ✅ Register assignment route

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack || err.message);
  res.status(500).json({ message: 'Something went wrong' });
});
app.get('/',(req,res)=>{
    res.send('API WORKING')
})
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
