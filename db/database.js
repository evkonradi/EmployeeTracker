const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'emp_tracker',
  password: 'apple16_23'
});

module.exports = connection;