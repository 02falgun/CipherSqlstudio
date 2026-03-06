import { Router } from 'express';

import { getQueryHint } from '../controllers/hintController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

router.post('/', asyncHandler(getQueryHint));

export default router;
