import {
  getAssignmentById,
  listAssignments,
  seedAssignments
} from '../services/assignmentService.js';

export const getAssignments = async (_req, res) => {
  const assignments = await listAssignments();
  res.json({ assignments });
};

export const getAssignmentDetails = async (req, res) => {
  const assignment = await getAssignmentById(req.params.id);

  if (!assignment) {
    const error = new Error('Assignment not found');
    error.statusCode = 404;
    throw error;
  }

  res.json({ assignment });
};

export const seedAssignmentData = async (_req, res) => {
  const result = await seedAssignments();
  res.status(201).json(result);
};
