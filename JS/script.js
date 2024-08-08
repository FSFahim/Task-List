//Define UI elements
let addTaskBtn = document.querySelector("#add_task");
let filter = document.querySelector("#task_filter");
let taskList = document.querySelector("#tasks");
let clearBtn = document.querySelector("#clear_tasks");
let taskInput = document.querySelector("#new_task");

//Define event listeners
addTaskBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearTasks);
taskList.addEventListener("click", removeTask);
filter.addEventListener("keyup", filterTasks);
document.addEventListener("DOMContentLoaded", getTasksFromLS);

//Define functions
//Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task!");
  } else {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(taskInput.value + " "));
    let link = document.createElement("a");
    link.appendChild(document.createTextNode("x"));
    link.setAttribute("href", "#");
    li.appendChild(link);
    taskList.appendChild(li);
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = "";
  }
}

//Remove Task
function removeTask(e) {
  if (e.target.hasAttribute("href")) {
    if (confirm("Are you sure?")) {
      let element = e.target.parentElement;
      element.remove();
      removeFromLS(element);
    }
  }
}

//Clear All Tasks
function clearTasks() {
  let links = Array.from(taskList.children);
  links.forEach(function (element) {
    element.remove();
  });

  //Another Ways
  // taskList.innerHTML = "";

  //Using Loop faster
  // while (taskList.firstElementChild) {
  //   taskList.firstElementChild.remove();
  // }

  localStorage.clear();
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

//Store in Local Storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  return tasks;
}

function storeTaskInLocalStorage(task) {
  let tasks = getTasks();

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLS() {
  let tasks = getTasks();

  tasks.forEach((task) => {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(task + " "));
    let link = document.createElement("a");
    link.appendChild(document.createTextNode("x"));
    link.setAttribute("href", "#");
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

function removeFromLS(task) {
  let tasks = getTasks();

  let li = task;
  li.removeChild(li.lastChild);

  tasks.forEach((task, index) => {
    if (li.textContent.trim() === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
