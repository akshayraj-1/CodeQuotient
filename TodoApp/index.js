class TaskModel {
    constructor(id, task, completed) {
        this.id = id;
        this.task = task;
        this.isCompleted = completed;
    }
    getTaskId = () => this.id;
    getTaskTitle = () => this.task;
    getTaskStatus = () => this.isCompleted;
    setTaskStatus = (status) => this.isCompleted = status;
}

class TaskAdapter {
    createTaskListView = (tasksList) => {
        if (!tasksList && tasksList.length === 0) return;
        listView.innerHTML = '';
        tasksList.forEach(task => {
            const taskItemView = document.createElement('div');
            taskItemView.style.display = 'flex';
            taskItemView.style.justifyContent = 'space-between';
            taskItemView.style.padding = '10px 0px';
            taskItemView.style.borderBottom = '1px solid #e0e0e0';

            const taskTitle = document.createElement('p');
            taskTitle.innerText = task.getTaskTitle();
            taskTitle.style.fontWeight = 500;
            if (task.getTaskStatus()) {
                taskTitle.style.textDecoration = 'line-through';
                taskTitle.style.color = '#9e9e9e';
            }

            const controlView = document.createElement('div');
            controlView.style.display = 'flex';
            controlView.style.alignItems = 'center';
            controlView.style.gap = '10px';

            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.style.scale = 1.1;
            checkBox.checked = task.getTaskStatus();

            const btnDelete = document.createElement('i');
            btnDelete.className = 'fa fa-close';
            btnDelete.style.scale = 1.1;


            checkBox.addEventListener('change', (e) => {
                tasksList[tasksList.indexOf(task)].setTaskStatus(e.target.checked);
                taskAdapter.createTaskListView(tasksList);
            });

            btnDelete.addEventListener('click', () => {
                tasksList.splice(tasksList.indexOf(task) , 1);
                taskAdapter.createTaskListView(tasksList);
            })


            controlView.appendChild(checkBox);
            controlView.appendChild(btnDelete);

            taskItemView.appendChild(taskTitle);
            taskItemView.appendChild(controlView);
            listView.append(taskItemView);
        });
    }

}



const tasksList = [];
const taskAdapter = new TaskAdapter();

const taskInput = document.getElementById('inputTask');
const listView = document.querySelector('.list-view');

taskInput.addEventListener("input", (e) => {
    const currentLength = e.target.value.length;
    const remaining = 20 - currentLength;
    if (remaining < 0) {
        taskInput.value = taskInput.value.slice(0, 20);
    }
});


taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (e.target.value.trim() === '') return;
        const task = e.target.value;
        taskInput.value = '';
        tasksList.push(new TaskModel(tasksList.length + 1, task, false));
        taskAdapter.createTaskListView(tasksList);
    }
});
