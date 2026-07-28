// Importar tipos de datos de Sequelize
import { DataTypes } from 'sequelize';
// Importar la conexión a la base de datos
import sequelize from '../config/database.js';

// Definir el modelo Orden que mapea a la tabla "ordenes"
const Orden = sequelize.define('Orden', {
  // ID autoincremental
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Número de orden único (ej: ORD-001) - se genera automáticamente
  numero_orden: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  // ID del cliente asociado (llave foránea a la tabla clientes)
  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'clientes', key: 'id' }
  },
  // Nombre del cliente (se guarda por si se elimina el cliente)
  cliente_nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  // Marca del equipo (ej: Samsung, iPhone, Xiaomi)
  marca: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  // Modelo del equipo (ej: Galaxy S21, 13 Pro)
  modelo: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  // Color del equipo (opcional)
  color: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  // IMEI del equipo - 15 dígitos (opcional)
  imei: {
    type: DataTypes.STRING(15),
    allowNull: true
  },
  // Descripción de las condiciones en que se recibe el equipo
  condiciones_ingreso: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  // Accesorios que entrega el cliente (opcional)
  accesorios: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Por qué se trae a reparar
  motivo_reparacion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  // Contraseña o patrón del equipo (opcional)
  contrasena_equipo: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  // Fecha en que se recibió el equipo
  fecha_recepcion: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  // Estado actual de la orden (flujo de trabajo)
  estado: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'en_espera',
    validate: {
      isIn: [['en_espera', 'en_reparacion', 'listo', 'entregado']]
    }
  },
  // Diagnóstico del técnico (se llena después)
  diagnostico: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Repuestos utilizados (se llena después)
  repuestos: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Procedimiento realizado (se llena después)
  procedimiento: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Costo de la reparación
  costo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  // Fecha de entrega al cliente
  fecha_entrega: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  // Condiciones en que se entrega el equipo
  condiciones_entrega: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Array de rutas de fotos tomadas al recibir el equipo
  fotos_recepcion: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: []
  },
  // Array de rutas de fotos tomadas al entregar el equipo
  fotos_entrega: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: []
  }
}, {
  tableName: 'ordenes',        // Nombre exacto de la tabla en PostgreSQL
  timestamps: true,
  createdAt: 'created_at',    // Columna de fecha de creación
  updatedAt: 'updated_at'     // Columna de fecha de última actualización
});

export default Orden;
