import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema(
  {
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment',
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    submittedAt: { 
      type: Date, 
      default: Date.now,
    },
    file: { 
      type: String, 
      required: true,
      validate: {
        validator: (value) => {
          const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i; // URL validation regex
          return regex.test(value);
        },
        message: 'Invalid URL format for file.',
      },
    },
    grade: { 
      type: String, 
      default: 'Pending',
      enum: ['Pending', 'A', 'B', 'C', 'D', 'F'], // Enum for grade values
    },
    feedback: { 
      type: String, 
      default: '',
    },
    status: {
      type: String,
      enum: ['Pending', 'Graded'], // Enum for submission status
      default: 'Pending',
    }
  },
  { timestamps: true }
);

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;
