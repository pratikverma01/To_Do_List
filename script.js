<<<<<<< HEAD
const apiKey = "41ff6483e2f9e92400f27bc2588e0ba9"; // Replace with your GNews API key
const url = `https://gnews.io/api/v4/top-headlines?lang=en&max=10&token=${apiKey}`;

async function fetchNews() {
  const container = document.getElementById("news-container");
  container.innerHTML = "Loading...";

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("API URL:", url);
    console.log("Full response:", data);

    if (!data.articles || data.articles.length === 0) {
      container.innerHTML = "<p>No news found.</p>";
      return;
    }

    container.innerHTML = ""; // Clear loading

    data.articles.forEach(article => {
      const div = document.createElement("div");
      div.className = "article";
      div.innerHTML = `
        <img src="${article.image || 'https://via.placeholder.com/300'}" />
        <h2>${article.title}</h2>
        <p>${article.description || "No description available"}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      `;
      container.appendChild(div);
    });

  } catch (err) {
    container.innerHTML = `<p style="color:red;">Failed to fetch news: ${err.message}</p>`;
    console.error("Error fetching news:", err);
  }
}

fetchNews();
=======
let currentFilter = 'all';

window.onload = () => {
  loadTasks();
  const dark = localStorage.getItem('darkMode') === 'true';
  document.body.classList.toggle('dark', dark);
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.checked = dark;
  }
};

function toggleTheme() {
  const dark = document.getElementById('themeToggle').checked;
  document.body.classList.toggle('dark', dark);
  localStorage.setItem('darkMode', dark);
}

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const tasks = getTasks();
  tasks.push({
    text: taskText,
    completed: false,
    created: new Date().toISOString()
  });
  saveTasks(tasks);
  input.value = "";
  loadTasks();
}

function editTask(index) {
  const tasks = getTasks();
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks(tasks);
    loadTasks();
  }
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  loadTasks();
}

function toggleComplete(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  loadTasks();
}

function clearCompleted() {
  let tasks = getTasks();
  tasks = tasks.filter(task => !task.completed);
  saveTasks(tasks);
  loadTasks();
}

function setFilter(filter) {
  currentFilter = filter;
  loadTasks();
}

function formatTime(isoString) {
  const date = new Date(isoString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

function loadTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  const tasks = getTasks();

  tasks.forEach((task, index) => {
    if (
      currentFilter === 'active' && task.completed ||
      currentFilter === 'completed' && !task.completed
    ) return;

    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;
    span.onclick = () => toggleComplete(index);

    const timestamp = document.createElement("span");
    timestamp.className = "timestamp";
    timestamp.textContent = formatTime(task.created);

    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.onclick = () => deleteTask(index);

    li.appendChild(span);
    li.appendChild(timestamp);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}











function addTask() {
  const input = document.getElementById("taskInput");
  const dueInput = document.getElementById("dueDate");
  const taskText = input.value.trim();
  const dueDate = dueInput.value;

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const tasks = getTasks();
  tasks.push({
    text: taskText,
    completed: false,
    created: new Date().toISOString(),
    due: dueDate || null
  });
  saveTasks(tasks);
  input.value = "";
  dueInput.value = "";
  loadTasks();
}

function loadTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  const tasks = getTasks();
  const now = new Date();

  tasks.forEach((task, index) => {
    if (
      currentFilter === 'active' && task.completed ||
      currentFilter === 'completed' && !task.completed
    ) return;

    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;
    span.onclick = () => toggleComplete(index);

    const timestamp = document.createElement("span");
    timestamp.className = "timestamp";
    timestamp.textContent = "Created: " + formatTime(task.created);

    const due = document.createElement("span");
    due.className = "timestamp";

    if (task.due) {
      const dueTime = new Date(task.due);
      if (!task.completed) {
        if (dueTime < now) {
          due.style.color = "red";
          due.textContent = "⚠ Overdue: " + formatTime(task.due);
        } else if (dueTime - now < 3600000) {
          due.style.color = "orange";
          due.textContent = "⏰ Due Soon: " + formatTime(task.due);
        } else {
          due.textContent = "Due: " + formatTime(task.due);
        }
      } else {
        due.textContent = "Due: " + formatTime(task.due);
      }
    }

    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.onclick = () => deleteTask(index);

    li.appendChild(span);
    li.appendChild(timestamp);
    if (task.due) li.appendChild(due);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}
>>>>>>> 88c09df7997a0e1a61d71b9185a61a94ae6060d1
