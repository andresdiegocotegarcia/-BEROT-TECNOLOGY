// Importar el modelo de Cliente
import { Cliente } from '../models/index.js';
// Importar la clase de error personalizada
import { AppError } from '../middlewares/errorHandler.js';

// Obtener todos los clientes ordenados por ID
export const getAll = async (req, res, next) => {
  try {
    const clientes = await Cliente.findAll({ order: [['id', 'ASC']] });
    res.json(clientes);
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo cliente
export const create = async (req, res, next) => {
  try {
    // Extraer datos del cuerpo de la petición
    const { nombre, cedula, telefono, email } = req.body;

    // Insertar el cliente en la base de datos
    const cliente = await Cliente.create({
      nombre,
      cedula,
      telefono,
      email: email || null
    });

    // Responder con el cliente creado (código 201 = creado)
    res.status(201).json(cliente);
  } catch (error) {
    // Si la cédula ya existe en la base de datos, retornar error 409
    if (error.name === 'SequelizeUniqueConstraintError') {
      return next(new AppError('Ya existe un cliente con esa cédula', 409));
    }
    next(error);
  }
};

// Actualizar un cliente existente
export const update = async (req, res, next) => {
  try {
    // Obtener el ID de los parámetros de la URL
    const { id } = req.params;
    // Obtener los nuevos datos del cuerpo
    const { nombre, cedula, telefono, email } = req.body;

    // Buscar el cliente por su ID
    const cliente = await Cliente.findByPk(id);
    // Si no existe, lanzar error 404
    if (!cliente) {
      throw new AppError('Cliente no encontrado', 404);
    }

    // Actualizar los campos del cliente
    await cliente.update({
      nombre,
      cedula,
      telefono,
      email: email || null
    });

    // Responder con el cliente actualizado
    res.json(cliente);
  } catch (error) {
    next(error);
  }
};

// Eliminar un cliente
export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Buscar el cliente
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      throw new AppError('Cliente no encontrado', 404);
    }

    // Eliminar de la base de datos
    await cliente.destroy();
    // Responder confirmando la eliminación
    res.json({ success: true, message: 'Cliente eliminado' });
  } catch (error) {
    next(error);
  }
};
