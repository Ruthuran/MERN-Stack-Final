import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'mentor', 'student'],
    },
    name: {
      type: String,
      required: function () {
        return this.role !== 'student'; // Name is required for mentor/admin
      },
      trim: true,
    },
    pendingApproval: {
      type: Boolean,
      default: true, // Set true by default for mentors
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course', // Reference to the Course model
      required: function () {
        return this.role === 'mentor'; // Only mentors should have a course
      },
    },
  },
  { timestamps: true }
);

// Prevent model overwrite error
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
