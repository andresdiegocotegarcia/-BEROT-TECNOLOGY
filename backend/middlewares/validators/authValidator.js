import { body } from 'express-validator';
import { handleValidationErrors } from './helpers.js';

export const loginRules = [
  body('email')
    .trim()
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('El formato de email no es válido'),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria'),
  handleValidationErrors
];

export const registerRules = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio'),
  body('email')
    .trim()
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('El formato de email no es válido'),
  body('password')
    .isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres'),
  handleValidationErrors
];
