import { Cliente } from '../models/index.js';
import { AppError } from '../middlewares/errorHandler.js';

export const getAll = async (req, res, next) => {
  try {
    const clientes = await Cliente.findAll({ order: [['id', 'ASC']] });
    res.json(clientes);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const { nombre, cedula, telefono, email } = req.body;

    const cliente = await Cliente.create({
      nombre,
      cedula,
      telefono,
      email: email || null
    });

    res.status(201).json(cliente);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return next(new AppError('Ya existe un cliente con esa cédula', 409));
    }
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, cedula, telefono, email } = req.body;

    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      throw new AppError('Cliente no encontrado', 404);
    }

    await cliente.update({
      nombre,
      cedula,
      telefono,
      email: email || null
    });

    res.json(cliente);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      throw new AppError('Cliente no encontrado', 404);
    }

    await cliente.destroy();
    res.json({ success: true, message: 'Cliente eliminado' });
  } catch (error) {
    next(error);
  }
};
