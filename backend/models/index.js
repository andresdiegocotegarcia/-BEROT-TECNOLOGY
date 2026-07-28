// Importar la instancia de conexión a la base de datos
import sequelize from '../config/database.js';
// Importar los tres modelos de la aplicación
import Usuario from './Usuario.js';
import Cliente from './Cliente.js';
import Orden from './Orden.js';

// Definir las relaciones entre tablas:
// Un cliente puede tener muchas órdenes (1:N)
Cliente.hasMany(Orden, { foreignKey: 'cliente_id', as: 'ordenes', onDelete: 'SET NULL' });
// Cada orden pertenece a un cliente
Orden.belongsTo(Cliente, { foreignKey: 'cliente_id', as: 'cliente' });

// Exportar todo para usar en el resto de la aplicación
export { sequelize, Usuario, Cliente, Orden };
