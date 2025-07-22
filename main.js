let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();
  const feedback = document.getElementById("feedbackMessage");
  feedback.textContent = "";

  if (task !== "") {
    tasks.push(task);
    taskInput.value = "";
    rendertask();
  } else {
    feedback.textContent = "Please enter a task.";
    feedback.className = "text-red-500 text-center";
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
      if(checkbox.checked) {
        div.classList.add("bg-green-100");
  } else {
    div.classList.remove("bg-green-100");
  }
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
  const feedback = document.getElementById("feedbackMessage");
  feedback.textContent = "";

  if (!email) {
    feedback.textContent = "Please enter a valid email address.";
    feedback.className = "text-red-500 text-center";
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
    feedback.textContent = "Please mark at least one task as completed.";
    feedback.className = "text-yellow-500 text-center";
    return;
  }

  const emailParams = {
    email: email, // This must match {{email}} in EmailJS template
    message: completedTasks.join("\n") // This must match {{message}} in template
  };

  emailjs
    .send("service_lk11qpm", "template_5up9sg9", emailParams)
    .then(() => {
      feedback.textContent = "✅ Completed tasks sent to your email.";
      feedback.className = "text-green-600 text-center";
    })
    .catch((error) => {
      console.error("Email sending error:", error);
      feedback.textContent = "❌ Failed to send email. Check console for details.";
      feedback.className = "text-red-500 text-center";
    });
}
