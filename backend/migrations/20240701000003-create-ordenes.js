'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ordenes', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      numero_orden: { type: Sequelize.STRING(20), allowNull: false, unique: true },
      cliente_id: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'clientes', key: 'id' }, onDelete: 'SET NULL' },
      cliente_nombre: { type: Sequelize.STRING(100), allowNull: false },
      marca: { type: Sequelize.STRING(50), allowNull: false },
      modelo: { type: Sequelize.STRING(50), allowNull: false },
      color: { type: Sequelize.STRING(30), allowNull: true },
      imei: { type: Sequelize.STRING(15), allowNull: true },
      condiciones_ingreso: { type: Sequelize.TEXT, allowNull: false },
      accesorios: { type: Sequelize.TEXT, allowNull: true },
      motivo_reparacion: { type: Sequelize.TEXT, allowNull: false },
      contrasena_equipo: { type: Sequelize.STRING(50), allowNull: true },
      fecha_recepcion: { type: Sequelize.DATEONLY, allowNull: false, defaultValue: Sequelize.literal('CURRENT_DATE') },
      estado: { type: Sequelize.STRING(20), allowNull: false, defaultValue: 'en_espera' },
      diagnostico: { type: Sequelize.TEXT, allowNull: true },
      repuestos: { type: Sequelize.TEXT, allowNull: true },
      procedimiento: { type: Sequelize.TEXT, allowNull: true },
      costo: { type: Sequelize.DECIMAL(10, 2), allowNull: true },
      fecha_entrega: { type: Sequelize.DATEONLY, allowNull: true },
      condiciones_entrega: { type: Sequelize.TEXT, allowNull: true },
      fotos_recepcion: { type: Sequelize.ARRAY(Sequelize.TEXT), defaultValue: [] },
      fotos_entrega: { type: Sequelize.ARRAY(Sequelize.TEXT), defaultValue: [] },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });

    await queryInterface.addIndex('ordenes', ['estado']);
    await queryInterface.addIndex('ordenes', ['cliente_id']);
    await queryInterface.addIndex('ordenes', ['numero_orden']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('ordenes');
  }
};
