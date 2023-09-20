

export default function DomControl() {
    let mainContainer,
        projectContainer,
        taskContainer,
        projectButtons,
        taskButtons,
        taskDisplay;

    (() => {
        mainContainer = document.querySelector('.main');
        projectContainer = document.querySelector('.projects');
        taskContainer = document.querySelector('.tasks');
        projectButtons = document.querySelectorAll("button.project");
        taskButtons = document.querySelectorAll("button.task");

        taskDisplay = createTaskDisplay();
        taskContainer.appendChild(taskDisplay);

    })();

    let p = 1;
    projectButtons.forEach((pButton) => {
        pButton.addEventListener("click", () => {
            projectContainer.appendChild(buildProject(p++, 'Test'));
        })
    })

    let tasks = [
        {
            title: 'Pull Ups',
            description: 'Quality reps',
            dueDate: '9/4/2023',
            priority: 2,
            completed: true,
        },
        {
            title: 'Dips',
            description: 'Heavy weight',
            dueDate: '9/3/2023',
            priority: 3,
        },
        {
            title: 'Eat',
            description: 'Healthy meals',
            dueDate: '9/2/2023',
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
            dueDate: '9/6/2023',
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
            completed
        } = taskObj);

        /* Store Key, priority level, completed status */
        let task = buildElement('div', '', 'task');
        task.dataset.id = key;
        task.dataset.priority = priority;
        task.dataset.completed = completed;

        let taskName = buildElement('div', title, 'title');
        task.appendChild(taskName);

        let taskDescription = buildElement('div', description, 'description');
        task.appendChild(taskDescription);

        let taskDueDate = buildElement('div', dueDate, 'dueDate');
        task.appendChild(taskDueDate);

        let options = buildElement('button', '', 'options');
        // generate option buttons and display
        task.appendChild(taskOptionButton(key));

        return task;
    }

    /* The task display will also serve as a form for task detail inputs. */
    function createTaskDisplay() {
        let wrapper = buildElement('div', '', 'taskDisplayWrapper', 'hidden')
        wrapper.id = 'taskDisplay';

        let display = buildElement('form', '', 'taskDetails');
        wrapper.appendChild(display);

        /* Task name */
        display.innerHTML = `
            <label for="taskCompleted">
                Completed:
            </label>
            <br/>
            <input id="taskCompleted" name="taskCompleted" readonly>
            <br/>
            <label for="taskName">
                Task Name:
            </label>
            <br/>
            <input type="text" id="taskName" name="taskName" readonly>
            <br/>
            <label for="taskDueDate">
                Due Date:
            </label>
            <br/>
            <input type="date" id="taskDueDate" name="taskDueDate" readonly>
            <br/>
            <label for="taskPriority">
                Priority:
            </label>
            <br/>
            <input id="taskPriority" name="taskPriority" readonly>
            <br/>
            <label for="taskDesc">
                Description:
            </label>
            <br/>
            <input type="text" id="taskDesc" name="taskDesc" readonly>
            <br/>
        `

        /* Edit task buttons */
        let submitEditButton = buildElement('button', 'Submit', 'hidden');
        submitEditButton.type = 'button';
        submitEditButton.addEventListener('click', () => {
            // submit new values and task key (from tasDiaply.data-task-id) to the brain to update task Data
            // close the task pop up
            // hide submit and cancel
        })
        display.appendChild(submitEditButton);

        let cancelEditButton = buildElement('button', 'Cancel', 'hidden');
        cancelEditButton.type = 'button';
        cancelEditButton.addEventListener('click', () => {
            // close the task pop up
            // hide submit and cancel
        })
        display.appendChild(cancelEditButton);

        let closeButton = buildElement('button', 'Close');
        closeButton.type = 'button';
        closeButton.addEventListener('click', () => {
            // hide submit and cancel
            taskDisplay.classList.add('hidden');
        })

        display.appendChild(closeButton);

        return wrapper;
    }

    /**
     * Uses the task display div to display task information
     * @param {*} key task key
     * @param {*} task task details (title, description, dueDate, priority, completed status)
     */
    function viewTask(key, title = '', description = '', dueDate = '', priority = '', completed = '') {
        taskDisplay.dataset.taskId = key;

        let completedInput = document.getElementById('taskCompleted');
        completedInput.textContent = completed;

        let titleInput = document.getElementById('taskName');
        titleInput.textContent = title;

        let dueDateInput = document.getElementById('taskDueDate');
        dueDateInput.textContent = dueDate;

        let priorityInput = document.getElementById('taskPriority');
        priorityInput.textContent = priority;

        let descInput = document.getElementById('taskDesc');
        descInput.textContent = description;

        taskDisplay.classList.remove('hidden');
    }

    /* Create a task option button. When clicked, a list of task actions will appear. */
    function taskOptionButton(key) {
        let button = buildElement('button', 'Task Button', 'options');

        /* Inserts task menu as a child of the task option button and then toggles its visibility */
        button.addEventListener('click', () => {
            // display task menu options
            editTask(key);
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

    function editTask(key) {
        // enable task pop up
        if (taskDisplay.classList.contains('hidden')) {
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
                completed
            } = tasks[0]);

            // get task from brain then pass to view task
            viewTask(key, title, description, dueDate, priority, completed);
        }
        // turn divs into input fields
        let title = taskDisplay.querySelector('.title');
        title.innerHTML = `
        <input id=tTitle type="text" value="${title.textContent}">
        `;

        let description = taskDisplay.querySelector('.description');
        let dueDate = taskDisplay.querySelector('.dueDate');
        let priority = taskDisplay.querySelector('.priority');
        let completed = taskDisplay.querySelector('.priority');
        // show submit and cancel buttons
    }

    return {
    }
}