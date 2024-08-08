//Define UI elements
let addTaskBtn = document.querySelector("#add_task");
let filter = document.querySelector("#task_filter");
let tasks = document.querySelector("#tasks");
let clearBtn = document.querySelector("#clear_tasks");
let taskInput = document.querySelector("#new_task");

//Define event listeners
addTaskBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearTasks);
tasks.addEventListener("click", removeTask);
filter.addEventListener("keyup", filterTasks);

//Define functions
//Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task!");
  } else {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(taskInput.value + " "));
    tasks.appendChild(li);
    taskInput.value = "";
    let link = document.createElement("a");
    link.appendChild(document.createTextNode("x"));
    link.setAttribute("href", "#");
    li.appendChild(link);
  }
}

//Remove Task
function removeTask(e) {
  if (e.target.hasAttribute("href")) {
    e.target.parentElement.remove();
  }
}

//Clear All Tasks
function clearTasks() {
  let links = Array.from(tasks.children);
  links.forEach(function (element) {
    element.remove();
  });

  //Another Ways
  // tasks.innerHTML = "";

  //Using Loop faster
  // while (tasks.firstElementChild) {
  //   tasks.firstElementChild.remove();
  // }
}

//Filter Task
function filterTasks(e) {
  let text = e.target.value.toLowerCase();

  document.querySelectorAll("li").forEach((task) => {
    let item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
