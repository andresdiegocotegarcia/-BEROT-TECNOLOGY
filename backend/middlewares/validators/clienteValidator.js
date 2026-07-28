// Importar funciones de validación
import { body } from 'express-validator';
import { handleValidationErrors } from './helpers.js';

// Reglas de validación para crear un cliente
export const createClienteRules = [
  // Nombre obligatorio
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio'),
  // Cédula obligatoria
  body('cedula')
    .trim()
    .notEmpty().withMessage('La cédula es obligatoria'),
  // Teléfono obligatorio
  body('telefono')
    .trim()
    .notEmpty().withMessage('El teléfono es obligatorio'),
  // Email opcional, pero si se envía debe ser válido
  body('email')
    .optional({ values: 'falsy' })
    .isEmail().withMessage('El formato de email no es válido'),
  handleValidationErrors
];

// Reglas de validación para actualizar un cliente
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
