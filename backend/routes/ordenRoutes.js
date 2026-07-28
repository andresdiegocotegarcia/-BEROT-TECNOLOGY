// Importar Router de Express
import { Router } from 'express';
// Importar los controladores CRUD de órdenes
import { getAll, getById, create, update, remove } from '../controllers/ordenController.js';
// Importar las reglas de validación para crear y actualizar órdenes
import { createOrdenRules, updateOrdenRules } from '../middlewares/validators/ordenValidator.js';

// Crear el enrutador para órdenes
const router = Router();

// GET /api/ordenes - Obtener todas las órdenes
router.get('/', getAll);
// GET /api/ordenes/:id - Obtener una orden por su ID
router.get('/:id', getById);
// POST /api/ordenes - Crear una nueva orden (con validación)
router.post('/', createOrdenRules, create);
// PUT /api/ordenes/:id - Actualizar una orden existente (con validación)
router.put('/:id', updateOrdenRules, update);
// DELETE /api/ordenes/:id - Eliminar una orden
router.delete('/:id', remove);

export default router;
