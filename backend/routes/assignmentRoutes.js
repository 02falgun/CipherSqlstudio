import { Router } from 'express';

import {
  getAssignmentDetails,
  getAssignments,
  seedAssignmentData
} from '../controllers/assignmentController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(getAssignments));
router.get('/:id', asyncHandler(getAssignmentDetails));
router.post('/seed', asyncHandler(seedAssignmentData));

export default router;
