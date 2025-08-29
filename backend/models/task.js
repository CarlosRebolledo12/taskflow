const connection = require('../database/connection');

const createTask = (userId, title, description, callback) => {
  const sql = 'INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)';
  connection.query(sql, [userId, title, description], callback);
};

const getTasksByUserId = (userId, callback) => {
  const sql = 'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC';
  connection.query(sql, [userId], callback);
};

const toggleTask = (id, callback) => {
  const sql = 'UPDATE tasks SET completed = NOT completed WHERE id = ?';
  connection.query(sql, [id], callback);
};

const deleteTask = (id, callback) => {
  const sql = 'DELETE FROM tasks WHERE id = ?';
  connection.query(sql, [id], callback);
};

module.exports = { createTask, getTasksByUserId, toggleTask, deleteTask };