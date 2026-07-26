import { Router } from 'express';
import { getAll, getById, create, update, remove } from '../controllers/ordenController.js';
import { createOrdenRules, updateOrdenRules } from '../middlewares/validators/ordenValidator.js';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createOrdenRules, create);
router.put('/:id', updateOrdenRules, update);
router.delete('/:id', remove);

export default router;
