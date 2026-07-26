import { Op } from 'sequelize';
import sequelize from '../config/database.js';
import { Usuario } from '../models/index.js';
import { AppError } from '../middlewares/errorHandler.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Usuario.findOne({
      where: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('email')),
        email.toLowerCase()
      )
    });

    if (!user || user.password !== password) {
      throw new AppError('Credenciales inválidas', 401);
    }

    res.json({
      success: true,
      user: { nombre: user.nombre, email: user.email, rol: user.rol }
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { nombre, email, password } = req.body;

    // Check if email already exists
    const existing = await Usuario.findOne({
      where: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('email')),
        email.toLowerCase()
      )
    });

    if (existing) {
      throw new AppError('email_exists', 409);
    }

    const user = await Usuario.create({
      nombre,
      email,
      password,
      rol: 'tecnico'
    });

    res.status(201).json({
      success: true,
      user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol }
    });
  } catch (error) {
    next(error);
  }
};
