import {
  getAssignmentById,
  listAssignments,
  seedAssignments
} from '../services/assignmentService.js';
import { listAttemptsForAssignment } from '../services/attemptService.js';

export const getAssignments = async (_req, res) => {
  const assignments = await listAssignments();
  res.json({ assignments });
};

export const getAssignmentDetails = async (req, res) => {
  const assignment = await getAssignmentById(req.params.assignmentId);

  if (!assignment) {
    const error = new Error('Assignment not found');
    error.statusCode = 404;
    throw error;
  }

  const attempts = await listAttemptsForAssignment(assignment._id);
  res.json({ assignment, attempts });
};

export const seedAssignmentData = async (_req, res) => {
  const result = await seedAssignments();
  res.status(201).json(result);
};
