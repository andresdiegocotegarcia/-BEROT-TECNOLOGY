import { body } from 'express-validator';
import { handleValidationErrors } from './helpers.js';

export const createClienteRules = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio'),
  body('cedula')
    .trim()
    .notEmpty().withMessage('La cédula es obligatoria'),
  body('telefono')
    .trim()
    .notEmpty().withMessage('El teléfono es obligatorio'),
  body('email')
    .optional({ values: 'falsy' })
    .isEmail().withMessage('El formato de email no es válido'),
  handleValidationErrors
];

export const updateClienteRules = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio'),
  body('cedula')
    .trim()
    .notEmpty().withMessage('La cédula es obligatoria'),
  body('telefono')
    .trim()
    .notEmpty().withMessage('El teléfono es obligatorio'),
  body('email')
    .optional({ values: 'falsy' })
    .isEmail().withMessage('El formato de email no es válido'),
  handleValidationErrors
];
