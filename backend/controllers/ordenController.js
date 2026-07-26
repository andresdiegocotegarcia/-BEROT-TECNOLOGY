import { Orden } from '../models/index.js';
import { AppError } from '../middlewares/errorHandler.js';

export const getAll = async (req, res, next) => {
  try {
    const ordenes = await Orden.findAll({ order: [['id', 'DESC']] });
    res.json(ordenes);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orden = await Orden.findByPk(id);

    if (!orden) {
      throw new AppError('Orden no encontrada', 404);
    }

    res.json(orden);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const {
      cliente_id, cliente_nombre, marca, modelo, color, imei,
      condiciones_ingreso, accesorios, motivo_reparacion,
      contrasena_equipo, fotos_recepcion
    } = req.body;

    // Generate order number
    const maxId = await Orden.max('id') || 0;
    const nextNum = maxId + 1;
    const numero_orden = `ORD-${String(nextNum).padStart(3, '0')}`;

    const orden = await Orden.create({
      numero_orden,
      cliente_id: cliente_id || null,
      cliente_nombre,
      marca,
      modelo,
      color: color || null,
      imei: imei || null,
      condiciones_ingreso,
      accesorios: accesorios || null,
      motivo_reparacion,
      contrasena_equipo: contrasena_equipo || null,
      fotos_recepcion: fotos_recepcion || [],
      fecha_recepcion: new Date(),
      estado: 'en_espera'
    });

    res.status(201).json(orden);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const orden = await Orden.findByPk(id);
    if (!orden) {
      throw new AppError('Orden no encontrada', 404);
    }

    const allowedFields = [
      'estado', 'diagnostico', 'repuestos', 'procedimiento',
      'costo', 'fecha_entrega', 'condiciones_entrega',
      'fotos_recepcion', 'fotos_entrega', 'marca', 'modelo',
      'color', 'imei', 'condiciones_ingreso', 'accesorios',
      'motivo_reparacion', 'contrasena_equipo', 'cliente_nombre'
    ];

    const filteredUpdates = {};
    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        filteredUpdates[field] = updates[field];
      }
    }

    if (Object.keys(filteredUpdates).length === 0) {
      throw new AppError('No hay campos para actualizar', 400);
    }

    await orden.update(filteredUpdates);
    res.json(orden);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const orden = await Orden.findByPk(id);
    if (!orden) {
      throw new AppError('Orden no encontrada', 404);
    }

    await orden.destroy();
    res.json({ success: true, message: 'Orden eliminada' });
  } catch (error) {
    next(error);
  }
};
