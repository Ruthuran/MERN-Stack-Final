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

// Parse JSON bodies
app.use(express.json());

// Enable CORS with client origin and credentials
const CLIENT_URL = 'https://mern-stack-final-client.onrender.com';

app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
}));

// Manually add necessary CORS headers (for preflight requests and broader compatibility)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', CLIENT_URL);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Handle preflight requests
app.options('*', cors({
  origin: CLIENT_URL,
  credentials: true,
}));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/assignments', assignmentRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API WORKING');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack || err.message);
  res.status(500).json({ message: 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
