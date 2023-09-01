/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style/style.scss":
/*!******************************!*\
  !*** ./src/style/style.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://todo-list/./src/style/style.scss?");

/***/ }),

/***/ "./src/scripts/barrel.js":
/*!*******************************!*\
  !*** ./src/scripts/barrel.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ProjectList: () => (/* reexport safe */ _projectList__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   TaskList: () => (/* reexport safe */ _taskList__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   brain: () => (/* reexport safe */ _main__WEBPACK_IMPORTED_MODULE_2__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _taskList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskList */ \"./src/scripts/taskList.js\");\n/* harmony import */ var _projectList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projectList */ \"./src/scripts/projectList.js\");\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main */ \"./src/scripts/main.js\");\n\r\n\r\n\n\n//# sourceURL=webpack://todo-list/./src/scripts/barrel.js?");

/***/ }),

/***/ "./src/scripts/domControl.js":
/*!***********************************!*\
  !*** ./src/scripts/domControl.js ***!
  \***********************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://todo-list/./src/scripts/domControl.js?");

/***/ }),

/***/ "./src/scripts/main.js":
/*!*****************************!*\
  !*** ./src/scripts/main.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _style_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/style.scss */ \"./src/style/style.scss\");\n/* harmony import */ var _barrel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./barrel */ \"./src/scripts/barrel.js\");\n\r\n\r\n\r\n\r\nlet brain = (() => {\r\n    let projects = (0,_barrel__WEBPACK_IMPORTED_MODULE_1__.ProjectList)();\r\n    let tasks = (0,_barrel__WEBPACK_IMPORTED_MODULE_1__.TaskList)();\r\n    /* \r\n        Adds a new task to the task list and saves its taskID in the project that it belongs to\r\n    */\r\n\r\n    let a = document.createElement('div');\r\n    let b = document.createElement('a');\r\n    \r\n    projects.addProject(a, 'Fitness');\r\n    projects.addProject(b, 'Knowledge');\r\n    projects.addTask(a, 5);\r\n    projects.addTask(a, 2);\r\n    projects.addTask(a, 62);\r\n    projects.addTask(a, 423);\r\n    projects.addTask(b, 54);\r\n    projects.addTask(a, 656);\r\n    projects.addTask(a, 762);\r\n    projects.deleteTask(a, 656);\r\n    projects.deleteTask(a, 62);\r\n    projects.showProjects()\r\n\r\n    tasks.addTask(['Pull Ups', 'Full range of motion', '9/4/2023', 4]);\r\n    tasks.addTask(['Dips', 'Heavy weight', '9/3/2023', 3]);\r\n    tasks.addTask(['Eat', 'Healthy balanced meal', '9/2/2023', 5]);\r\n    tasks.addTask(['Sleep', 'Full night of sleep with natural wake up', '9/2/2023', 5]);\r\n    tasks.addTask(['Study', 'Regular study session', '9/6/2023', 5]);\r\n\r\n    return {\r\n    }\r\n})();\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (brain);\n\n//# sourceURL=webpack://todo-list/./src/scripts/main.js?");

/***/ }),

/***/ "./src/scripts/projectList.js":
/*!************************************!*\
  !*** ./src/scripts/projectList.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ProjectList)\n/* harmony export */ });\n/* export default class Project extends Map {\r\n    constructor(name) {\r\n        super();\r\n        this.name = name;\r\n        this.storage = [];\r\n    }\r\n} */\r\n\r\n/* \r\n    Store projects and keep record of their tasks.\r\n    Map Structure:\r\n    projects = {\r\n        key -> {name, [task, task, task, ...]},\r\n        key -> {name, [task, task, task, ...]},\r\n        key -> {name, [task, task, task, ...]},\r\n        ...\r\n    }\r\n*/\r\nfunction ProjectList() {\r\n    let projects = new Map();\r\n\r\n    function newProject(name) {\r\n        return {\r\n            name: name,\r\n            tasks: [],\r\n        }\r\n    }\r\n\r\n    function addProject(key, name) {\r\n        projects.set(key, newProject(name));\r\n    }\r\n\r\n    function addTask(projectKey, taskID) {\r\n        let project = projects.get(projectKey);\r\n        project.tasks.push(taskID);\r\n    }\r\n\r\n    function deleteTask(projectKey, taskID) {\r\n        let project = projects.get(projectKey);\r\n        let tasks = project.tasks;\r\n        \r\n        for (let i in tasks) {\r\n            i = +i;\r\n            if (tasks[i] == taskID) {\r\n                tasks = tasks.slice(0, i).concat(tasks.slice(i + 1));\r\n                project.tasks = tasks;\r\n                return true;\r\n            }\r\n        }\r\n\r\n        console.error(`Invalid Task ID: ${taskID}`);\r\n        return false;\r\n    }\r\n\r\n    function showProjects() {\r\n        console.log(projects);\r\n    }\r\n\r\n    return {\r\n        addProject,\r\n        addTask,\r\n        deleteTask,\r\n        showProjects,\r\n    }\r\n}\n\n//# sourceURL=webpack://todo-list/./src/scripts/projectList.js?");

/***/ }),

/***/ "./src/scripts/taskList.js":
/*!*********************************!*\
  !*** ./src/scripts/taskList.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ TaskList)\n/* harmony export */ });\n/* export default class Task {\r\n    constructor(title, description, dueDate, priority, completed = false) {\r\n        this.title = title;\r\n        this.description = description;\r\n        this.dueDate = dueDate;\r\n        this.priority = priority;\r\n        this.completed = completed;\r\n    }\r\n}\r\n */\r\nfunction TaskList() {\r\n    let tasks = [];\r\n\r\n    function createTask(title, description, dueDate, priority, completed = false) {\r\n        return {\r\n            title: title, \r\n            description : description,\r\n            dueDate : dueDate,\r\n            priority : priority,\r\n            completed : completed,\r\n        }\r\n    }\r\n\r\n    /* Adds a new task object to the tasks array then returns the task ID */\r\n    function addTask(inputs) {\r\n        return tasks.push(createTask(...inputs));\r\n    }\r\n\r\n    function removeTask(key) {\r\n        if (key >= tasks.length || key < 0 || key == undefined) {\r\n            console.error(`Invalid Task Key: ${key}`);\r\n            return;\r\n        }\r\n\r\n        tasks = tasks.slice(0, key).concat(tasks.slice(key + 1));\r\n    }\r\n\r\n    function showTasks() {\r\n        console.log(tasks);\r\n    }\r\n\r\n    return {\r\n        addTask,\r\n        removeTask,\r\n        showTasks\r\n    }\r\n};\r\n\r\n/* \r\nlet inputs = [\r\n    ['Pull Ups', 'Full range of motion', '9/4/2023', 4],\r\n    ['Dips', 'Heavy weight', '9/3/2023', 3],\r\n    ['Eat', 'Healthy balanced meal', '9/2/2023', 5],\r\n    ['Sleep', 'Full night of sleep with natural wake up', '9/2/2023', 5],\r\n    ['Study', 'Regular study session', '9/6/2023', 5],\r\n]\r\n */\n\n//# sourceURL=webpack://todo-list/./src/scripts/taskList.js?");

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