export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err, req, res, next) => {
  // Log the error for debugging
  console.error(`[ERROR] ${err.statusCode || 500} - ${err.message}`);
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  // Handle Sequelize UniqueConstraintError
  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors?.[0]?.path || 'campo';
    return res.status(409).json({
      error: `Ya existe un registro con ese ${field}`
    });
  }

  // Handle Sequelize ValidationError
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

  // Handle operational errors (AppError)
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      error: err.message
    });
  }

  // Handle unexpected errors
  res.status(500).json({
    error: 'Error interno del servidor'
  });
};
