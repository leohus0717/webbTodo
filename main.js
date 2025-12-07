let tasks = [];
let editingTaskId = null;

function addTask() {
  let name = document.querySelector("#taskName").value;
  let date = document.querySelector("#date").value;
  let priority = document.querySelector("select").value;
  let completed = false;

  const taskItem = {
    id: Date.now(),
    name: name,
    date: date,
    priority: priority,
    completed: false,
  };

  tasks.push(taskItem);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  displayTask(taskItem);

  document.querySelector("#taskName").value = "";
  document.querySelector("#date").value = "";
}

function displayTask(task) {
  let priorityText = null;
  let priorityColor = null;

  if (task.priority === "1") {
    priorityText = "low";
    priorityColor = "var(--priority-low)";
  } else if (task.priority === "2") {
    priorityText = "medium";
    priorityColor = "var(--priority-medium)";
  } else if (task.priority === "3") {
    priorityText = "high";
    priorityColor = "var(--priority-high)";
  }

  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  taskDiv.dataset.id = task.id;

  taskDiv.innerHTML = `
    <div class="taskGrid">
      <div class="taskText">
        <h2>${task.name}</h2>
        <p>
          Date: ${task.date} | Priority:
          <span
            style="
              background-color: ${priorityColor};
              padding: 0.25rem;
              border-radius: 1rem;
              text-align: center;
            "
          >${priorityText}</span>
        </p>
      </div>
      <input class="checkBox" type="checkbox" ${
        task.completed ? "checked" : ""
      } />
    </div>
<div class="taskActions">
  <button class="btnStyle" onclick="editTask(this)">Edit</button>
  <button class="btnStyle" onclick="deleteTask(this)">Delete</button>
</div>
  `;

  document.querySelector(".taskList").appendChild(taskDiv);

  const checkbox = taskDiv.querySelector(".checkBox");

  function checkboxChange() {
    task.completed = checkbox.checked;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  checkbox.addEventListener("change", checkboxChange);
}



function loadTasks() {
  const saved = localStorage.getItem("tasks");

  if (saved) {
    tasks = JSON.parse(saved);
    tasks.forEach(displayTask);
  }

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light");
  }
}

loadTasks();

function toggleTheme() {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
}

function toggleMenu() {
  document.querySelector("nav").classList.toggle("hidden");
}



function deleteTask(button) {
  const taskDiv = button.parentElement.parentElement;

  taskDiv.remove();

  const id = Number(taskDiv.dataset.id);

  tasks = tasks.filter((t) => t.id !== id);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}



function editTask(button) {
  const taskDiv = button.parentElement.parentElement;
  const id = Number(taskDiv.dataset.id);

  editingTaskId = id;
  const taskToEdit = tasks.find((t) => t.id === editingTaskId);

  if (taskToEdit) {
    document.querySelector("#editTaskName").value = taskToEdit.name;
    document.querySelector("#editDate").value = taskToEdit.date;
    document.querySelector(".editBox select").value = taskToEdit.priority;

    document.querySelector(".editBox").classList.remove("hidden");
  }
}

function closeEdit() {
  document.querySelector(".editBox").classList.add("hidden");
  editingTaskId = null;
}

function saveTask() {
  if (editingTaskId) {
    const taskIndex = tasks.findIndex((t) => t.id === editingTaskId);

    if (taskIndex > -1) {
      tasks[taskIndex].name = document.querySelector("#editTaskName").value;
      tasks[taskIndex].date = document.querySelector("#editDate").value;
      tasks[taskIndex].priority =
        document.querySelector(".editBox select").value;

      localStorage.setItem("tasks", JSON.stringify(tasks));

      document.querySelector(".taskList").innerHTML = "";
      tasks.forEach(displayTask);

      closeEdit();
    }
  }
}
