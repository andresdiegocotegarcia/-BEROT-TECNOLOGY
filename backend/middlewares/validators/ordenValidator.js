// Importar funciones de validación
import { body } from 'express-validator';
import { handleValidationErrors } from './helpers.js';

// Reglas de validación para crear una orden
export const createOrdenRules = [
  // Nombre del cliente obligatorio
  body('cliente_nombre')
    .trim()
    .notEmpty().withMessage('El nombre del cliente es obligatorio'),
  // Marca del equipo obligatoria
  body('marca')
    .trim()
    .notEmpty().withMessage('La marca es obligatoria'),
  // Modelo del equipo obligatorio
  body('modelo')
    .trim()
    .notEmpty().withMessage('El modelo es obligatorio'),
  // Condiciones de ingreso obligatorias
  body('condiciones_ingreso')
    .trim()
    .notEmpty().withMessage('Las condiciones de ingreso son obligatorias'),
  // Motivo de reparación obligatorio
  body('motivo_reparacion')
    .trim()
    .notEmpty().withMessage('El motivo de reparación es obligatorio'),
  // Fotos opcionales, pero si se envían deben ser un array
  body('fotos_recepcion')
    .optional()
    .isArray().withMessage('Las fotos deben ser un array'),
  handleValidationErrors
];

// Reglas de validación para actualizar una orden
export const updateOrdenRules = [
  // Estado opcional, pero si se envía debe ser uno de los valores permitidos
  body('estado')
    .optional()
    .isIn(['en_espera', 'en_reparacion', 'listo', 'entregado'])
    .withMessage('Estado inválido. Debe ser: en_espera, en_reparacion, listo o entregado'),
  // Costo opcional, pero si se envía debe ser un número decimal
  body('costo')
    .optional({ values: 'falsy' })
    .isDecimal().withMessage('El costo debe ser un número válido'),
  handleValidationErrors
];
