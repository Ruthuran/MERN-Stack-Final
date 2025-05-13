import mongoose from 'mongoose';

const EnrollmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  course: {
    type: String,
    required: true,
    trim: true
  }, // Name of the course
  instructor: {
    type: String,
    required: true,
    trim: true
  }, // Instructor name
  amount: {
    type: Number,
    required: true
  }, // Paid amount
  fromDate: {
    type: Date,
    required: true
  }, // Start date
  paymentMethod: {
    type: String,
    required: true,
    trim: true
  } // UPI / Card etc.
}, { timestamps: true });

const Enrollment = mongoose.model('Enrollment', EnrollmentSchema);
export default Enrollment;
