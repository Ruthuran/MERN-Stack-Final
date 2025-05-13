import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    title: { 
      type: String, 
      required: true 
    },
    description: {
      type: String,
      default: 'No description provided', // Optional description with a default value
    },
    deadline: {
      type: Date,
      validate: {
        validator: (value) => value > Date.now(), // Ensure deadline is in the future
        message: 'Deadline must be a future date.',
      },
    },
    fileUrl: {
      type: String,
      validate: {
        validator: (value) => {
          if (!value) return true; // Allows the field to be empty
          const regex = /^(ftp|http|https):\/\/[^ "]+$/; // Simple URL regex validation
          return regex.test(value);
        },
        message: 'Invalid URL format for fileUrl.',
      },
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // The 'User' model should be the one to assign the tasks
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed'],
      default: 'Pending', // New field to track assignment status
    },
    submissions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Submission', // Reference to student submissions
    }],
  },
  { timestamps: true }
);

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;
