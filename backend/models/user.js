const connection = require('../database/connection');

const createUser = (name, email, hashedPassword, callback) => {
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  connection.query(sql, [name, email, hashedPassword], callback);
};

const findUserByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  connection.query(sql, [email], callback);
};

module.exports = { createUser, findUserByEmail };