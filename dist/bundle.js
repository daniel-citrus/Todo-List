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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ProjectList: () => (/* reexport safe */ _projectList__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   TaskList: () => (/* reexport safe */ _taskList__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   brain: () => (/* reexport safe */ _main__WEBPACK_IMPORTED_MODULE_2__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _taskList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskList */ \"./src/scripts/taskList.js\");\n/* harmony import */ var _projectList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projectList */ \"./src/scripts/projectList.js\");\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main */ \"./src/scripts/main.js\");\n\r\n\r\n\n\n//# sourceURL=webpack://todo-list/./src/scripts/barrel.js?");

/***/ }),

/***/ "./src/scripts/domControl.js":
/*!***********************************!*\
  !*** ./src/scripts/domControl.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ domControl)\n/* harmony export */ });\nfunction domControl() {\r\n    function createProject() {\r\n\r\n    }\r\n\r\n    function createTask() {\r\n        \r\n    }\r\n\r\n    return {\r\n\r\n    }\r\n}\n\n//# sourceURL=webpack://todo-list/./src/scripts/domControl.js?");

/***/ }),

/***/ "./src/scripts/main.js":
/*!*****************************!*\
  !*** ./src/scripts/main.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _style_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/style.scss */ \"./src/style/style.scss\");\n/* harmony import */ var _barrel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./barrel */ \"./src/scripts/barrel.js\");\n\r\n\r\n\r\n\r\nlet brain = (() => {\r\n    let tasks = (0,_barrel__WEBPACK_IMPORTED_MODULE_1__.TaskList)();\r\n    let projects = (0,_barrel__WEBPACK_IMPORTED_MODULE_1__.ProjectList)();\r\n\r\n    function createProject(name) {\r\n        // Create a new project\r\n        let projectID = projects.addProject(name);\r\n        // Create new project element in dom (passing project key)\r\n    }\r\n\r\n    function createTask(projectID, inputs) {\r\n        // add a new task in tasks\r\n        let taskID = tasks.addTask(inputs)\r\n        // insert task into project\r\n        // insert a new task element in DOM\r\n    }\r\n\r\n    function deleteProject(key) {\r\n        // use project key to delete it in projects\r\n        // get task keys that have been deleted and use to delete from tasks\r\n    }\r\n\r\n    function deleteTask(key, taskKey) {\r\n        // pass project key and task key to delete task from projects\r\n        // delete task from tasks\r\n    }\r\n\r\n    function loadData() {\r\n        // load projects\r\n        // load tasks\r\n    }\r\n\r\n    function saveData() {\r\n        // load projects\r\n        // load tasks\r\n    }\r\n\r\n    let task1 = {\r\n        title: 'Pull Ups',\r\n        description: 'Quality reps',\r\n        dueDate: '9/4/2023',\r\n        priority: 4,\r\n        completed: true,\r\n    };\r\n\r\n    let task2 = {\r\n        title: 'Dips',\r\n        description: 'Heavy weight',\r\n        dueDate: '9/3/2023',\r\n        priority: 3,\r\n    }\r\n\r\n    let task3 = {\r\n        title: 'Eat',\r\n        description: 'Healthy meals',\r\n        dueDate: '9/2/2023',\r\n        priority: 5\r\n    }\r\n\r\n    let task4 = {\r\n        title: 'Sleep',\r\n        description: 'Full night sleep',\r\n        dueDate: '9/2/2023',\r\n        priority: 5\r\n    }\r\n\r\n    let task5 = {\r\n        title: 'Study',\r\n        description: 'Regular session',\r\n        dueDate: '9/6/2023',\r\n        priority: 5,\r\n    }\r\n\r\n\r\n    projects.addProject('Health');\r\n    projects.addProject('Health1');\r\n    projects.addProject('Health2');\r\n\r\n    projects.addTask(2, tasks.addTask(task1));\r\n    projects.addTask(0, tasks.addTask(task2));\r\n    projects.addTask(1, tasks.addTask(task3));\r\n    projects.addTask(1, tasks.addTask(task4));\r\n    projects.addTask(2, tasks.addTask(task5));\r\n\r\n    tasks.showTasks();\r\n\r\n    return {\r\n    }\r\n})();\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (brain);\n\n//# sourceURL=webpack://todo-list/./src/scripts/main.js?");

/***/ }),

/***/ "./src/scripts/projectList.js":
/*!************************************!*\
  !*** ./src/scripts/projectList.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ProjectList)\n/* harmony export */ });\n/* \r\n    Store projects and keep record of their tasks.\r\n    projects = [\r\n        { projectID, prjectName, [taskID, taskID, taskID] },\r\n        { projectID, prjectName, [taskID, taskID, taskID] },\r\n        { projectID, prjectName, [taskID, taskID, taskID] },\r\n        ...\r\n    ]\r\n*/\r\nfunction ProjectList() {\r\n    let projects = [];\r\n\r\n    function createProject(name) {\r\n        return {\r\n            id: undefined,\r\n            name: name,\r\n            tasks: [],\r\n        }\r\n    }\r\n\r\n    /* Create a new project, store it, then return the project's key */\r\n    function addProject(name) {\r\n        let project = createProject(name);\r\n        let key = generateID();\r\n        project.id = key;\r\n        projects.splice(key, 0, project);\r\n        return key;\r\n    }\r\n\r\n    /* Delete an existing project and return the task keys that it contained */\r\n    function deleteProject(key) {\r\n        for (let p in projects) {\r\n            if (projects[p].id == key) {\r\n                projects.splice(key, 1);\r\n                return;\r\n            }\r\n        }\r\n\r\n        console.error('Invalid project key');\r\n    }\r\n\r\n    /* Store a task key in a project */\r\n    function addTask(key, taskKey) {\r\n        let project = getProject(key);\r\n\r\n        if (!project) {\r\n            return\r\n        }\r\n\r\n        project.tasks.push(taskKey);\r\n    }\r\n\r\n    /* Delete task from a project */\r\n    function deleteTask(key, taskKey) {\r\n        let project = getProject(key);\r\n\r\n        if (!project) {\r\n            return;\r\n        }\r\n\r\n        for (let task in project.tasks) {\r\n            if (taskKey == project.tasks[task]) {\r\n                project.tasks.splice(task, 1);\r\n                return;\r\n            }\r\n        }\r\n\r\n        console.error('Invalid task key');\r\n    }\r\n\r\n    function getProject(key) {\r\n        let project;\r\n        for (let p in projects) {\r\n            project = projects[p];\r\n\r\n            if (project.id == key) {\r\n                return project;\r\n            }\r\n        }\r\n\r\n        console.error('Invalid project key');\r\n        return false;\r\n    }\r\n\r\n    function getName(key) {\r\n        let project = getProject(key);\r\n\r\n        if (!project) {\r\n            return;\r\n        }\r\n\r\n        return project.name;\r\n    }\r\n\r\n    /**\r\n     * Return all tasks that belong to a project \r\n     * @returns array\r\n    */\r\n    function getTasks(key) {\r\n        let project = getProject(key);\r\n\r\n        if (!project) {\r\n            return;\r\n        }\r\n\r\n        return project.tasks;\r\n    }\r\n\r\n    function showProjects() {\r\n        console.log(projects);\r\n    }\r\n\r\n    function saveData() {\r\n        localStorage.setItem('Projects', JSON.stringify(projects));\r\n    }\r\n\r\n    function loadData() {\r\n        projects = JSON.parse(localStorage.getItem('Projects'));\r\n    }\r\n\r\n    /*\r\n    Generate a new ID for new entries. This will search for the lowest possible ID number.\r\n    \r\n    For example, if the existing IDs are: 0, 1, 2, 4, 5, 7\r\n    then the generated ID will be 3\r\n\r\n    If the existing IDs are 0, 1, 2, 3\r\n    then the generated ID will be 4\r\n    */\r\n    function generateID() {\r\n        let projectCount = projects.length;\r\n\r\n        if (projectCount == 0) {\r\n            return 0;\r\n        }\r\n\r\n        for (let p in projects) {\r\n            if (p < projects[p].id) {\r\n                projectCount = p;\r\n                break;\r\n            }\r\n        }\r\n\r\n        return +projectCount;\r\n    }\r\n\r\n    return {\r\n        addProject,\r\n        deleteProject,\r\n        addTask,\r\n        deleteTask,\r\n        getName,\r\n        getTasks,\r\n        saveData,\r\n        loadData,\r\n        showProjects,\r\n    }\r\n}\n\n//# sourceURL=webpack://todo-list/./src/scripts/projectList.js?");

/***/ }),

/***/ "./src/scripts/taskList.js":
/*!*********************************!*\
  !*** ./src/scripts/taskList.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ TaskList)\n/* harmony export */ });\nfunction TaskList() {\r\n    let tasks = [];\r\n\r\n    /* title, description, dueDate, priority, completed = false */\r\n    function createTask(inputs) {\r\n        let title='', description='', dueDate='', priority='', completed = false;\r\n\r\n        ({ title, description, dueDate, priority, completed } = inputs);\r\n\r\n        return {\r\n            id: generateID(),\r\n            title: title,\r\n            description: description,\r\n            dueDate: dueDate,\r\n            priority: priority,\r\n            completed: completed,\r\n        }\r\n    }\r\n\r\n    /*\r\n    Generate a new ID for new entries. This will search for the lowest possible ID number.\r\n    \r\n    For example, if the existing IDs are: 0, 1, 2, 4, 5, 7\r\n    then the generated ID will be 3\r\n\r\n    If the existing IDs are 0, 1, 2, 3\r\n    then the generated ID will be 4\r\n    */\r\n    function generateID() {\r\n        let taskCount = tasks.length;\r\n\r\n        if (taskCount == 0) {\r\n            return 0;\r\n        }\r\n\r\n        for (let t in tasks) {\r\n            if (t < tasks[t].id) {\r\n                taskCount = t;\r\n                break;\r\n            }\r\n        }\r\n\r\n        return +taskCount;\r\n    }\r\n\r\n    /* Generates new task and returns the taskID */\r\n    function addTask(inputs) {\r\n        let task = createTask(inputs);\r\n        let taskID = task.id;\r\n\r\n        tasks.splice(taskID, 0, task);\r\n\r\n        return taskID;\r\n    }\r\n\r\n    /* delete one or more tasks from task list */\r\n    function deleteTask(key) {\r\n        if (tasks.length == 0) {\r\n            console.error(`No tasks to delete`);\r\n            return false;\r\n        }\r\n\r\n        for (let t in tasks) {\r\n            if (tasks[t].id == key) {\r\n                tasks.splice(t, 1);\r\n                return true;\r\n            }\r\n        }\r\n\r\n        return false;\r\n    }\r\n\r\n    function showTasks() {\r\n        console.log(tasks);\r\n    }\r\n\r\n    function saveData() {\r\n        localStorage.setItem('Tasks', JSON.stringify(tasks));\r\n    }\r\n\r\n    function loadData() {\r\n        tasks = JSON.parse(localStorage.getItem('Tasks'));\r\n    }\r\n\r\n    return {\r\n        addTask,\r\n        deleteTask,\r\n        loadData,\r\n        showTasks,\r\n        saveData\r\n    }\r\n};\n\n//# sourceURL=webpack://todo-list/./src/scripts/taskList.js?");

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