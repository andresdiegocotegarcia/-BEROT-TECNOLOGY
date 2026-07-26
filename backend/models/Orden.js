import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Orden = sequelize.define('Orden', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  numero_orden: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'clientes', key: 'id' }
  },
  cliente_nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  marca: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  modelo: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  color: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  imei: {
    type: DataTypes.STRING(15),
    allowNull: true
  },
  condiciones_ingreso: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  accesorios: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  motivo_reparacion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  contrasena_equipo: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  fecha_recepcion: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  estado: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'en_espera',
    validate: {
      isIn: [['en_espera', 'en_reparacion', 'listo', 'entregado']]
    }
  },
  diagnostico: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  repuestos: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  procedimiento: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  costo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  fecha_entrega: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  condiciones_entrega: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fotos_recepcion: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: []
  },
  fotos_entrega: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: []
  }
}, {
  tableName: 'ordenes',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Orden;
