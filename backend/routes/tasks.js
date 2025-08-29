// backend/routes/tasks.js
const express = require('express');
const jwt = require('jsonwebtoken');
const { createTask, getTasksByUserId, updateTaskStatus, deleteTask } = require('../models/task');

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

// POST /api/tasks
router.post('/', authenticate, (req, res) => {
  const { title, description, due_date, priority, status } = req.body;

  // ✅ Validación estricta
  if (!title || !status) {
    return res.status(400).json({ 
      message: 'Título y estado son obligatorios' 
    });
  }

  // ✅ Valores por defecto
  const safePriority = ['baja', 'media', 'alta'].includes(priority) ? priority : 'media';
  const safeStatus = ['pendiente', 'en_proceso', 'completada'].includes(status) ? status : 'pendiente';

  console.log('Datos recibidos:', { title, description, due_date, priority: safePriority, status: safeStatus });

  createTask(
    req.user.id,
    title,
    description,
    due_date,
    safePriority,
    safeStatus,
    (err, result) => {
      if (err) {
        console.error('Error al crear tarea:', err);
        return res.status(500).json({ 
          message: 'Error interno del servidor' 
        });
      }
      res.status(201).json({ message: 'Tarea creada' });
    }
  );
});

// GET /api/tasks
router.get('/', authenticate, (req, res) => {
  getTasksByUserId(req.user.id, (err, tasks) => {
    if (err) {
      console.error('Error al obtener tareas:', err);
      return res.status(500).json({ message: 'Error al obtener tareas' });
    }
    res.json(tasks);
  });
});

// PUT /api/tasks/:id/status
router.put('/:id/status', authenticate, (req, res) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ message: 'Estado es requerido' });
  }

  updateTaskStatus(req.params.id, status, (err) => {
    if (err) return res.status(500).json({ message: 'Error al actualizar estado' });
    res.json({ message: 'Estado actualizado' });
  });
});

// DELETE /api/tasks/:id
router.delete('/:id', authenticate, (req, res) => {
  deleteTask(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: 'Error al eliminar tarea' });
    res.json({ message: 'Tarea eliminada' });
  });
});

module.exports = router;