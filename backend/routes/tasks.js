// backend/routes/tasks.js
const express = require('express');
const jwt = require('jsonwebtoken');
const { createTask, getTasksByUserId, toggleTask, deleteTask } = require('../models/task');

const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Acceso denegado' });

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;
    next();
  });
};

router.post('/', authenticate, (req, res) => {
  const { title, description } = req.body;
  createTask(req.user.id, title, description, (err) => {
    if (err) return res.status(500).json({ message: 'Error al crear tarea' });
    res.status(201).json({ message: 'Tarea creada' });
  });
});

router.get('/', authenticate, (req, res) => {
  getTasksByUserId(req.user.id, (err, tasks) => {
    if (err) return res.status(500).json({ message: 'Error al obtener tareas' });
    res.json(tasks);
  });
});

router.put('/:id/toggle', authenticate, (req, res) => {
  toggleTask(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: 'Error al actualizar tarea' });
    res.json({ message: 'Tarea actualizada' });
  });
});

router.delete('/:id', authenticate, (req, res) => {
  deleteTask(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: 'Error al eliminar tarea' });
    res.json({ message: 'Tarea eliminada' });
  });
});

module.exports = router;