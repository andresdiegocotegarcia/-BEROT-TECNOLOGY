// Importar tipos de datos de Sequelize
import { DataTypes } from 'sequelize';
// Importar la conexión a la base de datos
import sequelize from '../config/database.js';

// Definir el modelo Cliente que mapea a la tabla "clientes"
const Cliente = sequelize.define('Cliente', {
  // ID autoincremental
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Nombre del cliente (obligatorio)
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  // Cédula única (obligatoria) - identifica al cliente
  cedula: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  // Teléfono de contacto (obligatorio)
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  // Email (opcional)
  email: {
    type: DataTypes.STRING(150),
    allowNull: true
  }
}, {
  tableName: 'clientes',       // Nombre exacto de la tabla en PostgreSQL
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

export default Cliente;
