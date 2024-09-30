// Add task when the "Add Task" button is clicked
document.getElementById('add-task-btn').addEventListener('click', function() {
    addTask();
});

// Add task when "Enter" key is pressed
document.getElementById('task-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Function to add a task
function addTask() {
    // Get the value from the input field
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim(); // Fixed: Use value instead of ariaValueMax

    // Check if the input field is not empty
    if (taskText !== "") {
        const taskList = document.getElementById('task-list');

        // Create a new list item element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Add delete button to the list item
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');

        // When delete button is clicked, remove the task
        deleteBtn.onclick = function() {
            taskList.removeChild(li);
            saveTasks();
        };

        // When a task is clicked, mark it as completed (toggle functionality)
        li.onclick = function() {
            li.classList.toggle('completed');
            saveTasks();
        };

        // Append delete button to list item
        li.appendChild(deleteBtn);

        // Append the new task to the task list
        taskList.appendChild(li); // Fixed: Append li instead of nothing

        // Clear the input field after adding the task
        taskInput.value = '';

        // Save the updated task list in localStorage
        saveTasks();
    }
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    const taskItems = document.querySelectorAll('#task-list li');
    taskItems.forEach(function(task) {
        tasks.push({
            text: task.firstChild.textContent,
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage when the page loads
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');
    savedTasks.forEach(function(task) {
        const li = document.createElement('li');
        li.textContent = task.text;

        // If task is completed, add 'completed' class
        if (task.completed) {
            li.classList.add('completed');
        }

        // Create and add the delete button for each task
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = function() {
            taskList.removeChild(li);
            saveTasks();
        };

        li.onclick = function() {
            li.classList.toggle('completed');
            saveTasks();
        };

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Load tasks when the page loads
window.onload = loadTasks;
