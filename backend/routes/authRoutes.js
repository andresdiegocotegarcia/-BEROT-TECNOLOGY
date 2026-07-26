import { Router } from 'express';
import { login, register } from '../controllers/authController.js';
import { loginRules, registerRules } from '../middlewares/validators/authValidator.js';

const router = Router();

router.post('/login', loginRules, login);
router.post('/register', registerRules, register);

export default router;
