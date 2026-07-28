// Importar operadores de Sequelize
import { Op } from 'sequelize';
// Importar la instancia de conexión a la base de datos
import sequelize from '../config/database.js';
// Importar el modelo de Usuario
import { Usuario } from '../models/index.js';
// Importar la clase de error personalizada
import { AppError } from '../middlewares/errorHandler.js';

// Controlador para iniciar sesión
export const login = async (req, res, next) => {
  try {
    // Obtener email y contraseña del cuerpo de la petición
    const { email, password } = req.body;

    // Buscar usuario por email (sin importar mayúsculas/minúsculas)
    const user = await Usuario.findOne({
      where: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('email')),
        email.toLowerCase()
      )
    });

    // Si no existe el usuario o la contraseña no coincide, lanzar error
    if (!user || user.password !== password) {
      throw new AppError('Credenciales inválidas', 401);
    }

    // Responder con los datos del usuario (sin contraseña)
    res.json({
      success: true,
      user: { nombre: user.nombre, email: user.email, rol: user.rol }
    });
  } catch (error) {
    // Pasar el error al middleware de manejo de errores
    next(error);
  }
};

// Controlador para registrar un nuevo usuario
export const register = async (req, res, next) => {
  try {
    // Obtener datos del cuerpo de la petición
    const { nombre, email, password } = req.body;

    // Verificar si ya existe un usuario con ese email
    const existing = await Usuario.findOne({
      where: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('email')),
        email.toLowerCase()
      )
    });

    // Si ya existe, lanzar error de conflicto (409)
    if (existing) {
      throw new AppError('email_exists', 409);
    }

    // Crear el nuevo usuario en la base de datos
    const user = await Usuario.create({
      nombre,
      email,
      password,
      rol: 'tecnico'
    });

    // Responder con los datos del usuario creado
    res.status(201).json({
      success: true,
      user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol }
    });
  } catch (error) {
    next(error);
  }
};
