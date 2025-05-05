// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',      // ← your MySQL root password
  database: 'room_manager',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
