let tasks = [];

// -------------------- ADD TASK --------------------
function addTask() {
  let name = document.querySelector("#taskName").value;
  let date = document.querySelector("#date").value;
  let priority = document.querySelector("select").value;
  let completed = false

  // Create simple task object
  const taskItem = {
    name: name,
    date: date,
    priority: priority,
    completed: false
  };

  // Save to array
  tasks.push(taskItem);

  // Save to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Show task on screen
  displayTask(taskItem);

  // Clear inputs
  document.querySelector("#taskName").value = "";
  document.querySelector("#date").value = "";
}

// -------------------- DISPLAY TASK --------------------
function displayTask(task) {
  let priorityText;
  let priorityColor;

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
      <input class="checkBox" type="checkbox" ${task.completed ? "checked" : ""} />
    </div>
<div class="taskActions">
  <button class="btnStyle">Edit</button>
  <button class="btnStyle" onclick="deleteTask(this)">Delete</button>
</div>

  `;

  document.querySelector(".taskList").appendChild(taskDiv);

    // Add event listener to checkbox
  const checkbox = taskDiv.querySelector(".checkBox");
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked; // update task object
    localStorage.setItem("tasks", JSON.stringify(tasks)); // save to localStorage
  });
}

// -------------------- LOAD SAVED TASKS --------------------
function loadTasks() {
  const saved = localStorage.getItem("tasks");

  if (saved) {
    tasks = JSON.parse(saved);
    tasks.forEach((task) => displayTask(task));
  }
}

// Run when page loads
loadTasks();

// -------------------- OTHER FUNCTIONS --------------------
function toggle() {
  document.body.classList.toggle("light");
}

function toggleMenu() {
  document.querySelector("nav").classList.toggle("hidden");
}

// -------------------- DELETE FUNKTION --------------------

function deleteTask(button) {
  const taskDiv = button.parentElement.parentElement;

  // remove from screen
  taskDiv.remove();

  // remove from localStorage using the name
  const name = taskDiv.querySelector("h2").textContent;

  tasks = tasks.filter((t) => t.name !== name);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
