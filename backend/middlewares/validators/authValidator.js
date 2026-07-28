// Importar funciones de validación de express-validator
import { body } from 'express-validator';
// Importar el middleware que procesa los errores de validación
import { handleValidationErrors } from './helpers.js';

// Reglas de validación para el login
export const loginRules = [
  // El email debe estar presente y tener formato válido
  body('email')
    .trim()
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('El formato de email no es válido'),
  // La contraseña no puede estar vacía
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria'),
  // Al final, ejecutar la verificación de errores
  handleValidationErrors
];

// Reglas de validación para el registro
export const registerRules = [
  // El nombre es obligatorio
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio'),
  // El email debe ser válido
  body('email')
    .trim()
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('El formato de email no es válido'),
  // La contraseña debe tener mínimo 4 caracteres
  body('password')
    .isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres'),
  handleValidationErrors
];
