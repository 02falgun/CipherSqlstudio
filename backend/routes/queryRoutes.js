import { Router } from 'express';

import { executeQuery, runQueryForAssignment } from '../controllers/queryController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { validateSqlQuery } from '../middleware/queryValidationMiddleware.js';

const router = Router();

router.post('/execute-query', validateSqlQuery, executeQuery);
router.post('/execute', validateSqlQuery, asyncHandler(runQueryForAssignment));

export default router;
