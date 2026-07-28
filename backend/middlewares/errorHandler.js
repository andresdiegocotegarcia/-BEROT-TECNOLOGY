// Clase personalizada de error con código de estado HTTP
export class AppError extends Error {
  constructor(message, statusCode) {
    // Llamar al constructor de Error con el mensaje
    super(message);
    // Asignar el código de estado HTTP (400, 404, 409, 500, etc.)
    this.statusCode = statusCode;
    // Marcar como error operacional (controlado, no un bug)
    this.isOperational = true;
    // Capturar el stack trace para debugging
    Error.captureStackTrace(this, this.constructor);
  }
}

// Middleware centralizado para manejar todos los errores de la aplicación
export const errorHandler = (err, req, res, next) => {
  // Imprimir el error en la consola del servidor
  console.error(`[ERROR] ${err.statusCode || 500} - ${err.message}`);
  // En desarrollo, mostrar también el stack trace completo
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  // Si es un error de restricción única de Sequelize (ej: cédula duplicada)
  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors?.[0]?.path || 'campo';
    return res.status(409).json({
      error: `Ya existe un registro con ese ${field}`
    });
  }

  // Si es un error de validación de Sequelize
  if (err.name === 'SequelizeValidationError') {
    const details = err.errors.map(e => ({
      field: e.path,
      message: e.message
    }));
    return res.status(400).json({
      error: 'Error de validación',
      details
    });
  }

  // Si es un error operacional (creado con AppError)
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      error: err.message
    });
  }

  // Si es un error inesperado, responder con mensaje genérico (no exponer detalles)
  res.status(500).json({
    error: 'Error interno del servidor'
  });
};
