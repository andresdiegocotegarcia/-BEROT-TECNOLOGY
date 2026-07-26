import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// Global Middleware
app.use(cors());
app.use(express.json({ limit: '200mb' }));

// Serve uploaded photos as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api', routes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'BEROT TECNOLOGY API funcionando correctamente' });
});

// Centralized Error Handler (must be last middleware)
app.use(errorHandler);

// Start server with Sequelize connection
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conectado a PostgreSQL via Sequelize - Base de datos BEROT TECNOLOGY');
    app.listen(PORT, () => {
      console.log(`🚀 BEROT TECNOLOGY API corriendo en http://localhost:${PORT}`);
      console.log(`📋 Endpoints disponibles:`);
      console.log(`   POST /api/auth/login`);
      console.log(`   POST /api/auth/register`);
      console.log(`   POST /api/upload`);
      console.log(`   GET  /api/clientes`);
      console.log(`   POST /api/clientes`);
      console.log(`   PUT  /api/clientes/:id`);
      console.log(`   DELETE /api/clientes/:id`);
      console.log(`   GET  /api/ordenes`);
      console.log(`   GET  /api/ordenes/:id`);
      console.log(`   POST /api/ordenes`);
      console.log(`   PUT  /api/ordenes/:id`);
      console.log(`   DELETE /api/ordenes/:id`);
      console.log(`   GET  /api/health`);
      console.log(`   GET  /uploads/:filename (static)`);
    });
  })
  .catch(err => {
    console.error('❌ Error conectando a PostgreSQL:', err.message);
    process.exit(1);
  });
