// Importar Sequelize (ORM para conectar con PostgreSQL)
import { Sequelize } from 'sequelize';
// Importar dotenv para leer variables de entorno
import dotenv from 'dotenv';

// Cargar variables del archivo .env
dotenv.config();

// Variable para la instancia de conexión
let sequelize;

// Si existe DATABASE_URL (entorno Docker/producción), usarla directamente
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
  });
} else {
  // Si no, usar variables individuales (desarrollo local)
  sequelize = new Sequelize(
    process.env.DB_NAME || 'celufix_db',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'admin',
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      dialect: 'postgres',
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
    }
  );
}

// Exportar la instancia de conexión para usarla en los modelos
export default sequelize;
