const pg = require('pg');

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/template1',
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
};
