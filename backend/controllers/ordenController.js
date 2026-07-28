// Importar el modelo de Orden
import { Orden } from '../models/index.js';
// Importar la clase de error personalizada
import { AppError } from '../middlewares/errorHandler.js';

// Obtener todas las órdenes (las más recientes primero)
export const getAll = async (req, res, next) => {
  try {
    const ordenes = await Orden.findAll({ order: [['id', 'DESC']] });
    res.json(ordenes);
  } catch (error) {
    next(error);
  }
};

// Obtener una orden específica por su ID
export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orden = await Orden.findByPk(id);

    // Si no existe la orden, lanzar error 404
    if (!orden) {
      throw new AppError('Orden no encontrada', 404);
    }

    res.json(orden);
  } catch (error) {
    next(error);
  }
};

// Crear una nueva orden de reparación
export const create = async (req, res, next) => {
  try {
    // Extraer todos los datos de la orden del cuerpo de la petición
    const {
      cliente_id, cliente_nombre, marca, modelo, color, imei,
      condiciones_ingreso, accesorios, motivo_reparacion,
      contrasena_equipo, fotos_recepcion
    } = req.body;

    // Generar número de orden automático (ORD-001, ORD-002, etc.)
    const maxId = await Orden.max('id') || 0;
    const nextNum = maxId + 1;
    const numero_orden = `ORD-${String(nextNum).padStart(3, '0')}`;

    // Crear la orden en la base de datos
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

    // Responder con la orden creada
    res.status(201).json(orden);
  } catch (error) {
    next(error);
  }
};

// Actualizar una orden existente (solo campos permitidos)
export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Buscar la orden
    const orden = await Orden.findByPk(id);
    if (!orden) {
      throw new AppError('Orden no encontrada', 404);
    }

    // Lista de campos que se permite actualizar
    const allowedFields = [
      'estado', 'diagnostico', 'repuestos', 'procedimiento',
      'costo', 'fecha_entrega', 'condiciones_entrega',
      'fotos_recepcion', 'fotos_entrega', 'marca', 'modelo',
      'color', 'imei', 'condiciones_ingreso', 'accesorios',
      'motivo_reparacion', 'contrasena_equipo', 'cliente_nombre'
    ];

    // Filtrar solo los campos permitidos que vienen en la petición
    const filteredUpdates = {};
    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        filteredUpdates[field] = updates[field];
      }
    }

    // Si no hay campos válidos para actualizar, lanzar error
    if (Object.keys(filteredUpdates).length === 0) {
      throw new AppError('No hay campos para actualizar', 400);
    }

    // Aplicar las actualizaciones
    await orden.update(filteredUpdates);
    res.json(orden);
  } catch (error) {
    next(error);
  }
};

// Eliminar una orden
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
