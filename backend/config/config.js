module.exports = {
  development: {
    username: 'postgres',
    password: 'admin',
    database: 'celufix_db',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'admin',
    database: 'celufix_db_test',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    username: process.env.DB_USER || 'berot',
    password: process.env.DB_PASSWORD || 'berot123',
    database: process.env.DB_NAME || 'berot_db',
    host: process.env.DB_HOST || 'db',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres'
  }
};
