import { body } from 'express-validator';
import { handleValidationErrors } from './helpers.js';

export const createOrdenRules = [
  body('cliente_nombre')
    .trim()
    .notEmpty().withMessage('El nombre del cliente es obligatorio'),
  body('marca')
    .trim()
    .notEmpty().withMessage('La marca es obligatoria'),
  body('modelo')
    .trim()
    .notEmpty().withMessage('El modelo es obligatorio'),
  body('condiciones_ingreso')
    .trim()
    .notEmpty().withMessage('Las condiciones de ingreso son obligatorias'),
  body('motivo_reparacion')
    .trim()
    .notEmpty().withMessage('El motivo de reparación es obligatorio'),
  body('fotos_recepcion')
    .optional()
    .isArray().withMessage('Las fotos deben ser un array'),
  handleValidationErrors
];

export const updateOrdenRules = [
  body('estado')
    .optional()
    .isIn(['en_espera', 'en_reparacion', 'listo', 'entregado'])
    .withMessage('Estado inválido. Debe ser: en_espera, en_reparacion, listo o entregado'),
  body('costo')
    .optional({ values: 'falsy' })
    .isDecimal().withMessage('El costo debe ser un número válido'),
  handleValidationErrors
];
