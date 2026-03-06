import { createAttempt } from '../services/attemptService.js';
import { executeSandboxQuery } from '../services/queryService.js';
import { validateQuerySafety } from '../services/queryValidationService.js';

export const executeQuery = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Query is required.'
      });
    }

    const normalizedQuery = query.trim().toLowerCase();

    if (!/^select\b/.test(normalizedQuery)) {
      return res.status(400).json({
        success: false,
        error: 'Only SELECT statements are allowed.'
      });
    }

    validateQuerySafety(query);

    const result = await executeSandboxQuery(query);

    return res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    return res.status(statusCode).json({
      success: false,
      error: error.message || 'Failed to execute query.'
    });
  }
};

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
