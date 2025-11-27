function addTask() {
  let name = document.querySelector("#taskName").value;
  let date = document.querySelector("#date").value;
  let priority = document.querySelector("select").value;
  console.log(name, date, priority);

  let task = document.createElement("div");
  task.classList.add("task");
  let priorityText;
  let priorityColor;

  if (priority === "1") {
    priorityText = "low";
    priorityColor = "var(--priority-low)";
  } else if (priority === "2") {
    priorityText = "medium";
    priorityColor = "var(--priority-medium)";
  } else if (priority === "3") {
    priorityText = "high";
    priorityColor = "var(--priority-high)";
  }

  task.innerHTML = `
            <div class="task">
              <div class="taskGrid">
                <div class="taskText">
                  <h2>${name}</h2>
                  <p>
                    Date: ${date} | Priority:
                    <span
                      style="
                        background-color: ${priorityColor};
                        padding: 0.25rem;
                        border-radius: 1rem;
                        text-align: center;
                      "
                      >${priorityText}</span
                    >
                  </p>
                </div>
                <input class="checkBox" type="checkbox" placeholder="" />
              </div>
              <div class="taskActions">
                <button class="btnStyle" onclick="editTask(1)">Edit</button>
                <button class="btnStyle" onclick="deleteTask(1)">Delete</button>
              </div>
            </div>`;
  document.querySelector(".taskList").appendChild(task);
}

function toggle() {
  document.body.classList.toggle("light");
}

function toggleMenu() {
  document.querySelector("nav").classList.toggle("hidden");
}
