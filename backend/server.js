// backend/server.js

const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());

// Servir archivos estáticos (frontend)
app.use(express.static(path.join(__dirname, '../frontend')));

// === RUTAS API ===
// Importantes: Usar rutas explícitas y con barra final si es necesario

app.use('/api/auth', authRoutes);           // ✅ Correcto
app.use('/api/tasks/', taskRoutes);         // ✅ Con barra final para evitar parsing erróneo

// === SPA: Sirve index.html para rutas no-API ===
app.get('/api/*', (req, res) => {
  res.status(404).json({ message: 'Ruta API no encontrada' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});