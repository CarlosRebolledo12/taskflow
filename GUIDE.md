# 1. Clonar repositorio
git clone https://github.com/tuusuario/taskflow.git

# 2. Instalar dependencias
cd taskflow/backend
npm init -y
npm install express mysql2 bcrypt

# 3. Crear base de datos
mysql -u root -p < ../database/schema.sql

# 4. Iniciar servidor
node server.js

# 5. Acceder a http://localhost:3000