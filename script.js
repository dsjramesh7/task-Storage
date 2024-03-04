const form = document.querySelector("#form");
const textInput = document.getElementById("textInput");
const dateInput = document.getElementById("dateInput");
const textarea = document.getElementById("textarea");
const msg = document.getElementById("msg");
const tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

function formValidation() {
  if (textInput.value === "") {
    // console.log("Failure");
    msg.innerHTML = "Task is Empty Baka!!!";
  } else {
    // console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
}

let data = [];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });
  // console.log(data);
  localStorage.setItem("data", JSON.stringify(data));
  createTasks();
};

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((eachTask, index) => {
    return (tasks.innerHTML += `
        <div id=${index}>
          <span class="fw-bold">${eachTask.text}</span>
          <span class="small text-secondary">${eachTask.date}</span>
          <p>${eachTask.description}</p>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this)" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
  });

  resetForm();
};

function deleteTask(e) {
  e.parentElement.parentElement.remove();
  // console.log(e.parentElement.parentElement.id);
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
}

let editTask = (e) => {
  let selecteTask = e.parentElement.parentElement;

  textInput.value = selecteTask.children[0].innerHTML;
  dateInput.value = selecteTask.children[1].innerHTML;
  textarea.value = selecteTask.children[2].innerHTML;

  deleteTask(e);
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data"));
  // console.log(data);
  createTasks();
})();
