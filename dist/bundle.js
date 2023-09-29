/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style/style.scss":
/*!******************************!*\
  !*** ./src/style/style.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://todo-list/./src/style/style.scss?");

/***/ }),

/***/ "./src/scripts/barrel.js":
/*!*******************************!*\
  !*** ./src/scripts/barrel.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DomControl: () => (/* reexport safe */ _domControl__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   ProjectList: () => (/* reexport safe */ _projectList__WEBPACK_IMPORTED_MODULE_2__[\"default\"]),\n/* harmony export */   TaskList: () => (/* reexport safe */ _taskList__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   brain: () => (/* reexport safe */ _main__WEBPACK_IMPORTED_MODULE_3__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _domControl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domControl */ \"./src/scripts/domControl.js\");\n/* harmony import */ var _taskList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./taskList */ \"./src/scripts/taskList.js\");\n/* harmony import */ var _projectList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projectList */ \"./src/scripts/projectList.js\");\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./main */ \"./src/scripts/main.js\");\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://todo-list/./src/scripts/barrel.js?");

/***/ }),

/***/ "./src/scripts/domControl.js":
/*!***********************************!*\
  !*** ./src/scripts/domControl.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _barrel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./barrel */ \"./src/scripts/barrel.js\");\n\r\n\r\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\r\n    let mainContainer,\r\n        projectContainer,\r\n        taskContainer,\r\n        projectButtons,\r\n        taskButtons,\r\n        taskDisplay;\r\n\r\n    /* Initializer */\r\n    (() => {\r\n        mainContainer = document.querySelector('.main');\r\n        projectContainer = document.querySelector('.projects');\r\n        taskContainer = document.querySelector('.tasks');\r\n        projectButtons = document.querySelectorAll(\"button.projectCreator\");\r\n        taskButtons = document.querySelectorAll(\"button.taskCreator\");\r\n\r\n        taskDisplay = createTaskDisplay();\r\n        taskContainer.appendChild(taskDisplay);\r\n\r\n    })();\r\n\r\n    projectButtons.forEach((button) => {\r\n        button.addEventListener('click', () => {\r\n            _barrel__WEBPACK_IMPORTED_MODULE_0__.brain.createProject('Daniel');\r\n        })\r\n    })\r\n\r\n    /**\r\n     * Creates a project DOM element that has a custom data set called data-id. The element contains the project name and options button.\r\n     * @param {*} id project id\r\n     * @param {*} name project name\r\n     * @returns project DOM element\r\n     **/\r\n    function buildProject(id, name) {\r\n        let projectNode = buildElement('div', '', 'project');\r\n        projectNode.dataset.id = id;\r\n\r\n        let projectName = buildElement('div', name, 'name');\r\n        projectNode.appendChild(projectName);\r\n        projectNode.appendChild(projectOptionButton(id));\r\n        insertProject(projectNode)\r\n    }\r\n\r\n    function buildElement(tagName, content = '', ...classList) {\r\n        let element = document.createElement(tagName);\r\n        element.textContent = content;\r\n\r\n        if (!classList.length) return element;\r\n\r\n        classList.forEach((c) => {\r\n            if (c == '') {\r\n                return\r\n            }\r\n            element.classList.add(c);\r\n        })\r\n\r\n        return element;\r\n    }\r\n\r\n    /* Create an element containing project options */\r\n    function projectOptions(key) {\r\n        console.log(key);\r\n    }\r\n\r\n    function projectOptionButton(key) {\r\n        let button = buildElement('button', '', 'options');\r\n\r\n        button.addEventListener('click', () => {\r\n            /* projectOptions(key); */\r\n            deleteProject(key);\r\n        })\r\n\r\n        return button;\r\n    }\r\n\r\n    function updateProjectName(key, name) {\r\n        let projectName = document.querySelector(`.projects .project[data-id=\"${key}\"]`);\r\n\r\n        if (!projectName) {\r\n            console.error(`Project element does not exist - Key: ${key}`)\r\n            return;\r\n        }\r\n\r\n        projectName.textContent = name;\r\n    }\r\n\r\n    function deleteProject(key) {\r\n        let project = document.querySelector(`.projects .project[data-id=\"${key}\"]`);\r\n\r\n        if (!project) {\r\n            console.error(`Project element does not exist - Key: ${key}`)\r\n            return false;\r\n        }\r\n\r\n        project.remove();\r\n        return true;\r\n    }\r\n\r\n    /**\r\n     * Creates a task DOM element that has a custom data set called data-id. The element contains the task name, completion checkbox, and options button.\r\n     * @param {*} key task id\r\n     * @param {*} task task object\r\n     **/\r\n    function buildTask(taskObj) {\r\n        let {\r\n            id = undefined,\r\n            title = '',\r\n            description = '',\r\n            dueDate = '',\r\n            priority = '',\r\n            completed = false,\r\n        } = taskObj;\r\n\r\n        if (id === undefined) { return; }\r\n        /* Store Key, priority level, completed status */\r\n        let task = buildElement('div', '', 'task');\r\n        task.dataset.id = id;\r\n        task.dataset.priority = priority;\r\n        task.dataset.completed = completed;\r\n\r\n        task.appendChild(buildElement('div', title, 'title'));\r\n        task.appendChild(buildElement('div', description, 'description'));\r\n        task.appendChild(buildElement('div', dueDate, 'dueDate'));\r\n        let options = buildElement('button', '', 'options');\r\n        // generate option buttons and display\r\n        task.appendChild(taskOptionButton(id));\r\n\r\n        return task;\r\n    }\r\n\r\n    /**\r\n     * Insert a task element into the task container\r\n     **/\r\n    function insertTask(taskNode) {\r\n        taskContainer.appendChild(taskNode);\r\n    }\r\n\r\n    /**\r\n     * Insert a project element into the project container\r\n     **/\r\n    function insertProject(projectNode) {\r\n        projectContainer.appendChild(projectNode);\r\n    }\r\n\r\n    /* Pop up to display task details. This container also serves as a form for creating and editing a task */\r\n    function createTaskDisplay() {\r\n        let wrapper = buildElement('div', '', 'taskDisplayWrapper', 'hidden')\r\n        wrapper.id = 'taskDisplay';\r\n\r\n        let display = buildElement('form', '', 'taskDetails');\r\n        wrapper.appendChild(display);\r\n\r\n        display.innerHTML = `\r\n            <label for=\"taskCompleted\">\r\n                Completed:\r\n            </label>\r\n            <br/>\r\n            <input id=\"taskCompleted\" name=\"taskCompleted\" required disabled>\r\n            <br/>\r\n            <label for=\"taskName\">\r\n                Task Name:\r\n            </label>\r\n            <br/>\r\n            <input type=\"text\" id=\"taskName\" name=\"taskName\" required disabled>\r\n            <br/>\r\n            <label for=\"taskDueDate\">\r\n                Due Date:\r\n            </label>\r\n            <br/>\r\n            <input type=\"date\" id=\"taskDueDate\" name=\"taskDueDate\" required disabled>\r\n            <br/>\r\n            <label for=\"taskPriority\">\r\n                Priority:\r\n            </label>\r\n            <br/>\r\n            <input id=\"taskPriority\" name=\"taskPriority\" required disabled>\r\n            <br/>\r\n            <label for=\"taskDesc\">\r\n                Description:\r\n            </label>\r\n            <br/>\r\n            <input type=\"text\" id=\"taskDesc\" name=\"taskDesc\" required disabled>\r\n            <br/>\r\n        `\r\n\r\n        let editButton = buildElement('button', 'Edit', 'edit');\r\n        editButton.type = 'button';\r\n        editButton.addEventListener('click', () => {\r\n            editTask(+taskDisplay.dataset.taskId);\r\n        })\r\n        display.appendChild(editButton);\r\n\r\n        let submitEditButton = buildElement('button', 'Submit', 'submit', 'hidden');\r\n        submitEditButton.type = 'button';\r\n        submitEditButton.addEventListener('click', () => {\r\n            submitTaskDetails();\r\n        })\r\n        display.appendChild(submitEditButton);\r\n\r\n        let cancelEditButton = buildElement('button', 'Cancel', 'cancel', 'hidden');\r\n        cancelEditButton.type = 'button';\r\n        cancelEditButton.addEventListener('click', () => {\r\n            cancelTaskDisplay();\r\n        })\r\n        display.appendChild(cancelEditButton);\r\n\r\n        let closeButton = buildElement('button', 'Close', 'close');\r\n        closeButton.type = 'button';\r\n        closeButton.addEventListener('click', () => {\r\n            hideTaskDisplay();\r\n        })\r\n\r\n        display.appendChild(closeButton);\r\n\r\n        return wrapper;\r\n    }\r\n\r\n    /**\r\n     * Disable task display input fields and show the display\r\n     */\r\n    function viewTaskDisplay() {\r\n        document.getElementById('taskCompleted').disabled = true;\r\n        document.getElementById('taskName').disabled = true;\r\n        document.getElementById('taskDueDate').disabled = true;\r\n        document.getElementById('taskPriority').disabled = true;\r\n        document.getElementById('taskDesc').disabled = true;\r\n        taskDisplay.querySelector('button.edit').classList.remove('hidden');\r\n        taskDisplay.querySelector('button.submit').classList.add('hidden');\r\n        taskDisplay.querySelector('button.cancel').classList.add('hidden');\r\n        taskDisplay.classList.remove('hidden');\r\n    }\r\n\r\n    function hideTaskDisplay() {\r\n        taskDisplay.classList.add('hidden');\r\n    }\r\n\r\n    /**\r\n     * Enables task display input fields for editing\r\n     */\r\n    function editTaskDisplay() {\r\n        document.getElementById('taskCompleted').disabled = false;\r\n        document.getElementById('taskName').disabled = false;\r\n        document.getElementById('taskDueDate').disabled = false;\r\n        document.getElementById('taskPriority').disabled = false;\r\n        document.getElementById('taskDesc').disabled = false;\r\n        taskDisplay.querySelector('button.edit').classList.add('hidden');\r\n        taskDisplay.querySelector('button.submit').classList.remove('hidden');\r\n        taskDisplay.querySelector('button.cancel').classList.remove('hidden');\r\n        taskDisplay.classList.remove('hidden');\r\n    }\r\n\r\n    function cancelTaskDisplay() {\r\n        let key = taskDisplay.dataset.taskId;\r\n\r\n        if (key == 'false') {\r\n            console.error('Invalid task key');\r\n            return;\r\n        }\r\n\r\n        if (populateTaskDisplay(+key) === false) { return };\r\n        viewTaskDisplay();\r\n    }\r\n\r\n    function submitTaskDetails() {\r\n        let key = +taskDisplay.dataset.taskId;\r\n        let completed = document.getElementById('taskCompleted').value;\r\n        let title = document.getElementById('taskName').value;\r\n        let dueDate = document.getElementById('taskDueDate').value;\r\n        let priority = document.getElementById('taskPriority').value;\r\n        let description = document.getElementById('taskDesc').value;\r\n\r\n        _barrel__WEBPACK_IMPORTED_MODULE_0__.brain.updateTask(key, title, description, dueDate, priority, completed);\r\n        if (populateTaskDisplay(key) === false) { return };\r\n        viewTaskDisplay();\r\n    }\r\n\r\n    /**\r\n     * Use task key to search the database for a task. Use the information from that task to populate the task display.\r\n     * @param {*} key task key\r\n     */\r\n    function populateTaskDisplay(key) {\r\n        let task = _barrel__WEBPACK_IMPORTED_MODULE_0__.brain.getTaskDetails(key);\r\n\r\n        if (!task) { return false; }\r\n\r\n        let { title = '', description = '', dueDate = '', priority = '', completed = '' } = task;\r\n\r\n        taskDisplay.dataset.taskId = key;\r\n        document.getElementById('taskCompleted').value = completed;\r\n        document.getElementById('taskName').value = title;\r\n        document.getElementById('taskDueDate').valueAsDate = dueDate;\r\n        document.getElementById('taskPriority').value = priority;\r\n        document.getElementById('taskDesc').value = description;\r\n    }\r\n\r\n    /* Create a task option button. When clicked, a list of task actions will appear. */\r\n    function taskOptionButton(key) {\r\n        let button = buildElement('button', 'Task Button', 'options');\r\n\r\n        /* Insert task menu as a child of the task option button and then toggles its visibility */\r\n        button.addEventListener('click', () => {\r\n            // display task menu options\r\n            /* if (populateTaskDisplay(key) === false) { return };\r\n            viewTaskDisplay(); */\r\n            deleteTask(key);\r\n        })\r\n\r\n        return button;\r\n    }\r\n\r\n    /**\r\n     * Returns a menu element that contains task options.\r\n     * Call the brain and passes the task key to perform operations to the task database.\r\n     * @param {*} key task key\r\n     */\r\n    function createTaskMenu(key) {\r\n        let menuContainer = buildElement('div', '', 'menuContainer');\r\n        let menu = buildElement('div', '', 'taskMenu');\r\n        menu.appendChild(menuContainer);\r\n\r\n        let buttons = []\r\n        // view task\r\n        // edit task\r\n        // move task to a new project\r\n        // delete task\r\n\r\n        return menuContainer;\r\n    }\r\n\r\n    function viewTask(key) {\r\n        if (populateTaskDisplay(key) === false) { return };\r\n        viewTaskDisplay();\r\n    }\r\n\r\n    /* Enable editing on the task display */\r\n    function editTask(key) {\r\n        if (populateTaskDisplay(key) === false) { return };\r\n        editTaskDisplay();\r\n    }\r\n\r\n    /* Opens menu that lists out project names that the task can be moved to */\r\n    function moveTask(key) {\r\n        // brain stuff\r\n        // get all project names except key's current project\r\n        // event listener on each object option\r\n        // move task to the project selected\r\n    }\r\n\r\n    /**\r\n     * Generates a task move dropdown menu. This menu will list all avaialble projects that the task can be moved to.\r\n    */\r\n    function moveTaskMenu(key) {\r\n        let menu = buildElement('div', '', 'moveTaskMenu');\r\n\r\n        menu.appendChild(buildElement('button', 'Move to Project', 'moveTask'));\r\n\r\n        let options;\r\n\r\n        return menu;\r\n    }\r\n\r\n    function deleteTask(key) {\r\n        // brain stuff\r\n        let task = taskContainer.querySelector(`.task[data-id=\"${key}\"]`);\r\n\r\n        if (!task) {\r\n            console.error(`Task element does not exist - Key: ${key}`);\r\n            return;\r\n        }\r\n\r\n        task.remove();\r\n    }\r\n\r\n    return {\r\n        buildTask,\r\n        buildProject,\r\n        insertTask,\r\n        insertProject,\r\n    }\r\n}\n\n//# sourceURL=webpack://todo-list/./src/scripts/domControl.js?");

/***/ }),

/***/ "./src/scripts/main.js":
/*!*****************************!*\
  !*** ./src/scripts/main.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _style_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/style.scss */ \"./src/style/style.scss\");\n/* harmony import */ var _barrel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./barrel */ \"./src/scripts/barrel.js\");\n\r\n\r\n\r\n\r\n\r\nlet brain = (() => {\r\n    let tasks = (0,_barrel__WEBPACK_IMPORTED_MODULE_1__.TaskList)();\r\n    let projects = (0,_barrel__WEBPACK_IMPORTED_MODULE_1__.ProjectList)();\r\n    let domControl = (0,_barrel__WEBPACK_IMPORTED_MODULE_1__.DomControl)();\r\n\r\n    let task1 = {\r\n        title: 'Pull Ups',\r\n        description: 'Quality reps',\r\n        dueDate: new Date('2023-09-04'),\r\n        priority: 2,\r\n        completed: true,\r\n    };\r\n\r\n    let task2 = {\r\n        title: 'Dips',\r\n        description: 'Heavy weight',\r\n        dueDate: new Date('2023-9-3'),\r\n        priority: 3,\r\n    }\r\n\r\n    let task3 = {\r\n        title: 'Eat',\r\n        description: 'Healthy meals',\r\n        dueDate: new Date('2023-9-2'),\r\n        priority: 1\r\n    }\r\n\r\n    let task4 = {\r\n        title: 'Sleep',\r\n        description: `Good sleep improves your brain performance, mood, and health.\r\n                Not getting enough quality sleep regularly raises the risk of many diseases and disorders. These range from heart disease and stroke to obesity and dementia.\r\n                There’s more to good sleep than just the hours spent in bed, says Dr. Marishka Brown, a sleep expert at NIH. “Healthy sleep encompasses three major things,” she explains. “One is how much sleep you get. Another is sleep quality—that you get uninterrupted and refreshing sleep. The last is a consistent sleep schedule.”`,\r\n        dueDate: new Date('2023-9-2'),\r\n        priority: 1\r\n    }\r\n\r\n    let task5 = {\r\n        title: 'Study',\r\n        description: 'Regular session',\r\n        dueDate: new Date('2023-9-6'),\r\n        priority: 1,\r\n    }\r\n\r\n    createProject('Health');\r\n    createProject('Health1');\r\n    createProject('Health2');\r\n\r\n    /* projects.addTask(2, tasks.addTask(task1));\r\n    projects.addTask(0, tasks.addTask(task2));\r\n    projects.addTask(1, tasks.addTask(task3));\r\n    projects.addTask(1, tasks.addTask(task4));\r\n    projects.addTask(2, tasks.addTask(task5)); */\r\n    tasks.showTasks();\r\n    localStorage.clear();\r\n\r\n\r\n    function createProject(name) {\r\n        // Create a new project\r\n        let projectID = projects.addProject(name);\r\n        // Create new project element in dom (passing project key)\r\n        domControl.buildProject(projectID, name);\r\n    }\r\n\r\n    function createTask(inputs, projectKey) {\r\n        // add a new task in tasks\r\n        let taskKey = tasks.addTask(inputs);\r\n        // insert task into project\r\n        projects.addTask(projectKey, taskKey);\r\n        // insert a new task element in DOM\r\n\r\n        saveData();\r\n    }\r\n\r\n    /**\r\n     * Delete a project and all tasks that it contains\r\n     * @param {*} key project key\r\n     */\r\n    function deleteProject(key) {\r\n        // use project key to delete it in projects\r\n        let tasksToDelete = projects.getTasks(key);\r\n\r\n        if (tasksToDelete === false) {\r\n            console.log('Project has no tasks');\r\n            return;\r\n        }\r\n\r\n        /* tasksToDelete.forEach(()=> {\r\n\r\n        }) */\r\n\r\n        // get task keys that have been deleted and use to delete from tasks\r\n        \r\n    }\r\n\r\n    function deleteTask(key, taskKey) {\r\n        // pass project key and task key to delete task from projects\r\n        // delete task from tasks\r\n    }\r\n\r\n    function getTaskDetails(key) {\r\n        if (tasks.taskExists(key) === false) { return false; }\r\n        return tasks.getTask(key);\r\n    }\r\n\r\n    function moveTask(projectKey, taskKey) {\r\n\r\n    }\r\n\r\n    function updateTask(key, title = undefined, description = undefined, dueDate = undefined, priority = undefined, completed = undefined,) {\r\n        let inputs = {\r\n            title,\r\n            description,\r\n            dueDate: dueDate.replaceAll('-', '/'),\r\n            priority,\r\n            completed,\r\n        };\r\n\r\n        let result = tasks.updateTask(key, inputs);\r\n\r\n        if (!result) {\r\n            console.error('Unable to update task');\r\n        }\r\n\r\n        tasks.showTasks();\r\n        saveData();\r\n\r\n        return result;\r\n    }\r\n\r\n    function loadData() {\r\n        console.log(`Projects: ${projects.loadData()}`);\r\n        console.log(`Tasks: ${tasks.loadData()}`);\r\n    }\r\n\r\n    function saveData() {\r\n        projects.saveData();\r\n        tasks.saveData();\r\n    }\r\n\r\n    return {\r\n        createProject,\r\n        deleteProject,\r\n        getTaskDetails,\r\n        updateTask,\r\n    }\r\n})();\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (brain);\n\n//# sourceURL=webpack://todo-list/./src/scripts/main.js?");

/***/ }),

/***/ "./src/scripts/projectList.js":
/*!************************************!*\
  !*** ./src/scripts/projectList.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ProjectList)\n/* harmony export */ });\n/* \r\n    Store projects and keep record of their tasks.\r\n    projects = [\r\n        { projectID, projectName, [taskID, taskID, taskID] },\r\n        { projectID, projectName, [taskID, taskID, taskID] },\r\n        { projectID, projectName, [taskID, taskID, taskID] },\r\n        ...\r\n    ]\r\n*/\r\nfunction ProjectList() {\r\n    let projects = [];\r\n\r\n    function createProject(name) {\r\n        return {\r\n            id: generateID(),\r\n            name,\r\n            tasks: [],\r\n        }\r\n    }\r\n\r\n    /* Create a new project, store it, then return the project's key */\r\n    function addProject(name) {\r\n        let project = createProject(name);\r\n        let key = project.id;\r\n        projects.splice(key, 0, project);\r\n        return key;\r\n    }\r\n\r\n    /* Delete an existing project and return the task keys that it contained */\r\n    function deleteProject(key) {\r\n        for (let p in projects) {\r\n            if (projects[p].id == key) {\r\n                projects.splice(key, 1);\r\n                return;\r\n            }\r\n        }\r\n\r\n        console.error('Invalid project key');\r\n    }\r\n\r\n    /* Store a task key in a project */\r\n    function addTask(key = 0, taskKey) {\r\n        let project = getProject(key);\r\n\r\n        if (!project) {\r\n            return\r\n        }\r\n\r\n        project.tasks.push(taskKey);\r\n    }\r\n\r\n    /* Delete task from a project */\r\n    function deleteTask(key, taskKey) {\r\n        let project = getProject(key);\r\n\r\n        if (!project) {\r\n            return;\r\n        }\r\n\r\n        for (let t in project.tasks) {\r\n            if (taskKey == project.tasks[t]) {\r\n                project.tasks.splice(t, 1);\r\n                return;\r\n            }\r\n        }\r\n\r\n        console.error('Invalid task key');\r\n    }\r\n\r\n    function updateProjectName(key, name) {\r\n        let projectIndex = getProjectIndex(key);\r\n\r\n        if (projectIndex === false) {\r\n            return false;\r\n        }\r\n\r\n        projects[projectIndex].name = name;\r\n        return true;\r\n    }\r\n\r\n    /**\r\n     * Returns project object if it exists in storage\r\n     * @param {*} key project key\r\n     * @returns object\r\n     */\r\n    function getProject(key) {\r\n        for (let p in projects) {\r\n            let project = projects[p];\r\n\r\n            if (project.id == key) {\r\n                return project;\r\n            }\r\n        }\r\n\r\n        console.error('Invalid project key');\r\n        return false;\r\n    }\r\n\r\n    function getProjectIndex(key) {\r\n        for (let p in projects) {\r\n            let projectID = projects[p].id;\r\n\r\n            if (projectID > key) {\r\n                break;\r\n            }\r\n\r\n            if (projectID == key) {\r\n                return p;\r\n            }\r\n        }\r\n\r\n        console.error('Invalid project key')\r\n        return false;\r\n    }\r\n\r\n    function getName(key) {\r\n        let project = getProject(key);\r\n\r\n        if (!project) {\r\n            return;\r\n        }\r\n\r\n        return project.name;\r\n    }\r\n\r\n    /**\r\n     * Return all tasks that belong to a project \r\n     * @returns array\r\n    */\r\n    function getTasks(key) {\r\n        let project = getProject(key);\r\n\r\n        if (project === false) {\r\n            return false;\r\n        }\r\n\r\n        return project.tasks;\r\n    }\r\n\r\n    function showProjects() {\r\n        console.log(projects);\r\n    }\r\n\r\n    function saveData() {\r\n        localStorage.setItem('Projects', JSON.stringify(projects));\r\n    }\r\n\r\n    function loadData() {\r\n        projects = JSON.parse(localStorage.getItem('Projects'));\r\n\r\n        if (projects === null) {\r\n            return false;\r\n        }\r\n\r\n        return true;\r\n    }\r\n\r\n\r\n    /**\r\n     * Generate a new ID for new entries. This will search for the lowest possible ID number.\r\n     \r\n     For example, if the existing IDs are: 0, 1, 2, 4, 5, 7\r\n     then the generated ID will be 3\r\n \r\n     If the existing IDs are 0, 1, 2, 3\r\n     then the generated ID will be 4\r\n     * @returns generated project ID\r\n     */\r\n    function generateID() {\r\n        let projectCount = projects.length;\r\n\r\n        if (projectCount == 0) {\r\n            return 0;\r\n        }\r\n\r\n        for (let p in projects) {\r\n            if (p < projects[p].id) {\r\n                projectCount = p;\r\n                break;\r\n            }\r\n        }\r\n\r\n        return +projectCount;\r\n    }\r\n\r\n    return {\r\n        addProject,\r\n        deleteProject,\r\n        updateProjectName,\r\n        addTask,\r\n        deleteTask,\r\n        getName,\r\n        getTasks,\r\n        saveData,\r\n        loadData,\r\n        showProjects,\r\n    }\r\n}\n\n//# sourceURL=webpack://todo-list/./src/scripts/projectList.js?");

/***/ }),

/***/ "./src/scripts/taskList.js":
/*!*********************************!*\
  !*** ./src/scripts/taskList.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ TaskList)\n/* harmony export */ });\nfunction TaskList() {\r\n    let tasks = [];\r\n\r\n    function createTask(inputs) {\r\n        let {\r\n            title = '',\r\n            description = '',\r\n            dueDate = '',\r\n            priority = 5,\r\n            completed = false,\r\n        } = inputs;\r\n\r\n        return {\r\n            id: generateID(),\r\n            title,\r\n            description,\r\n            dueDate,\r\n            priority,\r\n            completed,\r\n        }\r\n    }\r\n\r\n    /*\r\n    Generate a new ID for new entries. This will search for the lowest possible ID number.\r\n    \r\n    For example, if the existing IDs are: 0, 1, 2, 4, 5, 7\r\n    then the generated ID will be 3\r\n\r\n    If the existing IDs are 0, 1, 2, 3\r\n    then the generated ID will be 4\r\n    */\r\n    function generateID() {\r\n        let taskCount = tasks.length;\r\n\r\n        if (taskCount == 0) {\r\n            return 0;\r\n        }\r\n\r\n        for (let t in tasks) {\r\n            if (t < tasks[t].id) {\r\n                taskCount = t;\r\n                break;\r\n            }\r\n        }\r\n\r\n        return +taskCount;\r\n    }\r\n\r\n    /**\r\n     * Generates new task, inserts it into storage (in order), and returns the taskID\r\n     * @param {*} inputs object with the following properties: title, description, dueDate, priority, completed (boolean)\r\n     * @returns taskID integer\r\n     */\r\n    function addTask(inputs) {\r\n        let task = createTask(inputs);\r\n        let taskID = task.id;\r\n\r\n        tasks.splice(taskID, 0, task);\r\n        return taskID;\r\n    }\r\n\r\n    /* Delete a task from task list */\r\n    function deleteTask(key) {\r\n        if (tasks.length == 0) {\r\n            console.error(`No tasks to delete`);\r\n            return false;\r\n        }\r\n\r\n        for (let t in tasks) {\r\n            if (tasks[t].id == key) {\r\n                tasks.splice(t, 1);\r\n                return true;\r\n            }\r\n        }\r\n\r\n        return false;\r\n    }\r\n\r\n    /* Check if task ID exists in storage */\r\n    function taskExists(key) {\r\n        for (let task of tasks) {\r\n            let taskID = task.id;\r\n\r\n            if (taskID > key) {\r\n                break;\r\n            }\r\n\r\n            if (taskID == key) {\r\n                return true;\r\n            }\r\n        }\r\n\r\n        console.error('Invalid task key');\r\n        return false;\r\n    }\r\n\r\n    function updateTask(key, inputs) {\r\n        let index = getTaskIndex(key);\r\n\r\n        if (index === false) {\r\n            return false;\r\n        }\r\n\r\n        let {\r\n            title = undefined,\r\n            description = undefined,\r\n            dueDate = undefined,\r\n            priority = 5,\r\n            completed = false,\r\n        } = inputs;\r\n\r\n        if (title !== undefined) {\r\n            tasks[index].title = title;\r\n        }\r\n\r\n        if (description !== undefined) {\r\n            tasks[index].description = description;\r\n        }\r\n\r\n        if (dueDate !== undefined) {\r\n            tasks[index].dueDate = new Date(dueDate);\r\n        }\r\n\r\n        if (priority !== undefined) {\r\n            if (priority < 1 || priority > 5) {\r\n                priority = 5;\r\n            }\r\n\r\n            tasks[index].priority = priority;\r\n        }\r\n\r\n        if (completed !== undefined) {\r\n            tasks[index].completed = completed;\r\n        }\r\n\r\n        return true;\r\n    }\r\n\r\n    function getTask(key) {\r\n        let index = getTaskIndex(key);\r\n\r\n        if (index === false) {\r\n            return false;\r\n        }\r\n\r\n        return tasks[index];\r\n    }\r\n\r\n    function getTaskIndex(key) {\r\n        for (let taskIndex in tasks) {\r\n            let taskID = tasks[taskIndex].id;\r\n\r\n            if (taskID == key) {\r\n                return taskIndex;\r\n            }\r\n        }\r\n\r\n        console.error('Invalid task key');\r\n        return false;\r\n    }\r\n\r\n    function showTasks() {\r\n        console.log(tasks);\r\n    }\r\n\r\n    function saveData() {\r\n        localStorage.setItem('Tasks', JSON.stringify(tasks));\r\n    }\r\n\r\n    function loadData() {\r\n        tasks = JSON.parse(localStorage.getItem('Tasks'));\r\n\r\n        if (tasks === null) {\r\n            return false;\r\n        }\r\n\r\n        return true;\r\n    }\r\n\r\n    return {\r\n        addTask,\r\n        deleteTask,\r\n        loadData,\r\n        getTask,\r\n        saveData,\r\n        showTasks,\r\n        taskExists,\r\n        updateTask,\r\n    }\r\n};\n\n//# sourceURL=webpack://todo-list/./src/scripts/taskList.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/scripts/main.js");
/******/ 	__webpack_require__("./src/scripts/barrel.js");
/******/ 	__webpack_require__("./src/scripts/domControl.js");
/******/ 	__webpack_require__("./src/scripts/projectList.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/taskList.js");
/******/ 	
/******/ })()
;