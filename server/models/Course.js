// models/Course.js
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: String,
  instructor: String,
  description: String,
  image: String,
  category: String,
  brand: String,
  rating: Number,
  originalPrice: String,
  discountedPrice: String,
  badge: String,
  isPublished: { type: Boolean, default: true },
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  syllabus: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      pdf: String,
      video: String,
    }
  ]
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);
