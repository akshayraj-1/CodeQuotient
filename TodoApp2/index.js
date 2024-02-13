const myTasksList = [];
const listView = document.querySelector('.list-view');
const taskInput = document.querySelector('textarea');

window.onload = loadSavedTasks;

function loadSavedTasks() {
    listView.innerHTML = '';
    myTasksList.length = 0;
    myTasksList.push(...JSON.parse(localStorage.getItem('my-tasks')) || []);
    myTasksList.forEach(task => {
        addTaskToListView(task);
    });
}

function updateSavedTasks() {
    localStorage.setItem('my-tasks', JSON.stringify(myTasksList));
    loadSavedTasks();
}

function addTaskToListView(task) {

    const taskItemView = document.createElement('div');
    taskItemView.className = 'task-item';
      
    const taskTitle = document.createElement('p');
    taskTitle.className = 'task-title';
    taskTitle.innerText = task.title;

    if (task.isCompleted) {
        taskTitle.style.textDecoration = 'line-through';
        taskTitle.style.color = '#9e9e9e';
    }

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.style.scale = 1.1;
    checkBox.checked = task.isCompleted;

    const btnDelete = document.createElement('i');
    btnDelete.className = 'fa fa-close';
    btnDelete.style.scale = 1.1;


    checkBox.addEventListener('change', (e) => {
        myTasksList[myTasksList.findIndex(t => t.id == task.id)].isCompleted = e.target.checked;
        updateSavedTasks();
    });

    btnDelete.addEventListener('click', () => {
        myTasksList.splice(myTasksList.findIndex(t => t.id == task.id), 1);
        console.log(myTasksList);
        updateSavedTasks();
    })

    taskItemView.append(taskTitle, checkBox, btnDelete);
    listView.appendChild(taskItemView);

}

taskInput.addEventListener("input", (e) => {
    const currentLength = e.target.value.length;
    const remaining = 20 - currentLength;
    (remaining < 0) && (taskInput.value = taskInput.value.slice(0, 20));
});

taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (e.target.value.trim() === '') return;
        const task = e.target.value;
        taskInput.value = '';
        myTasksList.push({
            id: parseInt(Math.random() * 1000),
            title: task,
            isCompleted: false
        });
        updateSavedTasks();
    }
});


