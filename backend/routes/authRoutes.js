// Importar Router de Express
import { Router } from 'express';
// Importar los controladores de autenticación
import { login, register } from '../controllers/authController.js';
// Importar las reglas de validación para login y registro
import { loginRules, registerRules } from '../middlewares/validators/authValidator.js';

// Crear el enrutador para autenticación
const router = Router();

// POST /api/auth/login - Iniciar sesión (primero valida, luego ejecuta)
router.post('/login', loginRules, login);
// POST /api/auth/register - Registrar nuevo usuario
router.post('/register', registerRules, register);

export default router;
