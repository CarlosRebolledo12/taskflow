// backend/database/connection.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Cambia si tienes contraseña
  database: 'taskflow_db'
});

connection.connect(err => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err);
    return;
  }
  console.log('✅ Conexión a MySQL exitosa');
});

module.exports = connection;