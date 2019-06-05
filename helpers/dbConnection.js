const MYSQL = require('mysql2');

const CONN = MYSQL.createConnection({
  host: 'localhost',
  user: 'travelsAdmin',
  password: 'travels1234',
  database: 'My2Travels'
});

module.exports = CONN;