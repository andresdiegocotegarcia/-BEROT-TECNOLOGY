// Importar módulo de sistema de archivos para leer/escribir archivos
import fs from 'fs';
// Importar módulo para manejar rutas de archivos
import path from 'path';
// Importar módulo para generar identificadores únicos (UUID)
import crypto from 'crypto';
// Importar utilidad para obtener la ruta del archivo en ES modules
import { fileURLToPath } from 'url';
// Importar clase de error personalizada
import { AppError } from '../middlewares/errorHandler.js';

// Obtener la ruta de la carpeta actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Definir la carpeta donde se guardarán las fotos (backend/uploads/)
const uploadsDir = path.join(__dirname, '..', 'uploads');

// Crear la carpeta uploads si no existe
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Controlador para subir imágenes en formato base64
export const upload = async (req, res, next) => {
  try {
    // Obtener el array de imágenes del cuerpo de la petición
    const { images } = req.body;

    // Validar que se enviaron imágenes
    if (!images || !Array.isArray(images) || images.length === 0) {
      throw new AppError('No se proporcionaron imágenes', 400);
    }

    // Array para guardar las rutas de las imágenes procesadas
    const savedPaths = [];

    // Procesar cada imagen del array
    for (const base64Image of images) {
      // Extraer el tipo de imagen (png, jpg, etc.) y los datos base64
      const matches = base64Image.match(/^data:image\/(png|jpg|jpeg|gif|webp);base64,(.+)$/);
      // Si el formato no es válido, saltar esta imagen
      if (!matches) continue;

      // Determinar la extensión del archivo
      const extension = matches[1] === 'jpeg' ? 'jpg' : matches[1];
      // Obtener los datos puros de la imagen
      const imageData = matches[2];
      // Convertir de base64 a bytes (Buffer)
      const buffer = Buffer.from(imageData, 'base64');

      // Generar un nombre único para el archivo (UUID)
      const filename = `${crypto.randomUUID()}.${extension}`;
      // Construir la ruta completa donde se guardará
      const filepath = path.join(uploadsDir, filename);

      // Guardar el archivo en el disco
      fs.writeFileSync(filepath, buffer);
      // Agregar la URL de acceso al array de respuesta
      savedPaths.push(`/uploads/${filename}`);
    }

    // Responder con las rutas de las imágenes guardadas
    res.json({ paths: savedPaths });
  } catch (error) {
    next(error);
  }
};
