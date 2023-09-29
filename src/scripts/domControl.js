import { brain } from './barrel';

export default function () {
    let mainContainer,
        projectContainer,
        taskContainer,
        projectButtons,
        projectModal,
        taskButtons,
        taskDisplay;

    /* Initializer */
    (() => {
        mainContainer = document.querySelector('.main');
        projectContainer = document.querySelector('.projects');
        taskContainer = document.querySelector('.tasks');
        projectButtons = document.querySelectorAll("button.projectCreator");
        taskButtons = document.querySelectorAll("button.taskCreator");

        projectModal = createProjectModal();
        mainContainer.appendChild(projectModal);

        taskDisplay = createTaskDisplay();
        taskContainer.appendChild(taskDisplay);
    })();

    projectButtons.forEach((button) => {
        button.addEventListener('click', () => {
            /* brain.createProject('Daniel'); */
            createProjectForm();
        })
    })

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
        insertProject(projectNode)
    }

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
        console.log(key);
    }

    function projectOptionButton(key) {
        let button = buildElement('button', '...', 'options');

        button.addEventListener('click', () => {
            /* projectOptions(key); */
            /* deleteProject(key); */
            updateProject(key);
        })

        return button;
    }

    function updateProject(key) {
        let projectName = document.querySelector(`.projects .project[data-id="${key}"] .name`).textContent;

        if (!projectName) {
            console.error(`Project element does not exist - Key: ${key}`)
            return;
        }

        document.getElementById('projectName').value = projectName;

        projectModal.querySelector('button.create').classList.add('hidden');
        projectModal.querySelector('button.submit').classList.remove('hidden');
        projectModal.querySelector('button.cancel').classList.remove('hidden');
        projectModal.dataset.id = key;
        projectModal.showModal();
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
        editButton.addEventListener('click', () => { editTask(+taskDisplay.dataset.taskId); })
        display.appendChild(editButton);

        let submitEditButton = buildElement('button', 'Submit', 'submit', 'hidden');
        submitEditButton.type = 'button';
        submitEditButton.addEventListener('click', () => { submitTaskDetails(); })
        display.appendChild(submitEditButton);

        let cancelEditButton = buildElement('button', 'Cancel', 'cancel', 'hidden');
        cancelEditButton.type = 'button';
        cancelEditButton.addEventListener('click', () => { cancelTaskDisplay(); })
        display.appendChild(cancelEditButton);

        let closeButton = buildElement('button', 'Close', 'close');
        closeButton.type = 'button';
        closeButton.addEventListener('click', () => { hideTaskDisplay(); })

        display.appendChild(closeButton);

        return wrapper;
    }

    /* Displays the project modal in creation mode */
    function createProjectForm() {
        document.getElementById('projectName').value = '';
        projectModal.querySelector('button.create').classList.remove('hidden');
        projectModal.querySelector('button.submit').classList.add('hidden');
        projectModal.querySelector('button.cancel').classList.remove('hidden');
        projectModal.showModal();
    }

    function createProject() {
        /* Input field for project name */
        let projectName = document.getElementById('projectName');

        if (!projectName.validity.valid) { return; }

        let input = projectName.value;
        brain.createProject(input);
        projectModal.close();
    }

    /**
     * Serves as a form to create or edit a project
     * @returns DOM element
     */
    function createProjectModal() {
        let wrapper = buildElement('dialog', '', 'projectModal');
        wrapper.dataset.id = undefined;
        wrapper.id = 'projectModal';

        wrapper.addEventListener('click', (e) => {
            if (e.target === wrapper) { wrapper.close(); }
        })

        let form = buildElement('form', '', 'projectDetails');
        form.innerHTML = `
        <label for=projectName>Project Name: </label>
        <input type="text" id="projectName" name="projectName" required>
        <br>
        `;

        let buttons = buildElement('div', '', 'buttons');

        let createButton = buildElement('button', 'Create', 'create', 'hidden');
        createButton.addEventListener('click', () => { createProject(); })
        buttons.appendChild(createButton);

        let submitButton = buildElement('button', 'Submit', 'submit', 'hidden');
        submitButton.addEventListener('click', () => { submitProjectDetails(); })
        buttons.appendChild(submitButton);

        let cancelButton = buildElement('button', 'Cancel', 'cancel', 'hidden');
        cancelButton.type = 'button';
        cancelButton.addEventListener('click', () => { wrapper.close(); })
        buttons.appendChild(cancelButton);

        wrapper.appendChild(form);
        wrapper.appendChild(buttons);

        return wrapper;
    }

    /**
     * Submit all inputs on the project modal form to the brain.
     */
    function submitProjectDetails() {
        let key = projectModal.dataset.id;

        if (key === 'undefined') { return; }

        /* Input field for project name */
        let projectName = document.getElementById('projectName');

        if (!projectName.validity.valid) { return; }

        if (brain.updateProject(+key, projectName.value)) {
            projectContainer.querySelector(`.project[data-id="${key}"] .name`).textContent = projectName.value;
        }

        projectModal.close();
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