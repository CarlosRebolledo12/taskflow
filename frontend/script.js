function showRegister() {
  document.getElementById('login-container').classList.add('hidden');
  document.getElementById('register-container').classList.remove('hidden');
}

function showLogin() {
  document.getElementById('register-container').classList.add('hidden');
  document.getElementById('login-container').classList.remove('hidden');
}

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('name', data.name);
    loadTasks();
    showTasks();
  } else {
    alert(data.message);
  }
}

async function register() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  const res = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  if (res.ok) {
    alert('Registro exitoso');
    showLogin();
  } else {
    alert(data.message);
  }
}

function showTasks() {
  document.getElementById('login-container').classList.add('hidden');
  document.getElementById('register-container').classList.add('hidden');
  document.getElementById('tasks-container').classList.remove('hidden');
  document.getElementById('userName').textContent = localStorage.getItem('name');
}

async function loadTasks() {
  const token = localStorage.getItem('token');
  const res = await fetch('/api/tasks', {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (res.ok) {
    const tasks = await res.json();
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    tasks.forEach(t => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div>
          <strong>${t.title}</strong>
          <p>${t.description}</p>
          <small>Estado: ${t.completed ? '✔️ Completada' : '⏳ Pendiente'}</small>
        </div>
        <button onclick="toggleTask(${t.id})">${t.completed ? 'Desmarcar' : 'Completar'}</button>
        <button onclick="deleteTask(${t.id})">Eliminar</button>
      `;
      list.appendChild(li);
    });
  }
}

async function createTask() {
  const title = document.getElementById('taskTitle').value;
  const desc = document.getElementById('taskDesc').value;
  const token = localStorage.getItem('token');

  const res = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ title, description: desc })
  });

  if (res.ok) {
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDesc').value = '';
    loadTasks();
  } else {
    alert('Error al crear tarea');
  }
}

async function toggleTask(id) {
  const token = localStorage.getItem('token');
  const res = await fetch(`/api/tasks/${id}/toggle`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (res.ok) loadTasks();
}

async function deleteTask(id) {
  const token = localStorage.getItem('token');
  const res = await fetch(`/api/tasks/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (res.ok) loadTasks();
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  document.getElementById('tasks-container').classList.add('hidden');
  document.getElementById('login-container').classList.remove('hidden');
}