// Importar el framework Express para crear el servidor HTTP
import express from 'express';
// Importar CORS para permitir peticiones desde el frontend (otro puerto)
import cors from 'cors';
// Importar path para manejar rutas de archivos del sistema
import path from 'path';
// Importar utilidad para obtener la ruta del archivo actual en ES modules
import { fileURLToPath } from 'url';
// Importar dotenv para leer variables de entorno desde el archivo .env
import dotenv from 'dotenv';
// Importar la instancia de Sequelize (conexión a la base de datos)
import { sequelize } from './models/index.js';
// Importar todas las rutas de la API (auth, clientes, ordenes, upload)
import routes from './routes/index.js';
// Importar el middleware que maneja errores de forma centralizada
import { errorHandler } from './middlewares/errorHandler.js';

// Cargar las variables de entorno del archivo .env
dotenv.config();

// Obtener la ruta del archivo actual (necesario en ES modules)
const __filename = fileURLToPath(import.meta.url);
// Obtener la carpeta donde está este archivo
const __dirname = path.dirname(__filename);

// Crear la aplicación Express
const app = express();
// Definir el puerto del servidor (variable de entorno o 4000 por defecto)
const PORT = process.env.PORT || 4000;

// Habilitar CORS para que el frontend pueda comunicarse con el backend
app.use(cors());
// Permitir recibir datos JSON en las peticiones (límite 200mb para fotos en base64)
app.use(express.json({ limit: '200mb' }));
// Servir la carpeta uploads como archivos estáticos (para mostrar las fotos)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Montar todas las rutas de la API bajo el prefijo /api
app.use('/api', routes);

// Ruta de verificación de salud del servidor
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'BEROT TECNOLOGY API funcionando correctamente' });
});

// Registrar el middleware de manejo de errores (debe ser el último)
app.use(errorHandler);

// Conectar a la base de datos PostgreSQL usando Sequelize
sequelize.authenticate()
  .then(() => {
    // Si la conexión fue exitosa, iniciar el servidor
    console.log('✅ Conectado a PostgreSQL via Sequelize - Base de datos BEROT TECNOLOGY');
    app.listen(PORT, () => {
      console.log(`🚀 BEROT TECNOLOGY API corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    // Si falla la conexión a la base de datos, mostrar error y terminar
    console.error('❌ Error conectando a PostgreSQL:', err.message);
    process.exit(1);
  });
