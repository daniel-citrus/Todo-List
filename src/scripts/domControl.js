

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
        task.appendChild(taskOptionButton(key));

        return task;
    }

    /* The task display box will also serve as the form for editing task details. */
    function createTaskDisplay() {
        let wrapper = buildElement('div', '', 'taskDisplayWrapper', 'hidden')
        wrapper.id = 'taskDisplay';

        let display = buildElement('form', '', 'taskDetails');
        wrapper.appendChild(display);

        let titleDiv = buildElement('div', '', 'title');
        display.appendChild(titleDiv);

        let descDiv = buildElement('div', '', 'description');
        display.appendChild(descDiv);

        let dueDateDiv = buildElement('div', '', 'dueDate');
        display.appendChild(dueDateDiv);

        let priorityDiv = buildElement('div', '', 'priority');
        display.appendChild(priorityDiv);

        let completedDiv = buildElement('div', '', 'completed');
        display.appendChild(completedDiv);

        /* Edit task buttons */
        let submitEditButton = buildElement('button', 'Submit', 'hidden');
        submitEditButton.type = 'button';
        display.appendChild(submitEditButton);

        let cancelEditButton = buildElement('button', 'Cancel', 'hidden');
        cancelEditButton.type = 'button';
        display.appendChild(cancelEditButton);

        let closeButton = buildElement('button', 'Close');
        closeButton.type = 'button';
        closeButton.addEventListener('click', () => {
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
    function viewTask(key, task) {
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
        } = task);

        let titleDiv = taskDisplay.querySelector('.title');
        titleDiv.textContent = title;
        let descDiv = taskDisplay.querySelector('.description');
        descDiv.textContent = description;
        let dueDateDiv = taskDisplay.querySelector('.dueDate');
        dueDateDiv.textContent = dueDate;
        let priorityDiv = taskDisplay.querySelector('.priority');
        priorityDiv.textContent = priority;
        let completedDiv = taskDisplay.querySelector('.completed');
        completedDiv.textContent = completed;

        taskDisplay.classList.remove('hidden');
    }

    /* Create a task option button. When clicked, a list of task actions will appear. */
    function taskOptionButton(key) {
        let button = buildElement('button', 'Task Button', 'options');

        /* Inserts task menu as a child of the task option button and then toggles its visibility */
        button.addEventListener('click', () => {
            // display task menu options
            viewTask(key, tasks[key]);

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
        // turn divs into input fields
        // 
    }

    return {
    }
}