import { brain } from './barrel';

export default function () {
    let mainContainer,
        projectContainer,   // Displays projects
        taskContainer,      // Displays tasks for selected project
        projectButtons,     // All buttons for creating projects
        projectDisplay,     // Modal containing form to create/edit project
        popperOverlay,      // Mouse click catcher for pop up menus
        taskButtons,        // All buttons for creating buttons
        taskDisplay,        // Displays task details (also serves as a form)
        currentProject = 0; // Current project selected, 0 by default

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
            createModeTaskDisplay();
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
    function createProjectElement(id, name) {
        let projectNode = buildElement('div', '', 'project');
        projectNode.dataset.id = id;

        let projectName = buildElement('div', name, 'name');
        projectNode.appendChild(projectName);
        projectNode.appendChild(projectOptionButton(id));
        insertProject(projectNode);

        projectNode.addEventListener('click', () => {
            displayProjectTasks(id);
            currentProject = id;
            console.log(`Current Project ID: ${currentProject}`);
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

            taskContainer.appendChild(createTaskElement(taskID, task));
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
            e.stopPropagation(); // prevent clicking project 
            openPopper(projectOptions(key), rect.left, rect.top + button.offsetHeight);
        })

        return button;
    }

    function updateProjectForm(key) {
        let projectName = document.querySelector(`.projects .project[data-id="${key}"] .name`).textContent;

        if (!projectName) {
            console.error(`Project element does not exist - Key: ${key}`)
            return;
        }

        projectDisplay.querySelector('#projectName').value = projectName;
        projectDisplay.querySelector('button.create').classList.add('hidden');
        projectDisplay.querySelector('button.submit').classList.remove('hidden');
        projectDisplay.querySelector('button.cancel').classList.remove('hidden');
        projectDisplay.dataset.id = key;

        openPopper(projectDisplay);
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
     * @returns currently selected project's ID
     */
    function getCurrentProject() {
        return currentProject;
    }


    /**
     * Creates a task DOM element that has a custom data set called data-id. The element contains the task name, completion checkbox, and options button.
     * @param {*} id task ID
     * @param {*} inputs task object containing title, description, dueDate, priority, completed
     **/
    function createTaskElement(
        id,
        {
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
            <select id="taskPriority" title="Priority level" name="taskPriority">
                <option value="" disabled>1 (High) - 5 (Low)</option>
                <option value=1>1 - High</option>
                <option value=2>2</option>
                <option value=3>3 - Medium</option>
                <option value=4>4</option>
                <option select value=5>5 - Low</option>
            </select>
            <br/>
            <label for="taskDesc">
                Description
            </label>
            <br/>
            <input type="text" id="taskDesc" title="Task description" name="taskDesc" required disabled autocomplete='off'>
            <br/>
        `

        let buttons = buildElement('div', '', 'buttons');

        let createButton = buildElement('button', 'Create', 'create');
        createButton.type = 'button';
        createButton.title = "Create";
        createButton.addEventListener('click', () => {
            createTask();
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

    /**
     * Open the taskDisplay in creation mode using the popper overlay
     */
    function createModeTaskDisplay() {
        let tComplete = taskDisplay.querySelector('#taskCompleted');
        tComplete.value = '';
        tComplete.disabled = false;

        let tName = taskDisplay.querySelector('#taskName');
        tName.value = '';
        tName.disabled = false;

        let tDue = taskDisplay.querySelector('#taskDueDate');
        tDue.value = '';
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
    function editTaskDisplay() {
        taskDisplay.querySelector('#taskCompleted').disabled = false;
        taskDisplay.querySelector('#taskName').disabled = false;
        taskDisplay.querySelector('#taskDueDate').disabled = false;
        taskDisplay.querySelector('#taskPriority').disabled = false;
        taskDisplay.querySelector('#taskDesc').disabled = false;
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

        let { title = '', description = '', dueDate = '', priority = '', completed = '' } = task;

        taskDisplay.dataset.taskId = key;
        taskDisplay.querySelector('#taskCompleted').value = completed;
        taskDisplay.querySelector('#taskName').value = title;
        taskDisplay.querySelector('#taskDueDate').valueAsDate = new Date(dueDate);
        taskDisplay.querySelector('#taskPriority').value = priority;
        taskDisplay.querySelector('#taskDesc').value = description;
    }

    /* Create a task option button. When clicked, a list of task actions will appear. */
    function taskOptionButton(key) {
        let button = buildElement('button', 'Task Button', 'options');

        /* Insert task menu as a child of the task option button and then toggles its visibility */
        button.addEventListener('click', () => {
            // display task menu options
            /* displayTaskDetails(key); */
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

    /**
     * Creates a new task using information from the task display. Create new task in the brain and also in the currently selected project.
     */
    function createTask() {
        let complete = document.getElementById('taskCompleted');
        let title = document.getElementById('taskName');
        let dueDate = document.getElementById('taskDueDate');
        let priority = document.getElementById('taskPriority');
        let desc = document.getElementById('taskDesc');

        if (isNaN(new Date(dueDate.value))) {
            dueDate.setCustomValidity('Please enter a valid date.');
            dueDate.reportValidity();
        }

        if (isNaN(priority.value) || priority.value < 0 || priority.value > 5) {
            priority.setCustomValidity('Please enter a valid priority level (1 - 5).');
            priority.reportValidity();
        }

        if (!taskDisplay.checkValidity()) {
            console.log(`Invalid taskDisplay input`);
            return;
        }

        brain.createTask(
            title.value,
            desc.value,
            new Date(dueDate.value).toString(),
            priority.value,
            complete.value
        );
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
        createTaskElement,
        createProjectElement,
        getCurrentProject,
        insertTask,
        insertProject,
    }
}