async function addTask() {
    var taskInput = document.getElementById("taskInput");
    
    if (taskInput.value.trim() !== "") {
        var response = await fetch('/add_task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'task=' + encodeURIComponent(taskInput.value),
        });

        if (response.ok) {
            var data = await response.json();
            updateTaskList(data.tasks);
            taskInput.value = "";
        }
    }
}

async function completeTask(index) {
    var response = await fetch('/complete_task/' + index, { method: 'POST' });

    if (response.ok) {
        var data = await response.json();
        updateTaskList(data.tasks);
    }
}

async function removeTask(index) {
    var response = await fetch('/delete_task/' + index, { method: 'POST' });

    if (response.ok) {
        var data = await response.json();
        updateTaskList(data.tasks);
    }
}

function updateTaskList(tasks) {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        var newTask = document.createElement("li");
        newTask.innerHTML = task.completed
            ? `<del>${task.content}</del> <button onclick="removeTask(${index})">Delete</button>`
            : `${task.content} <button onclick="completeTask(${index})">Complete</button> <button onclick="removeTask(${index})">Delete</button>`;
        taskList.appendChild(newTask);
    });
}
