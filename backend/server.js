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

app.use(cors());
app.use(express.json({ limit: '200mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', routes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'BEROT TECNOLOGY API funcionando correctamente' });
});

app.use(errorHandler);

sequelize.authenticate()
  .then(() => {
    console.log('✅ Conectado a PostgreSQL via Sequelize - Base de datos BEROT TECNOLOGY');
    app.listen(PORT, () => {
      console.log(`🚀 BEROT TECNOLOGY API corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error conectando a PostgreSQL:', err.message);
    process.exit(1);
  });
