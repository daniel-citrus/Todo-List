import { brain } from './barrel';

export default function () {
    let mainContainer,
        projectContainer,
        taskContainer,
        projectButtons,
        taskButtons,
        taskDisplay;

    /* Initializer */
    (() => {
        mainContainer = document.querySelector('.main');
        projectContainer = document.querySelector('.projects');
        taskContainer = document.querySelector('.tasks');
        projectButtons = document.querySelectorAll("button.projectCreator");
        taskButtons = document.querySelectorAll("button.taskCreator");

        taskDisplay = createTaskDisplay();
        taskContainer.appendChild(taskDisplay);

    })();

    let p = 0;
    projectButtons.forEach((pButton) => {
        pButton.addEventListener("click", () => {
            projectContainer.appendChild(buildProject(p++, 'Test'));
        })
    })

    let tasks = [
        {
            title: 'Pull Ups',
            description: 'Quality reps',
            dueDate: new Date('9/4/2023'),
            priority: 2,
            completed: true,
        },
        {
            title: 'Dips',
            description: 'Heavy weight',
            dueDate: new Date('9/3/2023'),
            priority: 3,
        },
        {
            title: 'Eat',
            description: 'Healthy meals',
            dueDate: '2023-09-02',
            priority: 1
        },
        {
            title: 'Sleep',
            description: `Good sleep improves your brain performance, mood, and health.
                    Not getting enough quality sleep regularly raises the risk of many diseases and disorders. These range from heart disease and stroke to obesity and dementia.
                    There’s more to good sleep than just the hours spent in bed, says Dr. Marishka Brown, a sleep expert at NIH. “Healthy sleep encompasses three major things,” she explains. “One is how much sleep you get. Another is sleep quality—that you get uninterrupted and refreshing sleep. The last is a consistent sleep schedule.”`,
            dueDate: '9/2/2023',
            priority: 1
        },
        {
            title: 'Study',
            description: 'Regular session',
            dueDate: new Date('9/6/2023'),
            priority: 1,
        }
    ];

    taskButtons.forEach((tButton) => {
        tButton.addEventListener("click", () => {
            taskContainer.appendChild(buildTask(p++, tasks[Math.floor(Math.random() * tasks.length)]));
        })
    })

    /**
     * Creates a project DOM element that has a custom data set called data-id. The element contains the project name and options button.
     * @param {*} key project id
     * @param {*} name project name
     **/
    function buildProject(key, name) {
        let project = buildElement('div', '', 'project');
        project.dataset.id = key;

        let projectName = buildElement('div', name, 'name');
        project.appendChild(projectName);
        project.appendChild(projectOptionButton(key));

        return project;
    }

    function buildElement(tagName, content = '', ...classList) {
        let element = document.createElement(tagName);
        element.textContent = content;

        if (!classList.length) return element;

        classList.forEach((c) => {
            if (c == '') {
                return
            }
            element.classList.add(c);
        })

        return element;
    }

    function projectOptions(key) {
        console.log(key);
    }

    function projectOptionButton(key) {
        let button = buildElement('button', '', 'options');

        button.addEventListener('click', () => {
            projectOptions(key);
        })

        return button;
    }

    function updateProjectName(key, name) {
        let projectName = document.querySelector(`.projects .project[data-id="${key}"]`);

        if (!projectName) {
            console.error(`Project element does not exist - Key: ${key}`)
            return;
        }

        projectName.textContent = name;
    }

    function deleteProject(key) {
        let project = document.querySelector(`.projects .project[data-id="${key}"]`);

        if (!project) {
            console.error(`Project element does not exist - Key: ${key}`)
            return false;
        }

        project.remove();
        return true;
    }

    /**
     * Creates a task DOM element that has a custom data set called data-id. The element contains the task name, completion checkbox, and options button.
     * @param {*} key task id
     * @param {*} task task object
     **/
    function buildTask(key, taskObj) {
        let title = '',
            description = '',
            dueDate = '',
            priority = '',
            completed = '';
        ({
            title,
            description,
            dueDate,
            priority,
            completed=false,
        } = taskObj);

        /* Store Key, priority level, completed status */
        let task = buildElement('div', '', 'task');
        task.dataset.id = key;
        task.dataset.priority = priority;
        console.log(completed);
        task.dataset.completed = completed;

        task.appendChild(buildElement('div', title, 'title'));
        task.appendChild(buildElement('div', description, 'description'));
        task.appendChild(buildElement('div', dueDate, 'dueDate'));
        let options = buildElement('button', '', 'options');
        // generate option buttons and display
        task.appendChild(taskOptionButton(key));

        return task;
    }

    /* Pop up to display task details. This container also serves as a form for creating and editing a task */
    function createTaskDisplay() {
        let wrapper = buildElement('div', '', 'taskDisplayWrapper', 'hidden')
        wrapper.id = 'taskDisplay';

        let display = buildElement('form', '', 'taskDetails');
        wrapper.appendChild(display);

        display.innerHTML = `
            <label for="taskCompleted">
                Completed:
            </label>
            <br/>
            <input id="taskCompleted" name="taskCompleted" required disabled>
            <br/>
            <label for="taskName">
                Task Name:
            </label>
            <br/>
            <input type="text" id="taskName" name="taskName" required disabled>
            <br/>
            <label for="taskDueDate">
                Due Date:
            </label>
            <br/>
            <input type="date" id="taskDueDate" name="taskDueDate" required disabled>
            <br/>
            <label for="taskPriority">
                Priority:
            </label>
            <br/>
            <input id="taskPriority" name="taskPriority" required disabled>
            <br/>
            <label for="taskDesc">
                Description:
            </label>
            <br/>
            <input type="text" id="taskDesc" name="taskDesc" required disabled>
            <br/>
        `

        let editButton = buildElement('button', 'Edit', 'edit');
        editButton.type = 'button';
        editButton.addEventListener('click', () => {
            editTask(+taskDisplay.dataset.taskId);
        })
        display.appendChild(editButton);

        let submitEditButton = buildElement('button', 'Submit', 'submit', 'hidden');
        submitEditButton.type = 'button';
        submitEditButton.addEventListener('click', () => {
            submitTaskDetails();
        })
        display.appendChild(submitEditButton);

        let cancelEditButton = buildElement('button', 'Cancel', 'cancel', 'hidden');
        cancelEditButton.type = 'button';
        cancelEditButton.addEventListener('click', () => {
            cancelTaskDisplay();
        })
        display.appendChild(cancelEditButton);

        let closeButton = buildElement('button', 'Close', 'close');
        closeButton.type = 'button';
        closeButton.addEventListener('click', () => {
            hideTaskDisplay();
        })

        display.appendChild(closeButton);

        return wrapper;
    }

    /**
     * Disable task display input fields and show the display
     */
    function viewTaskDisplay() {
        document.getElementById('taskCompleted').disabled = true;
        document.getElementById('taskName').disabled = true;
        document.getElementById('taskDueDate').disabled = true;
        document.getElementById('taskPriority').disabled = true;
        document.getElementById('taskDesc').disabled = true;
        taskDisplay.querySelector('button.edit').classList.remove('hidden');
        taskDisplay.querySelector('button.submit').classList.add('hidden');
        taskDisplay.querySelector('button.cancel').classList.add('hidden');
        taskDisplay.classList.remove('hidden');
    }

    function hideTaskDisplay() {
        taskDisplay.classList.add('hidden');
    }

    /**
     * Enables task display input fields for editing
     */
    function editTaskDisplay() {
        document.getElementById('taskCompleted').disabled = false;
        document.getElementById('taskName').disabled = false;
        document.getElementById('taskDueDate').disabled = false;
        document.getElementById('taskPriority').disabled = false;
        document.getElementById('taskDesc').disabled = false;
        taskDisplay.querySelector('button.edit').classList.add('hidden');
        taskDisplay.querySelector('button.submit').classList.remove('hidden');
        taskDisplay.querySelector('button.cancel').classList.remove('hidden');
        taskDisplay.classList.remove('hidden');
    }

    function cancelTaskDisplay() {
        let key = taskDisplay.dataset.taskId;

        if (key == 'false') {
            console.error('Invalid task key');
            return;
        }

        if (populateTaskDisplay(+key) === false) { return };
        viewTaskDisplay();
    }

    function submitTaskDetails() {
        let key = +taskDisplay.dataset.taskId;
        let completed = document.getElementById('taskCompleted').value;
        let title = document.getElementById('taskName').value;
        let dueDate = document.getElementById('taskDueDate').value;
        let priority = document.getElementById('taskPriority').value;
        let description = document.getElementById('taskDesc').value;

        brain.updateTask(key, title, description, dueDate, priority, completed);
        if (populateTaskDisplay(key) === false) { return };
        viewTaskDisplay();
    }

    /**
     * Populates the task display with task information using the task key
     * @param {*} key task key
     */
    function populateTaskDisplay(key) {
        let task = brain.getTaskDetails(key);

        if (!task) { return false; }

        let { title = '', description = '', dueDate = '', priority = '', completed = '' } = task;

        taskDisplay.dataset.taskId = key;
        document.getElementById('taskCompleted').value = completed;
        document.getElementById('taskName').value = title;
        document.getElementById('taskDueDate').valueAsDate = dueDate;
        document.getElementById('taskPriority').value = priority;
        document.getElementById('taskDesc').value = description;
    }

    /* Create a task option button. When clicked, a list of task actions will appear. */
    function taskOptionButton(key) {
        let button = buildElement('button', 'Task Button', 'options');

        /* Insert task menu as a child of the task option button and then toggles its visibility */
        button.addEventListener('click', () => {
            // display task menu options
            /* if (populateTaskDisplay(key) === false) { return };
            viewTaskDisplay(); */
            deleteTask(key);
        })

        return button;
    }

    /**
     * Returns a menu element that contains task options.
     * Call the brain and passes the task key to perform operations to the task database.
     * @param {*} key task key
     */
    function createTaskMenu(key) {
        let menuContainer = buildElement('div', '', 'menuContainer');
        let menu = buildElement('div', '', 'taskMenu');
        menu.appendChild(menuContainer);


        let buttons = [
            ['View', viewTask],
            ['Edit', editTask],
            ['Move', () => { }],
            ['Delete', () => { }],
        ]
        // view task
        // edit task
        // move task to a new project
        // delete task

        let button = buildElement('button');
        button.addEventListener('click', () => {
            console.log('task options')
        })

        return menuContainer;
    }

    function viewTask(key) {
        if (populateTaskDisplay(key) === false) { return };
        viewTaskDisplay();
    }

    /* Enable editing on the task display */
    function editTask(key) {
        if (populateTaskDisplay(key) === false) { return };
        editTaskDisplay();
    }

    function moveTask(key, project) {
        // brain stuff
    }

    function deleteTask(key) {
        // brain stuff
        let task = taskContainer.querySelector(`.task[data-id="${key}"]`);
        
        if (!task) {
            console.error(`Task element does not exist - Key: ${key}`);
        }

        task.remove();
    }

    return {
    }
}