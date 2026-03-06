import { Attempt } from '../models/Attempt.js';

export const createAttempt = async ({
  assignmentId,
  studentId,
  submittedQuery,
  wasSuccessful,
  executionTimeMs,
  errorMessage
}) => {
  return Attempt.create({
    assignmentId,
    studentId,
    submittedQuery,
    wasSuccessful,
    executionTimeMs,
    errorMessage
  });
};

export const listAttemptsForAssignment = async (assignmentId) => {
  return Attempt.find({ assignmentId }).sort({ createdAt: -1 }).lean();
};
