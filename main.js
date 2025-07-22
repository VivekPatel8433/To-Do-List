let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();
  if (task !== "") {
    tasks.push(task);
    taskInput.value = "";
    rendertask();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  rendertask();
}

function rendertask() {
  const taskList = document.getElementById("taskList");
  const noTaskMessage = document.getElementById("noTaskMessage");
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    noTaskMessage.style.display = "block";
  } else {
    noTaskMessage.style.display = "none";
  }

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const div = document.createElement("div");
    div.className = "flex justify-between items-center bg-gray-50 border rounded-md p-3";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "mr-3";
    checkbox.onchange = () => {
      span.classList.toggle("line-through");
      span.classList.toggle("text-gray-400");
    };

    const span = document.createElement("span");
    span.className = "task-text text-gray-800";
    span.textContent = task;

    const button = document.createElement("button");
    button.className = "text-red-500 hover:text-red-700";
    button.textContent = "Delete";
    button.onclick = () => deleteTask(index);

    div.appendChild(checkbox);
    div.appendChild(span);
    div.appendChild(button);

    li.appendChild(div);
    taskList.appendChild(li);
  });
}

function sendCompletedTasks() {
  const email = document.getElementById("userEmail").value.trim();
  if (!email) {
    alert("Please enter a valid email address.");
    return;
  }

  const completedTasks = [];
  const taskItems = document.querySelectorAll("#taskList li");

  taskItems.forEach((li) => {
    const checkbox = li.querySelector("input[type='checkbox']");
    if (checkbox && checkbox.checked) {
      const taskText = li.querySelector("span").textContent;
      completedTasks.push(taskText);
    }
  });

  if (completedTasks.length === 0) {
    alert("Please check off at least one completed task.");
    return;
  }

  const emailParams = {
  email: email,            // <-- must be 'email' to match your template's {{email}}
  message: completedTasks.join("\n"),
};


  emailjs
    .send("service_lk11qpm", "template_5up9sg9", emailParams)
    .then(() => {
      alert("Your completed tasks have been sent to your email!");
    })
    .catch((error) => {
      console.error("Email sending error:", error);
      alert("Failed to send email. See console for details.");
    });
}
