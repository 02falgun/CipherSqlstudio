import { createAttempt } from '../services/attemptService.js';
import { executeSandboxQuery } from '../services/queryService.js';

export const runQueryForAssignment = async (req, res) => {
  const { assignmentId, studentId, query } = req.body;

  if (!assignmentId || !studentId || !query) {
    const error = new Error('assignmentId, studentId, and query are required');
    error.statusCode = 400;
    throw error;
  }

  try {
    const result = await executeSandboxQuery(query);

    await createAttempt({
      assignmentId,
      studentId,
      submittedQuery: query,
      wasSuccessful: true,
      executionTimeMs: result.executionTimeMs,
      errorMessage: null
    });

    res.json({
      success: true,
      result
    });
  } catch (error) {
    await createAttempt({
      assignmentId,
      studentId,
      submittedQuery: query,
      wasSuccessful: false,
      executionTimeMs: null,
      errorMessage: error.message
    });

    error.statusCode = error.statusCode || 400;
    throw error;
  }
};
