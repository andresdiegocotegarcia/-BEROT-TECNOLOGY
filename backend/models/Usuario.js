// Importar tipos de datos de Sequelize
import { DataTypes } from 'sequelize';
// Importar la conexión a la base de datos
import sequelize from '../config/database.js';

// Definir el modelo Usuario que mapea a la tabla "usuarios"
const Usuario = sequelize.define('Usuario', {
  // ID autoincremental como llave primaria
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Nombre del usuario (obligatorio)
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  // Email único (obligatorio) - se usa para login
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true
  },
  // Contraseña del usuario (obligatoria)
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  // Rol: puede ser "administrador" o "tecnico"
  rol: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'tecnico',
    validate: {
      isIn: [['administrador', 'tecnico']]
    }
  }
}, {
  tableName: 'usuarios',       // Nombre exacto de la tabla en PostgreSQL
  timestamps: true,            // Habilitar timestamps
  createdAt: 'created_at',    // Nombre de la columna de creación
  updatedAt: false             // No hay columna de actualización en esta tabla
});

export default Usuario;
