require("dotenv").config(); 

const knex = require("knex");

const connection = knex({
  client: 'mysql2',
  connection: {
    host: 'database-canil.cpqyoc46ahv7.us-east-2.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: 'canil123',
    database: 'api_canil',
  },
});

module.exports = connection;
