// backend/models/task.js
const connection = require('../database/connection');

const createTask = (userId, title, description, dueDate, priority, status, callback) => {
  const sql = `
    INSERT INTO tasks (user_id, title, description, due_date, priority, status) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  
  const values = [
    userId,
    title,
    description || null,
    dueDate || null,
    priority || 'media', // Valor por defecto
    status || 'pendiente'
  ];

  console.log('Insertando tarea:', values); // 👈 Depuración

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error SQL al crear tarea:', err);
    }
    callback(err, result);
  });
};

const getTasksByUserId = (userId, callback) => {
  const sql = 'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC';
  connection.query(sql, [userId], callback);
};

const updateTaskStatus = (id, status, callback) => {
  const sql = 'UPDATE tasks SET status = ? WHERE id = ?';
  connection.query(sql, [status, id], callback);
};

const deleteTask = (id, callback) => {
  const sql = 'DELETE FROM tasks WHERE id = ?';
  connection.query(sql, [id], callback);
};

module.exports = { createTask, getTasksByUserId, updateTaskStatus, deleteTask };