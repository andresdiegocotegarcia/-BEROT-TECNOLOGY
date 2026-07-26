import { Router } from 'express';
import { getAll, create, update, remove } from '../controllers/clienteController.js';
import { createClienteRules, updateClienteRules } from '../middlewares/validators/clienteValidator.js';

const router = Router();

router.get('/', getAll);
router.post('/', createClienteRules, create);
router.put('/:id', updateClienteRules, update);
router.delete('/:id', remove);

export default router;
