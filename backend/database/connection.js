const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Cambia si tienes contraseña
  database: 'taskflow_db'
});

connection.connect(err => {
  if (err) throw err;
  console.log('✅ Conexión a MySQL exitosa');
});

module.exports = connection;