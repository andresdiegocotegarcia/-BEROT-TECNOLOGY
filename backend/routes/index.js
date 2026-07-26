import { Router } from 'express';
import authRoutes from './authRoutes.js';
import clienteRoutes from './clienteRoutes.js';
import ordenRoutes from './ordenRoutes.js';
import uploadRoutes from './uploadRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/clientes', clienteRoutes);
router.use('/ordenes', ordenRoutes);
router.use('/upload', uploadRoutes);

export default router;
