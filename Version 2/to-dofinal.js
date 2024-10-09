document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = document.getElementById('task-input').value;
    const priority = document.getElementById('priority-select').value;

    if (taskText) {
        addTaskToList(taskText, priority);
        saveTaskToLocalStorage(taskText, priority);
        document.getElementById('task-input').value = '';
    }
});

function addTaskToList(taskText, priority) {
    const li = document.createElement('li');
    li.classList.add(priority);
    li.innerHTML = `
        <input type="checkbox">
        <span>${taskText}</span>
        <button class="edit-btn">✎</button>
        <button class="delete-btn">×</button>
    `;

    document.getElementById('task-list').appendChild(li);

    li.querySelector('.delete-btn').addEventListener('click', function() {
        li.remove();
        removeTaskFromLocalStorage(taskText);
    });

    li.querySelector('.edit-btn').addEventListener('click', function() {
        const newText = prompt("Edit Task", taskText);
        if (newText) {
            li.querySelector('span').innerText = newText;
            updateTaskInLocalStorage(taskText, newText);
        }
    });
}

function saveTaskToLocalStorage(taskText, priority) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, priority: priority });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToList(task.text, task.priority);
    });
}

function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInLocalStorage(oldText, newText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.text === oldText) {
            task.text = newText;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
