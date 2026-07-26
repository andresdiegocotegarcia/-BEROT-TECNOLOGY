import { Router } from 'express';
import { upload } from '../controllers/uploadController.js';

const router = Router();

router.post('/', upload);

export default router;
