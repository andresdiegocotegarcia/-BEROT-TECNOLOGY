// Importar Router de Express para crear un enrutador
import { Router } from 'express';
// Importar las rutas de cada módulo
import authRoutes from './authRoutes.js';
import clienteRoutes from './clienteRoutes.js';
import ordenRoutes from './ordenRoutes.js';
import uploadRoutes from './uploadRoutes.js';

// Crear el enrutador principal
const router = Router();

// Montar cada grupo de rutas bajo su prefijo correspondiente
router.use('/auth', authRoutes);         // /api/auth/login, /api/auth/register
router.use('/clientes', clienteRoutes);  // /api/clientes
router.use('/ordenes', ordenRoutes);     // /api/ordenes
router.use('/upload', uploadRoutes);     // /api/upload

// Exportar el enrutador para usarlo en server.js
export default router;
