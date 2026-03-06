import { Router } from 'express';

import { runQueryForAssignment } from '../controllers/queryController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

router.post('/execute', asyncHandler(runQueryForAssignment));

export default router;
