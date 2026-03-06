import { getAssignmentById } from '../services/assignmentService.js';
import { generateHint } from '../services/hintService.js';

export const getQueryHint = async (req, res) => {
  const { assignmentId, query } = req.body;

  if (!assignmentId || !query) {
    const error = new Error('assignmentId and query are required');
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
    assignmentDescription: assignment.description,
    studentQuery: query
  });

  res.json(hintResponse);
};
