// Importar función que recoge los errores de validación
import { validationResult } from 'express-validator';

// Middleware que verifica si hubo errores de validación en la petición
export const handleValidationErrors = (req, res, next) => {
  // Obtener los errores de validación de la petición
  const errors = validationResult(req);
  // Si hay errores, responder con 400 y los detalles
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Error de validación',
      details: errors.array().map(e => ({ field: e.path, message: e.msg }))
    });
  }
  // Si no hay errores, continuar al siguiente middleware/controlador
  next();
};
