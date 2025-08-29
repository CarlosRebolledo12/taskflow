# 🚀 TaskFlow - Gestor de Tareas Fullstack

**TaskFlow** es una aplicación fullstack desarrollada con tecnologías modernas para gestionar tareas diarias. Permite a los usuarios registrarse, iniciar sesión, crear, editar, eliminar y marcar como completadas sus actividades. El sistema incluye autenticación de usuarios, persistencia en MySQL, interfaz amigable y arquitectura escalable.

---

## 📋 Tabla de Contenidos

- [1. Introducción](#1-introducción)
- [2. Objetivos](#2-objetivos)
- [3. Alcance del Proyecto](#3-alcance-del-proyecto)
- [4. Metodología Scrum](#4-metodología-scrum)
- [5. Requisitos del Sistema](#5-requisitos-del-sistema)
- [6. Diseño del Sistema](#6-diseño-del-sistema)
- [7. Arquitectura del Sistema](#7-arquitectura-del-sistema)
- [8. Implementación](#8-implementación)
- [9. Pruebas y Validación](#9-pruebas-y-validación)
- [10. Guía de Implementación en Local](#10-guía-de-implementación-en-local)
- [11. Manual del Proyecto](#11-manual-del-proyecto)
- [12. Referencias Bibliográficas](#12-referencias-bibliográficas)
- [13. Anexos](#13-anexos)

---

## 1. Introducción

TaskFlow es una aplicación web **Fullstack** desarrollada con tecnologías modernas para gestionar tareas diarias, permitiendo a los usuarios crear, editar, eliminar y marcar como completadas sus actividades. El sistema incluye:
- Autenticación de usuarios
- Persistencia de datos en MySQL
- Interfaz amigable y responsive
- Arquitectura escalable

Este proyecto demuestra competencias integrales en desarrollo **Frontend**, **Backend**, gestión de bases de datos, control de versiones con Git/GitHub y metodologías ágiles mediante Scrum.

---

## 2. Objetivos

### 2.1 Objetivo General

Desarrollar una aplicación web fullstack para la gestión de tareas utilizando tecnologías HTML, CSS, JavaScript, Node.js y MySQL, aplicando la metodología Scrum y documentando cada fase del proceso.

### 2.2 Objetivos Específicos

- ✅ Implementar una interfaz de usuario responsiva con HTML, CSS y JavaScript.
- ✅ Desarrollar un backend con Node.js y Express.
- ✅ Diseñar y gestionar una base de datos relacional con MySQL.
- ✅ Aplicar la metodología Scrum durante el desarrollo.
- ✅ Documentar el proyecto técnicamente para presentación profesional.
- ✅ Desplegar el código en GitHub con control de versiones.

---

## 3. Alcance del Proyecto

### Funcionalidades Incluidas

- ✅ Registro e inicio de sesión de usuarios.
- ✅ CRUD de tareas (Crear, Leer, Actualizar, Eliminar).
- ✅ Filtros por estado: Pendiente / En Proceso / Completada.
- ✅ Prioridades: Baja, Media, Alta.
- ✅ Fechas de vencimiento.
- ✅ Interfaz responsive estilo anime/cyberpunk.
- ✅ Persistencia de datos en MySQL.
- ✅ Autenticación con JWT y bcrypt.

### No Incluido

- ❌ Despliegue en la nube (aunque es posible con Railway o Render).
- ❌ Notificaciones push.
- ❌ Roles avanzados (admin/usuario).
- ❌ API REST pública.

---

## 4. Metodología Scrum

### 4.1 Roles

- **Product Owner**: Define funcionalidades y prioridades.
- **Scrum Master**: Coordina reuniones y elimina impedimentos.
- **Development Team**: 1 desarrollador (tú).

### 4.2 Sprints (4 semanas)

| Sprint | Objetivos |
|--------|----------|
| 1 | Diseño UML, estructura de carpetas, base de datos |
| 2 | Frontend: login, registro, dashboard |
| 3 | Backend: autenticación, rutas, conexión a MySQL |
| 4 | Integración, pruebas, documentación |

### 4.3 Artefactos

- Product Backlog
- Sprint Backlog
- Burndown Chart (ver Anexos)
- Daily Standups (registro en GitHub Issues)

---

## 5. Requisitos del Sistema

### 5.1 Requisitos Funcionales

| ID | Requisito |
|----|----------|
| RF-01 | El usuario puede registrarse con nombre, correo y contraseña. |
| RF-02 | El usuario puede iniciar sesión con credenciales válidas. |
| RF-03 | El usuario puede crear una tarea con título, descripción, fecha y prioridad. |
| RF-04 | El usuario puede ver sus tareas en tiempo real. |
| RF-05 | El usuario puede cambiar el estado de una tarea (Pendiente → En Proceso → Completada). |
| RF-06 | El usuario puede eliminar una tarea. |
| RF-07 | El usuario puede cerrar sesión. |

### 5.2 Requisitos No Funcionales

| ID | Requisito |
|----|----------|
| RNF-01 | La interfaz debe ser responsive (móvil y escritorio). |
| RNF-02 | Las contraseñas deben almacenarse encriptadas (bcrypt). |
| RNF-03 | El sistema debe responder en menos de 2 segundos. |
| RNF-04 | Debe soportar al menos 100 usuarios concurrentes (en producción). |

---

## 6. Diseño del Sistema

### 6.1 Casos de Uso

- Registrar usuario
- Iniciar sesión
- Crear tarea
- Ver tareas
- Actualizar tarea
- Eliminar tarea
- Cerrar sesión

### 6.2 Diagrama de Base de Datos

```sql
-- Tabla users
id, name, email, password, created_at

-- Tabla tasks
id, user_id, title, description, due_date, priority, status, created_at

### 6.3 Diagrama de Clases (UML)

+----------------+
|     User       |
+----------------+
| - id: int      |
| - name: string |
| - email: string|
| - password: string |
+----------------+
| + login()      |
| + register()   |
+----------------+

+----------------+
|     Task       |
+----------------+
| - id: int      |
| - title: string|
| - description: string |
| - status: string |
| - priority: string |
+----------------+
| + create()     |
| + update()     |
| + delete()     |
+----------------+

### 6.4 Diagrama de Componentes

Frontend (HTML/CSS/JS)
       ↓
Backend (Node.js + Express)
       ↓
Base de Datos (MySQL)

### 6.5 Diagrama de Secuencia (Login)

1. Usuario → Frontend: Ingresa correo y contraseña
2. Frontend → Backend: POST /api/auth/login
3. Backend → Base de Datos: Verifica credenciales
4. Base de Datos → Backend: Respuesta
5. Backend → Frontend: Token JWT
6. Frontend → Usuario: Redirige al dashboard

### 7. Arquitectura del Sistema

- Frontend: HTML, CSS, JavaScript (Vanilla JS)
- Backend: Node.js + Express.js
- Base de Datos: MySQL
- Autenticación: bcrypt + JWT
- Comunicación: REST API
- Estructura de Carpetas:

taskflow/
├── frontend/
├── backend/
├── database/
└── package.json

### 8. Implementación

8.1 Frontend

- frontend/index.html: Interfaz de login y dashboard
- frontend/style.css: Estilo anime/cyberpunk
- frontend/script.js: Lógica de tareas y autenticación

8.2 Backend

- backend/server.js: Servidor Express
- backend/routes/auth.js: Rutas de autenticación
- backend/routes/tasks.js: Rutas de tareas
- backend/models/user.js: Modelo de usuario
- backend/models/task.js: Modelo de tareas
- backend/database/connection.js: Conexión a MySQL

8.3 Base de Datos

- database/schema.sql: Creación de tablas

CREATE DATABASE IF NOT EXISTS taskflow_db;
USE taskflow_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  due_date DATE NULL,
  priority VARCHAR(10) DEFAULT 'media',
  status VARCHAR(20) DEFAULT 'pendiente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

### 9. Pruebas y Validación

![Pruebas](/img/pruebas.png)

### 10. Guía de Implementación en Local

Paso 1: Instalar requisitos

npm install express mysql2 bcrypt jsonwebtoken

Paso 2: Iniciar MySQL y ejecutar el esquema

mysql -u root -p < database/schema.sql

Paso 3: Iniciar el servidor

node backend/server.js

Paso 4: Acceder a la app

http://localhost:3000

### 11. Manual del Proyecto

Instalación

1. Clona el repositorio.
2. Instala Node.js y MySQL.
3. Ejecuta schema.sql.
4. Inicia server.js.

Uso

- Abre http://localhost:3000
- Regístrate o inicia sesión.
- Gestiona tus tareas.

### 12. Referencias Bibliográficas

- Node.js Documentation. (2025). https://nodejs.org
- MySQL. (2025). https://dev.mysql.com
- Express.js. (2025). https://expressjs.com
- Schwaber, K., & Sutherland, J. (2020). The Scrum Guide.
- MDN Web Docs. (2025). https://developer.mozilla.org

# 13. Anexos

A. Capturas de Pantalla

![Login](/img/login.png)

![Dashboard](/img/dashboard.png)

![Dashboard](/img/dashboard1.png)

B. Comandos Git/GitHub

git init
git add .
git commit -m "Versión inicial"
git remote add origin https://github.com/tuusuario/taskflow.git
git push -u origin main

C. Estructura de Carpetas

taskflow/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── models/
│   └── database/
├── database/
│   └── schema.sql
├── img/
│   └── dashboard.png
│   └── dashboard1.png
│   └── login.png
│   └── pruebas.png
├── .gitignore
├── package.json
└── README.md

D. Código SQL

Ver sección 8.3.

🛠️ Pasos Finales (Para Garantizar Funcionalidad)

1. Instalar dependencias:
npm install express mysql2 bcrypt jsonwebtoken

2. Iniciar MySQL y ejecutar:
mysql -u root -p < database/schema.sql

3. Correr el backend:
node backend/server.js

4. Abrir en el navegador:
http://localhost:3000

🚀 Despliegue en Producción (Opcional pero Recomendado)

- Render.com: Frontend estático + Backend Node.js
- Railway.app: Backend + MySQL
- Vercel + Railway: Separar frontend y backend

📎 Nota Final

Este proyecto cumple con:

✅ Código funcional y modular
✅ Documentación profesional
✅ Metodología Scrum
✅ Artefactos UML y diseño
✅ Guías claras de implementación
✅ Presentación ejecutiva