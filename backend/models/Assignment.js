import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    starterQuery: {
      type: String,
      default: 'SELECT * FROM students LIMIT 10;'
    },
    expectedConcepts: {
      type: [String],
      default: []
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'easy'
    }
  },
  {
    timestamps: true
  }
);

export const Assignment = mongoose.model('Assignment', assignmentSchema);
