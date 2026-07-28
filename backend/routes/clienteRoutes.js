// Importar Router de Express
import { Router } from 'express';
// Importar los controladores CRUD de clientes
import { getAll, create, update, remove } from '../controllers/clienteController.js';
// Importar las reglas de validación para crear y actualizar clientes
import { createClienteRules, updateClienteRules } from '../middlewares/validators/clienteValidator.js';

// Crear el enrutador para clientes
const router = Router();

// GET /api/clientes - Obtener todos los clientes
router.get('/', getAll);
// POST /api/clientes - Crear un nuevo cliente (con validación)
router.post('/', createClienteRules, create);
// PUT /api/clientes/:id - Actualizar un cliente existente (con validación)
router.put('/:id', updateClienteRules, update);
// DELETE /api/clientes/:id - Eliminar un cliente
router.delete('/:id', remove);

export default router;
