'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('usuarios', [
      { nombre: 'Admin BEROT', email: 'admin@berot.com', password: 'admin123', rol: 'administrador', created_at: new Date() },
      { nombre: 'Pedro Técnico', email: 'pedro@berot.com', password: 'tecnico123', rol: 'tecnico', created_at: new Date() }
    ]);

    await queryInterface.bulkInsert('clientes', [
      { nombre: 'Juan Pérez', cedula: '1098765432', telefono: '3001234567', email: 'juan@email.com', created_at: new Date() },
      { nombre: 'María López', cedula: '1087654321', telefono: '3109876543', email: 'maria@email.com', created_at: new Date() },
      { nombre: 'Carlos García', cedula: '1076543210', telefono: '3205551234', email: 'carlos@email.com', created_at: new Date() }
    ]);

    await queryInterface.bulkInsert('ordenes', [
      { numero_orden: 'ORD-001', cliente_id: 1, cliente_nombre: 'Juan Pérez', marca: 'Samsung', modelo: 'Galaxy S21', color: 'Negro', imei: '356938035643809', condiciones_ingreso: 'Pantalla rota en esquina inferior derecha', accesorios: 'Cargador original, forro silicona', motivo_reparacion: 'Cambio de pantalla', contrasena_equipo: '1234', fecha_recepcion: '2026-07-01', estado: 'en_reparacion', diagnostico: 'Pantalla LCD dañada', repuestos: 'Pantalla LCD Samsung S21 original', procedimiento: 'Desmontaje e instalación de módulo nuevo', costo: 180000, fotos_recepcion: '{}', fotos_entrega: '{}', created_at: new Date(), updated_at: new Date() },
      { numero_orden: 'ORD-002', cliente_id: 2, cliente_nombre: 'María López', marca: 'iPhone', modelo: '13 Pro', color: 'Azul', imei: '490154203237518', condiciones_ingreso: 'Equipo no enciende', accesorios: 'Ninguno', motivo_reparacion: 'No enciende', contrasena_equipo: '', fecha_recepcion: '2026-07-03', estado: 'listo', diagnostico: 'Placa base con corto en chip de carga', repuestos: 'Chip IC de carga iPhone 13 Pro', procedimiento: 'Microsoldadura del chip de carga', costo: 120000, fotos_recepcion: '{}', fotos_entrega: '{}', created_at: new Date(), updated_at: new Date() },
      { numero_orden: 'ORD-003', cliente_id: 3, cliente_nombre: 'Carlos García', marca: 'Xiaomi', modelo: 'Redmi Note 12', color: 'Verde', imei: '861536030196001', condiciones_ingreso: 'Batería se descarga rápido', accesorios: 'Cargador genérico', motivo_reparacion: 'Cambio de batería', contrasena_equipo: 'patron', fecha_recepcion: '2026-06-28', estado: 'entregado', diagnostico: 'Batería hinchada', repuestos: 'Batería original Xiaomi Redmi Note 12', procedimiento: 'Retiro e instalación de batería nueva', costo: 65000, fecha_entrega: '2026-07-02', condiciones_entrega: 'Equipo funcionando correctamente', fotos_recepcion: '{}', fotos_entrega: '{}', created_at: new Date(), updated_at: new Date() }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('ordenes', null, {});
    await queryInterface.bulkDelete('clientes', null, {});
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
