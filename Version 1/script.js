document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = document.getElementById('task-input').value;

    if (taskText) {
        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox"> ${taskText} <button class="delete-btn">×</button>`;  
        document.getElementById('task-list').appendChild(li);
        document.getElementById('task-input').value = '';
        li.querySelector('.delete-btn').addEventListener('click', function() {
            li.remove();
        });
    }
});
