import sequelize from '../config/database.js';
import Usuario from './Usuario.js';
import Cliente from './Cliente.js';
import Orden from './Orden.js';

// Associations
Cliente.hasMany(Orden, { foreignKey: 'cliente_id', as: 'ordenes', onDelete: 'SET NULL' });
Orden.belongsTo(Cliente, { foreignKey: 'cliente_id', as: 'cliente' });

export { sequelize, Usuario, Cliente, Orden };
