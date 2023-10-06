import { brain } from './barrel';

export default function () {
    let mainContainer,
        projectContainer, // Displays projects
        taskContainer,    // Displays tasks for selected project
        projectButtons,   // All buttons for creating projects
        projectDisplay,     // Modal containing form to create/edit project
        popperOverlay,    // Mouse click catcher for pop up menus
        taskButtons,      // All buttons for creating buttons
        taskDisplay,      // Displays task details (also serves as a form)
        currentProject;   // Current project selected

    /* Initializer */
    (() => {
        mainContainer = document.querySelector('.main');
        projectButtons = document.querySelectorAll("button.projectCreator");
        taskButtons = document.querySelectorAll("button.taskCreator");

        projectContainer = buildElement('div', '', 'projects');
        mainContainer.appendChild(projectContainer);

        taskContainer = buildElement('div', '', 'tasks');
        mainContainer.appendChild(taskContainer);

        projectDisplay = createProjectForm();
        taskDisplay = createTaskDisplay();

        popperOverlay = buildElement('div', '', 'popperOverlay', 'hidden');
        mainContainer.appendChild(popperOverlay);
    })();

    projectButtons.forEach((button) => {
        button.addEventListener('click', () => {
            /* openPopper(projectDisplay);
            projectFormCreateMode(); */
            brain.showData();
        })
    })

    taskButtons.forEach((button) => {
        button.addEventListener('click', () => {
            createNewTask();
        })
    })

    popperOverlay.addEventListener('click', (e) => {
        if (e.target !== popperOverlay) { return; }

        closePopper();
    })

    function closePopper() {
        popperOverlay.classList.add('hidden');
        popperOverlay.innerHTML = ``;
    }

    function openPopper(elem, xCoord = undefined, yCoord = undefined) {
        if (xCoord !== undefined) {
            elem.style.left = `${xCoord}px`;
            elem.style.top = `${yCoord}px`;
        }

        if (!elem) { return; }

        popperOverlay.appendChild(elem);
        popperOverlay.classList.remove('hidden');
    }

    /**
     * Creates a project DOM element and inserts it into the project list element
     * @param {*} id project id
     * @param {*} name project name
     * @returns project DOM element
     **/
    function buildProjectElement(id, name) {
        let projectNode = buildElement('div', '', 'project');
        projectNode.dataset.id = id;

        let projectName = buildElement('div', name, 'name');
        projectNode.appendChild(projectName);
        projectNode.appendChild(projectOptionButton(id));
        insertProject(projectNode);

        projectNode.addEventListener('click', () => {
            displayProjectTasks(id);
            currentProject = id;
        })
    }

    /**
     * Get all tasks from a project and display it into the taskContainer
     * @param {*} projectID 
     * @returns boolean
     */
    function displayProjectTasks(projectID) {
        taskContainer.innerHTML = '';

        let tasks = brain.getProjectTasks(projectID);

        if (tasks === false || tasks.length === 0) { return false; }

        tasks.forEach((taskID) => {
            let task = brain.getTaskDetails(taskID);

            if (!task) { return false; }

            taskContainer.appendChild(buildTask(task));
        })

        return true;
    }

    /**
     * Build a DOM Element
     * @param {*} tagName element tag
     * @param {*} content text content
     * @param  {...any} classList class names
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
    function projectOptions(key) {
        let actions = [
            ['Edit', updateProjectForm],
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
            openPopper(projectOptions(key), rect.left - 17, rect.top + button.offsetHeight);
            e.stopPropagation(); // prevent clicking project 
        })

        return button;
    }

    function updateProjectForm(key) {
        openPopper(projectDisplay);

        let projectName = document.querySelector(`.projects .project[data-id="${key}"] .name`).textContent;

        if (!projectName) {
            console.error(`Project element does not exist - Key: ${key}`)
            return;
        }

        document.getElementById('projectName').value = projectName;
        projectDisplay.querySelector('button.create').classList.add('hidden');
        projectDisplay.querySelector('button.submit').classList.remove('hidden');
        projectDisplay.querySelector('button.cancel').classList.remove('hidden');
        projectDisplay.dataset.id = key;
    }

    function deleteProject(key) {
        brain.deleteProject(key);

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
    function buildTask(taskObj) {
        let {
            id = undefined,
            title = '',
            description = '',
            dueDate = '',
            priority = '',
            completed = false,
        } = taskObj;

        if (id === undefined) { return; }
        /* Store Key, priority level, completed status */
        let task = buildElement('div', '', 'task');
        task.dataset.id = id;
        task.dataset.priority = priority;
        task.dataset.completed = completed;

        task.appendChild(buildElement('div', title, 'title'));
        task.appendChild(buildElement('div', description, 'description'));
        task.appendChild(buildElement('div', dueDate, 'dueDate'));
        let options = buildElement('button', '', 'options');
        // generate option buttons and display
        task.appendChild(taskOptionButton(id));

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
            <input id="taskCompleted" name="taskCompleted" required disabled autocomplete='off'>
            <br/>
            <label for="taskName">
                Task Name:
            </label>
            <br/>
            <input type="text" id="taskName" name="taskName" required disabled autocomplete='off'>
            <br/>
            <label for="taskDueDate">
                Due Date:
            </label>
            <br/>
            <input type="date" id="taskDueDate" name="taskDueDate" required disabled autocomplete='off'>
            <br/>
            <label for="taskPriority">
                Priority:
            </label>
            <br/>
            <input id="taskPriority" name="taskPriority" required disabled autocomplete='off'>
            <br/>
            <label for="taskDesc">
                Description:
            </label>
            <br/>
            <input type="text" id="taskDesc" name="taskDesc" required disabled autocomplete='off'>
            <br/>
        `

        let buttons = buildElement('div', '', 'buttons');

        let createButton = buildElement('button', 'Create', 'create');
        createButton.type = 'button';
        createButton.addEventListener('click', () => {

        })
        buttons.appendChild(createButton);

        let editButton = buildElement('button', 'Edit', 'edit');
        editButton.type = 'button';
        editButton.addEventListener('click', () => { editTask(+taskDisplay.dataset.taskId); })
        buttons.appendChild(editButton);

        let submitEditButton = buildElement('button', 'Submit', 'submit', 'hidden');
        submitEditButton.type = 'button';
        submitEditButton.addEventListener('click', () => { submitTaskDetails(); })
        buttons.appendChild(submitEditButton);

        let cancelEditButton = buildElement('button', 'Cancel', 'cancel', 'hidden');
        cancelEditButton.type = 'button';
        cancelEditButton.addEventListener('click', () => { cancelTaskDisplay(); })
        buttons.appendChild(cancelEditButton);

        let closeButton = buildElement('button', 'Close', 'close');
        closeButton.type = 'button';
        closeButton.addEventListener('click', () => { closePopper(); })
        buttons.appendChild(closeButton);
        display.appendChild(buttons);

        return display;
    }

    /* Displays the project display in creation mode */
    function projectFormCreateMode() {
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
        <label for=projectName>Project Name: </label>
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

    function createNewTask() {
        openPopper(taskDisplay);
        document.getElementById('taskCompleted').disabled = false;
        document.getElementById('taskName').disabled = false;
        document.getElementById('taskDueDate').disabled = false;
        document.getElementById('taskPriority').disabled = false;
        document.getElementById('taskDesc').disabled = false;
        taskDisplay.querySelector('button.edit').classList.add('hidden');
        taskDisplay.querySelector('button.submit').classList.remove('hidden');
        taskDisplay.querySelector('button.cancel').classList.add('hidden');
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
        taskDisplay.querySelector('button.cancel').classList.add('hidden');
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
     * Use task key to search the database for a task. Use the information from that task to populate the task display.
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

        let buttons = []
        // view task
        // edit task
        // move task to a new project
        // delete task

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

    /* Opens menu that lists out project names that the task can be moved to */
    function moveTask(key) {
        // brain stuff
        // get all project names except key's current project
        // event listener on each object option
        // move task to the project selected
    }

    /**
     * Generates a task move dropdown menu. This menu will list all avaialble projects that the task can be moved to.
    */
    function moveTaskMenu(key) {
        let menu = buildElement('div', '', 'moveTaskMenu');

        menu.appendChild(buildElement('button', 'Move to Project', 'moveTask'));

        let options;

        return menu;
    }

    function deleteTask(key) {
        // brain stuff
        let task = taskContainer.querySelector(`.task[data-id="${key}"]`);

        if (!task) {
            console.error(`Task element does not exist - Key: ${key}`);
            return;
        }

        task.remove();
    }

    return {
        buildTask,
        buildProjectElement,
        insertTask,
        insertProject,
    }
}