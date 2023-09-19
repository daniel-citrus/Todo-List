

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
        let project = document.createElement('div');
        project.classList.add('project');
        project.dataset.id = key;

        let projectName = document.createElement('div');
        projectName.classList.add('name');
        projectName.textContent = name;
        project.appendChild(projectName);

        project.appendChild(projectOptionButton(key));

        return project;
    }

    function projectOptions(key) {
        console.log(key);
    }

    function projectOptionButton(key) {
        let button = document.createElement('button');
        button.classList.add('options');

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
        let task = document.createElement('div');
        task.classList.add('task');
        task.dataset.id = key;
        task.dataset.priority = priority;
        task.dataset.completed = completed;

        let taskName = document.createElement('div');
        taskName.classList.add('title');
        taskName.textContent = title;
        task.appendChild(taskName);

        let taskDescription = document.createElement('div');
        taskDescription.classList.add('description');
        taskDescription.textContent = description;
        task.appendChild(taskDescription);

        let taskDueDate = document.createElement('div');
        taskDueDate.classList.add('dueDate');
        taskDueDate.textContent = dueDate;
        task.appendChild(taskDueDate);

        let options = document.createElement('button');
        options.classList.add('options');
        task.appendChild(taskOptionButton(key));

        return task;
    }

    function createTaskDisplay() {
        let wrapper = document.createElement('div');
        wrapper.classList.add('taskDisplayWrapper', 'hidden');
        wrapper.id = 'taskDisplay';

        let display = document.createElement('div');
        display.classList.add('taskDetails');
        wrapper.appendChild(display);

        let titleDiv = document.createElement('div');
        titleDiv.classList.add('title');
        display.appendChild(titleDiv);

        let descDiv = document.createElement('div');
        descDiv.classList.add('description');
        display.appendChild(descDiv);

        let dueDateDiv = document.createElement('div');
        dueDateDiv.classList.add('dueDate');
        display.appendChild(dueDateDiv);

        let priorityDiv = document.createElement('div');
        priorityDiv.classList.add('priority');
        display.appendChild(priorityDiv);

        let completedDiv = document.createElement('div');
        completedDiv.classList.add('completed');
        display.appendChild(completedDiv);

        let closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
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
        let button = document.createElement('button');
        button.classList.add('options');

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
        let menuContainer = document.createElement('div');
        menuContainer.classList.add('menuContainer');
        let menu = document.createElement('div')
        menu.classList.add('taskMenu');
        menu.appendChild(menuContainer);

        // view task
        // edit task
        // move task to a new project
        // delete task

        let button = document.createElement('button');
        button.addEventListener('click', () => {
            console.log('task options')
        })

        return menuContainer;
    }

    return {
    }
}