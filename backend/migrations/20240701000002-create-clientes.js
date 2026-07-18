'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clientes', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      nombre: { type: Sequelize.STRING(100), allowNull: false },
      cedula: { type: Sequelize.STRING(20), allowNull: false, unique: true },
      telefono: { type: Sequelize.STRING(20), allowNull: false },
      email: { type: Sequelize.STRING(150), allowNull: true },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('clientes');
  }
};
