import mongoose from 'mongoose';

const attemptSchema = new mongoose.Schema(
  {
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment',
      required: true
    },
    studentId: {
      type: String,
      required: true,
      trim: true
    },
    submittedQuery: {
      type: String,
      required: true
    },
    wasSuccessful: {
      type: Boolean,
      required: true
    },
    executionTimeMs: {
      type: Number,
      default: null
    },
    errorMessage: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

export const Attempt = mongoose.model('Attempt', attemptSchema);
