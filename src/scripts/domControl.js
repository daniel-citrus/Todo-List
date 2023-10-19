import { brain } from './barrel';

export default function () {
    let mainContainer,
        header,
        contentContainer,      // Contains project and task containers
        projectContainer,      // Displays projects
        taskContainer,         // Displays all task related items
        taskList,              // Holds list of tasks
        projectButtons,        // All buttons for creating projects
        popperOverlay,         // Mouse click catcher for pop up menus
        defaultButtons,        // Default buttons (eg. All Tasks, This Week, etc.)
        taskButtons,           // All buttons for creating buttons

        projectDisplay,        // Modal containing form to create/edit project
        taskDisplay,           // Displays task details (also serves as a form)
        currentProject = null; // Current selected project

    /* Initializer */
    (() => {
        mainContainer = document.querySelector('.main');
        header = createHeader();
        mainContainer.appendChild(createHeader());

        contentContainer = buildElement('div', '', 'content');
        mainContainer.appendChild(contentContainer);

        projectContainer = buildElement('div', '', 'projects');
        projectContainer.classList.add('hidden');
        defaultButtons = createDefaultButtons();
        projectContainer.appendChild(defaultButtons);
        projectContainer.appendChild(createProjectCreatorButton());
        contentContainer.appendChild(projectContainer);

        taskContainer = buildElement('div', '', 'tasks');
        taskList = buildElement('ul','','taskList');
        taskContainer.appendChild(taskList);
        contentContainer.appendChild(taskContainer);

        projectDisplay = createProjectForm();
        taskDisplay = createTaskDisplay();

        popperOverlay = buildElement('div', '', 'popperOverlay', 'hidden');
        popperOverlay.addEventListener('click', (e) => {
            if (e.target !== popperOverlay) { return; }

            closePopper();
        })
        contentContainer.appendChild(popperOverlay);
    })();

    function createHeader() {
        let header = buildElement('header', '');

        header.appendChild(createMobileNavSwitch());

        let logo = buildElement('img', '', 'logo');
        logo.src = `https://placehold.co/300x50`;
        header.appendChild(logo);

        return header;
    }

    function createProjectCreatorButton() {
        let button = buildElement('button', 'Create Project', 'projectCreator');

        button.addEventListener('click', () => {
            openPopper(projectDisplay);
            displayProjectFormCreate();
        })

        return button;
    }

    function createMobileNavSwitch() {
        let button = buildElement('button', '', 'mobileNavSwitch');

        button.addEventListener('click', () => {
            projectContainer.classList.toggle('hidden');
        })

        return button;
    }

    function createTaskCreatorButton() {
        let button = buildElement('button', 'Create Task', 'taskCreator');

        button.addEventListener('click', () => {
            if (currentProject == NaN) { return; }
            openTaskDisplayCreate();
        })

        return button;
    }

    function closePopper() {
        popperOverlay.classList.add('hidden');
        popperOverlay.innerHTML = ``;
    }

    function openPopper(elem, xCoord = undefined, yCoord = undefined) {
        if (!elem) { return; }
        popperOverlay.appendChild(elem);

        if (xCoord !== undefined) {
            elem.style.left = `${xCoord}px`;
            elem.style.top = `${yCoord}px`;
        }

        popperOverlay.classList.remove('hidden');
    }

    function createDefaultButtons() {
        let buttons = [
            ['All Tasks', () => {
                brain.displayAllTasks();
                currentProject = null;
            }],
            /* ['Today', () => {
                currentProject = null;
            }],
            ['This Week', () => {
                currentProject = null;
            }], */
        ]

        let defaultButtons = buildElement('div', '', 'defaultButtons');

        buttons.forEach((button) => {
            let className = button[0].charAt(0).toLowerCase() + button[0].slice(1);
            className = className.replaceAll(' ', '');

            let buttonElem = buildElement('button', button[0], className);

            defaultButtons.appendChild(buttonElem);

            buttonElem.addEventListener('click', () => {
                clearSelectedProject();
                buttonElem.classList.add('selected');
                button[1]();
            })
        })

        return defaultButtons;
    }

    function clearSelectedProject() {
        let selected = projectContainer.querySelectorAll('.selected');
        selected.forEach((item) => {
            item.classList.remove('selected');
        })
    }

    /**
     * Creates a project DOM element and inserts it into the project list element
     * @param {*} id project id
     * @param {*} name project name
     * @returns project DOM element
     **/
    function createProjectElement(id, name) {
        let project = buildElement('div', '', 'project');
        project.dataset.id = id;

        let projectName = buildElement('button', name, 'name');
        project.appendChild(projectName);
        project.appendChild(projectOptionButton(id));
        project.addEventListener('click', () => {
            clearSelectedProject();
            project.classList.add('selected');
            brain.displayProjectTasks(id);
            currentProject = id;
        })

        return project;
    }

    function selectProject(projectKey) {
        let project = projectContainer.querySelector(`.project[data-id="${projectKey}"]`);
        if (!project) { return; }
        project.click();
    }

    /**
     * Build a DOM Element
     * @param {*} tagName element tag
     * @param {*} content text content
     * @param {strings} classList class names
     * @returns DOM element
     */
    function buildElement(tagName, content = '', ...classList) {
        let element = document.createElement(tagName);
        element.textContent = content;

        if (!classList.length) return element;

        classList.forEach((c) => {
            if (c == '') { return; }
            element.classList.add(c);
        })

        return element;
    }

    /* Create an element containing project options */
    function createProjectMenu(key) {
        let actions = [
            ['View', brain.displayProjectTasks],
            ['Edit', displayProjectFormEdit],
            ['Delete', deleteProject],
        ];

        let buttons = buildElement('div', '', 'projectMenuButtons');

        actions.forEach((action) => {
            let button = buildElement('button', action[0], action[0].toLowerCase());
            button.addEventListener('click', () => {
                closePopper();
                action[1](key);
            })
            buttons.appendChild(button);
        })


        return buttons;
    }

    function projectOptionButton(key) {
        let button = buildElement('button', '...', 'options');

        button.addEventListener('click', (e) => {
            var rect = button.getBoundingClientRect();
            e.stopPropagation(); // prevent clicking project 
            openPopper(createProjectMenu(key), rect.left, rect.top + button.offsetHeight);
        })

        return button;
    }

    /**
     * Open the project form in edit mode
     * @param {*} key 
     */
    function displayProjectFormEdit(projectKey) {
        let projectName = document.querySelector(`.projects .project[data-id="${projectKey}"] .name`).textContent;

        if (!projectName) {
            console.error(`Project element does not exist - Key: ${projectKey}`)
            return;
        }

        projectDisplay.querySelector('#projectName').value = projectName;
        projectDisplay.querySelector('button.create').classList.add('hidden');
        projectDisplay.querySelector('button.submit').classList.remove('hidden');
        projectDisplay.querySelector('button.cancel').classList.remove('hidden');
        projectDisplay.dataset.id = projectKey;

        openPopper(projectDisplay);
    }

    function deleteProject(projectKey) {
        brain.deleteProject(projectKey);

        let project = document.querySelector(`.projects .project[data-id="${projectKey}"]`);

        if (!project) {
            console.error(`Project element does not exist - Project Key: ${projectKey}`)
            return false;
        }

        project.remove();

        if (currentProject !== projectKey) { return true; }

        let projectButton = document.querySelector(`.projects .defaultButtons button`);

        if (projectButton) {
            projectButton.click();
        }

        return true;
    }

    /**
     * @returns currently selected project's ID
     */
    function getCurrentProject() {
        return currentProject;
    }

    function clearTaskList() {
        taskList.innerHTML = ``;
    }


    /**
     * Creates a task DOM element that has a custom data set called data-id. The element contains the task name, completion checkbox, and options button.
     * @param {*} id task ID
     * @param {*} inputs task object containing title, description, dueDate, priority, completed
     **/
    function createTaskElement(
        id,
        {
            projectKey,
            title,
            description,
            dueDate,
            priority,
            completed
        } = inputs) {

        /* Store Key, priority level, completed status */
        let task = buildElement('div', '', 'task');
        task.dataset.id = id;
        task.dataset.priority = priority;
        task.dataset.completed = completed;
        task.dataset.projectKey = projectKey;

        let completeTaskButton = buildElement('button', '', 'completeTask');
        completeTaskButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleTaskComplete(id);
        });

        task.appendChild(completeTaskButton);
        task.appendChild(buildElement('div', title, 'title'));
        task.appendChild(buildElement('div', description, 'description'));
        task.appendChild(buildElement('div', dueDate, 'dueDate'));
        task.appendChild(createTaskOptionButton(id));


        task.addEventListener('click', () => {
            displayTaskDetails(id);
        })

        return task;
    }

    /**
     * Insert a task element into the task container
     **/
    function insertTask(taskNode) {
        taskContainer.appendChild(taskNode);
    }

    /**
     * Insert a project element into the project container
     **/
    function insertProject(projectNode) {
        projectContainer.appendChild(projectNode);
    }

    /* Form element to display task details. This also serves as a form for creating and editing a task */
    function createTaskDisplay() {
        let display = buildElement('form', '', 'taskDetails');
        display.id = 'taskDisplay';

        display.innerHTML = `
            <label for="taskCompleted">
                Completed:
            </label>
            <br/>
            <input type="checkbox" id="taskCompleted" title='Completed' name="taskCompleted" disabled autocomplete='off'>
            <br/>
            <label for="taskName">
                Task Name
            </label>
            <br/>
            <input type="text" id="taskName" title="Task name" name="taskName" required disabled autocomplete='off'>
            <br/>
            <label for="taskDueDate">
                Due Date
            </label>
            <br/>
            <input type="date" id="taskDueDate" title="Due date" name="taskDueDate" required disabled autocomplete='off'>
            <br/>
            <label for="taskPriority">
                Priority
            </label>
            <br/>
            <select id="taskPriority" title="Priority level" name="taskPriority" required>
                <option value="1">1 - High</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5 - Low</option>
            </select>
            <br/>
            <label for="taskDesc">
                Description
            </label>
            <br/>
            <input type="text" id="taskDesc" title="Task description" name="taskDesc" autocomplete='off'>
            <br/>
        `

        let buttons = buildElement('div', '', 'buttons');

        let createButton = buildElement('button', 'Create', 'create');
        createButton.type = 'button';
        createButton.title = "Create";
        createButton.addEventListener('click', () => {
            if (!createTask()) {
                return;
            }

            closePopper();
        })
        buttons.appendChild(createButton);

        let editButton = buildElement('button', 'Edit', 'edit');
        editButton.type = 'button';
        editButton.title = "Edit";
        editButton.addEventListener('click', () => { editTask(+taskDisplay.dataset.taskId); })
        buttons.appendChild(editButton);

        let submitEditButton = buildElement('button', 'Submit', 'submit', 'hidden');
        submitEditButton.type = 'button';
        submitEditButton.title = 'Submit';
        submitEditButton.addEventListener('click', () => { submitTaskDetails(); })
        buttons.appendChild(submitEditButton);

        let cancelEditButton = buildElement('button', 'Cancel', 'cancel', 'hidden');
        cancelEditButton.type = 'button';
        cancelEditButton.title = 'Cancel';
        cancelEditButton.addEventListener('click', () => { cancelTaskDisplay(); })
        buttons.appendChild(cancelEditButton);

        let closeButton = buildElement('button', 'Close', 'close');
        closeButton.type = 'button';
        closeButton.title = 'Close';
        closeButton.addEventListener('click', () => { closePopper(); })
        buttons.appendChild(closeButton);
        display.appendChild(buttons);

        return display;
    }

    /* Displays the project display in creation mode */
    function displayProjectFormCreate() {
        document.getElementById('projectName').value = '';
        projectDisplay.querySelector('button.create').classList.remove('hidden');
        projectDisplay.querySelector('button.submit').classList.add('hidden');
        projectDisplay.querySelector('button.cancel').classList.remove('hidden');
    }

    /* Create new project in the brain */
    function createProject() {
        let projectName = document.getElementById('projectName');

        if (!projectName.validity.valid) { return; }

        let input = projectName.value;
        brain.createProject(input);
    }

    /**
     * Serves as a form to create or edit a project
     * @returns DOM element
     */
    function createProjectForm() {
        let form = buildElement('form', '', 'projectDetails');
        form.innerHTML = `
        <label for=projectName>Project Name</label>
        <input type="text" id="projectName" name="projectName" required autocomplete='off'>
        <br>
        `;

        let buttons = buildElement('div', '', 'buttons');

        let createButton = buildElement('button', 'Create', 'create', 'hidden');
        createButton.type = 'button';
        createButton.addEventListener('click', () => {
            createProject();
            closePopper();
        })
        buttons.appendChild(createButton);

        let submitButton = buildElement('button', 'Submit', 'submit', 'hidden');
        submitButton.type = 'button';
        submitButton.addEventListener('click', () => {
            submitProjectDetails();
            closePopper();
        })
        buttons.appendChild(submitButton);

        let cancelButton = buildElement('button', 'Cancel', 'cancel', 'hidden');
        cancelButton.type = 'button';
        cancelButton.addEventListener('click', () => {
            closePopper();
        })
        buttons.appendChild(cancelButton);

        form.appendChild(buttons);

        return form;
    }

    /**
     * Submit all inputs on the project form to the brain to update information.
     */
    function submitProjectDetails() {
        let key = projectDisplay.dataset.id;

        if (key === 'undefined') { return; }

        /* Input field for project name */
        let projectName = document.getElementById('projectName');

        if (!projectName.validity.valid) { return; }

        if (brain.updateProject(+key, projectName.value)) {
            projectContainer.querySelector(`.project[data-id="${key}"] .name`).textContent = projectName.value;
        }
    }

    /**
     * Open the taskDisplay in creation mode using the popper overlay
     */
    function openTaskDisplayCreate() {
        let tComplete = taskDisplay.querySelector('#taskCompleted');
        tComplete.checked = false;
        tComplete.disabled = false;

        let tName = taskDisplay.querySelector('#taskName');
        tName.value = '';
        tName.disabled = false;

        let tDue = taskDisplay.querySelector('#taskDueDate');
        tDue.valueAsDate = new Date();
        tDue.disabled = false;

        let tPriority = taskDisplay.querySelector('#taskPriority');
        tPriority.value = '';
        tPriority.disabled = false;

        let tDesc = taskDisplay.querySelector('#taskDesc');
        tDesc.value = '';
        tDesc.disabled = false;

        taskDisplay.querySelector('button.create').classList.remove('hidden');
        taskDisplay.querySelector('button.edit').classList.add('hidden');
        taskDisplay.querySelector('button.submit').classList.add('hidden');
        taskDisplay.querySelector('button.cancel').classList.add('hidden');

        openPopper(taskDisplay);
    }

    /**
     * Enables editing on the task display and displays it on the popper
     */
    function openTaskDisplayEdit() {
        taskDisplay.querySelector('#taskCompleted').disabled = false;
        taskDisplay.querySelector('#taskName').disabled = false;
        taskDisplay.querySelector('#taskDueDate').disabled = false;
        taskDisplay.querySelector('#taskPriority').disabled = false;
        taskDisplay.querySelector('#taskDesc').disabled = false;
        taskDisplay.querySelector('button.create').classList.add('hidden');
        taskDisplay.querySelector('button.edit').classList.add('hidden');
        taskDisplay.querySelector('button.submit').classList.remove('hidden');
        taskDisplay.querySelector('button.cancel').classList.remove('hidden');

        openPopper(taskDisplay);
    }

    /**
     * Populates the taskDisplay with the original task data from the brain. Disables editing mode and reverts back to viewing the taskDisplay.
     */
    function cancelTaskDisplay() {
        let key = taskDisplay.dataset.taskId;

        if (key == 'false') {
            console.error('Invalid task key');
            return;
        }

        if (populateTaskDisplay(+key) === false) { return };
        displayTaskDetails(key);
    }

    /* Use the task form to update task information in the brain */
    function submitTaskDetails() {
        let key = +taskDisplay.dataset.taskId;
        let completed = document.getElementById('taskCompleted').checked;
        let title = document.getElementById('taskName').value;
        let dueDate = document.getElementById('taskDueDate').value;
        let priority = document.getElementById('taskPriority').value;
        let description = document.getElementById('taskDesc').value;

        let updated = brain.updateTask(key, title, description, dueDate, priority, completed);
        if (!updated) { return; }

        updateTaskElement(key);
        displayTaskDetails(key);
        closePopper();
    }

    /**
     * Using the task ID, get task information from the brain. Use the information to update the task being displayed in the task container
     * @param {*} taskID 
     */
    function updateTaskElement(taskID) {
        let taskElem = document.querySelector(`.tasks .task[data-id="${taskID}"]`);
        if (!taskElem) { return; };

        let task = brain.getTaskDetails(taskID);
        if (!task) { return; }

        let { title = '', description = '', dueDate = '', priority = '', completed = '' } = task;

        taskElem.dataset.priority = priority;
        taskElem.dataset.completed = completed;
        taskElem.querySelector('.title').textContent = title;
        taskElem.querySelector('.description').textContent = description;
        taskElem.querySelector('.dueDate').textContent = dueDate;
    }

    /**
     * Use task key to search the database for a task. Use the information from that task to populate the task display.
     * @param {*} key task key
     */
    function populateTaskDisplay(key) {
        let task = brain.getTaskDetails(key);
        if (!task) { return false; }

        let { title = '', description = '', dueDate = '', priority = '', completed = false } = task;

        taskDisplay.dataset.taskId = key;
        taskDisplay.querySelector('#taskCompleted').checked = completed;
        taskDisplay.querySelector('#taskName').value = title;

        let date = new Date(dueDate);
        taskDisplay.querySelector('#taskDueDate').valueAsDate = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);

        taskDisplay.querySelector('#taskPriority').value = priority;
        taskDisplay.querySelector('#taskDesc').value = description;
    }

    /* Create a task option button. When clicked, a list of task actions will appear. */
    function createTaskOptionButton(taskKey) {
        let button = buildElement('button', 'Task Button', 'options');

        /* Insert task menu as a child of the task option button and then toggles its visibility */
        button.addEventListener('click', (e) => {
            var rect = button.getBoundingClientRect();
            e.stopPropagation(); // prevent clicking project 
            openPopper(createTaskMenu(taskKey), rect.left, rect.top + button.offsetHeight);
        })

        return button;
    }

    /**
     * Returns a menu element that contains task options.
     * Call the brain and passes the task key to perform operations to the task database.
     * @param {*} taskKey task key
     */
    function createTaskMenu(taskKey) {
        let actions = [
            ['View', displayTaskDetails],
            ['Edit', editTask],
            /* ['Move', moveTask], */
            ['Delete', deleteTask],
        ]

        let buttons = buildElement('div', '', 'taskMenuButtons');

        actions.forEach((action) => {
            let button = buildElement('button', action[0], action[0].toLowerCase());
            button.addEventListener('click', () => {
                closePopper();
                action[1](taskKey);
            })
            buttons.appendChild(button);
        })

        return buttons;
    }

    /**
     * Command the brain to create a new task using information from the task display.
     * @returns if successful
     */
    function createTask() {
        let complete = document.getElementById('taskCompleted');
        let title = document.getElementById('taskName');
        let dueDate = document.getElementById('taskDueDate');
        let priority = document.getElementById('taskPriority');
        let desc = document.getElementById('taskDesc');

        if (!title.checkValidity()) {
            title.reportValidity();
            return false;
        }

        if (isNaN(new Date(dueDate.value))) {
            dueDate.setCustomValidity('Please enter a valid date.');
            dueDate.reportValidity();
            return false;
        }

        let priorityValue = +priority.value;
        if (isNaN(priorityValue) || priorityValue < 1 || priorityValue > 5) {
            priority.setCustomValidity('Please enter a valid priority level (1 - 5).');
            priority.reportValidity();
            return false;
        }

        brain.createTask(
            title.value,
            desc.value,
            new Date(dueDate.value.split('-')),
            priorityValue,
            complete.checked
        );

        return true;
    }

    function displayTaskDetails(key) {
        if (populateTaskDisplay(key) === false) { return };

        taskDisplay.querySelector('#taskCompleted').disabled = true;
        taskDisplay.querySelector('#taskName').disabled = true;
        taskDisplay.querySelector('#taskDueDate').disabled = true;
        taskDisplay.querySelector('#taskPriority').disabled = true;
        taskDisplay.querySelector('#taskDesc').disabled = true;
        taskDisplay.querySelector('button.create').classList.add('hidden');
        taskDisplay.querySelector('button.edit').classList.remove('hidden');
        taskDisplay.querySelector('button.submit').classList.add('hidden');
        taskDisplay.querySelector('button.cancel').classList.add('hidden');

        openPopper(taskDisplay);
    }

    function toggleTaskComplete(taskKey) {
        let task = taskContainer.querySelector(`.task[data-id="${taskKey}"`);
        if (!task) {
            return;
        }

        task.dataset.completed = (task.dataset.completed == "true") ? false : true;
        brain.toggleTaskComplete(taskKey);
    }

    /* Enable editing on the task display */
    function editTask(taskKey) {
        if (populateTaskDisplay(taskKey) === false) { return };
        openTaskDisplayEdit();
    }

    /* Opens menu that lists out project names that the task can be moved to */
    function moveTask(taskKey) {
        // brain stuff
        // get all project names except taskKey's current project
        // event listener on each object option
        // move task to the project selected
    }

    /**
     * Generates a menu that lists all avaialble projects that the task can be moved to.
    */
    function createMoveTaskMenu(taskKey) {
        let menu = buildElement('div', '', 'moveTaskMenu');

        menu.appendChild(buildElement('button', 'Move to Project', 'moveTask'));

        let options;

        return menu;
    }

    function deleteTask(taskID) {
        if (!brain.deleteTask(taskID)) { return };

        let task = taskContainer.querySelector(`.task[data-id="${taskID}"]`);

        if (!task) {
            console.error(`Task element does not exist - Key: ${taskID}`);
            return;
        }

        task.remove();
    }

    return {
        createTaskElement,
        createProjectElement,
        createTaskCreatorButton,
        clearTaskList,
        getCurrentProject,
        insertTask,
        insertProject,
        selectProject,
    }
}