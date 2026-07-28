// Importar Router de Express
import { Router } from 'express';
// Importar el controlador de subida de imágenes
import { upload } from '../controllers/uploadController.js';

// Crear el enrutador para subida de archivos
const router = Router();

// POST /api/upload - Subir imágenes en base64
router.post('/', upload);

export default router;
