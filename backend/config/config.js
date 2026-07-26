module.exports = {
  development: {
    username: 'postgres',
    password: 'admin',
    database: 'berot_db',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'admin',
    database: 'berot_db_test',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_NAME || 'berot_db',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres'
  }
};
