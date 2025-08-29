// backend/database/connection.js

const mysql = require('mysql2');

const connection = mysql.createConnection({
  uri: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Railway requiere SSL
});

connection.connect(err => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err);
    return;
  }
  console.log('✅ Conexión a MySQL en Railway exitosa');
});

module.exports = connection;