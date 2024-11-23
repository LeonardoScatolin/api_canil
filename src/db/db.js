const knex = require("knex");
const dotenv = require("dotenv").config(); 

const connection = knex({
  client: 'mysql2',
  connection: {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
});

module.exports = connection;
