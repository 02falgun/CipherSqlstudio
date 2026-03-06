import { getAssignmentById } from '../services/assignmentService.js';
import { generateHint } from '../services/hintService.js';

export const getQueryHint = async (req, res) => {
  const { assignmentId, query, assignmentQuestion, userQueryAttempt } = req.body;
  const studentQuery = userQueryAttempt || query;

  if (!studentQuery) {
    const error = new Error('userQueryAttempt (or query) is required');
    error.statusCode = 400;
    throw error;
  }

  if (assignmentQuestion && typeof assignmentQuestion === 'string') {
    const hintResponse = await generateHint({
      assignmentTitle: 'SQL Assignment',
      assignmentDescription: assignmentQuestion,
      studentQuery
    });

    res.json(hintResponse);
    return;
  }

  if (!assignmentId) {
    const error = new Error('assignmentQuestion and userQueryAttempt are required');
    error.statusCode = 400;
    throw error;
  }

  const assignment = await getAssignmentById(assignmentId);

  if (!assignment) {
    const error = new Error('Assignment not found');
    error.statusCode = 404;
    throw error;
  }

  const hintResponse = await generateHint({
    assignmentTitle: assignment.title,
    assignmentDescription: assignment.question || assignment.description,
    studentQuery
  });

  res.json(hintResponse);
};
