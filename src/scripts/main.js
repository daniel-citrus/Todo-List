import "../style/style.scss";
import { DomControl } from './barrel'
import { ProjectList } from './barrel'
import { TaskList } from './barrel'

let brain = (() => {
    let tasks = TaskList();
    let projects = ProjectList();
    let domControl = DomControl();

    let task1 = {
        title: 'Pull Ups',
        description: 'Quality reps',
        dueDate: new Date(2023, 8, 4),
        priority: 2,
        completed: true,
    };

    let task2 = {
        title: 'Dips',
        description: 'Heavy weight',
        dueDate: new Date(2023, 8, 3),
        priority: 3,
    }

    let task3 = {
        title: 'Eat',
        description: 'Healthy meals',
        dueDate: new Date(2023, 8, 2),
        priority: 1
    }

    let task4 = {
        title: 'Sleep',
        description: `Good sleep improves your brain performance, mood, and health.`,
        dueDate: new Date(2023, 8, 2),
        priority: 1
    }

    let task5 = {
        title: 'Study',
        description: 'Regular session',
        dueDate: new Date(2023, 8, 6),
        priority: 1,
    }

    let task6 = {
        title: 'Walk',
        description: 'Regular walk',
        dueDate: new Date(2024, 2, 6),
        priority: 1,
    }

    let task7 = {
        title: 'Run',
        description: 'Regular walk',
        dueDate: new Date(2023, 8, 20),
        priority: 2,
    }

    createProject('Tasks');
    createProject('Health');
    createProject('Fitness');

    projects.addTask(2, tasks.addTask(task1));
    projects.addTask(0, tasks.addTask(task2));
    projects.addTask(1, tasks.addTask(task3));
    projects.addTask(1, tasks.addTask(task4));
    projects.addTask(2, tasks.addTask(task5));
    projects.addTask(2, tasks.addTask(task6));
    projects.addTask(2, tasks.addTask(task7));
    console.clear();
    projects.showProjects();
    tasks.showTasks();
    /* localStorage.clear(); */

    function createProject(name) {
        let projectID = projects.addProject(name);
        let projectElement = domControl.createProjectElement(projectID, name);

        domControl.insertProject(projectElement);
        domControl.selectProject(projectID);
        saveData();
    }

    /**
     * Create a task and insert its details into a project, the task list, and display
     * @param {string} title 
     * @param {string} description 
     * @param {Date} dueDate 
     * @param {integer} priority 
     * @param {boolean} completed 
     */
    function createTask(title, description, dueDate, priority, completed) {
        let inputs = { title, description, dueDate, priority, completed };
        let projectKey = domControl.getCurrentProject();
        let taskKey = tasks.addTask({ title, description, dueDate, priority, completed });

        projects.addTask(projectKey, taskKey);

        if (domControl.getCurrentProject() === projectKey) {
            domControl.insertTask(domControl.createTaskElement(taskKey, inputs));
        }

        saveData();
    }

    function getProjectTasks(projectKey) {
        return projects.getTasks(projectKey);
    }

    /**
     * Delete a project and all tasks that it contains
     * @param {*} projectKey project key
     */
    function deleteProject(projectKey) {
        let tasksToDelete = projects.getTasks(projectKey);

        projects.deleteProject(projectKey);

        if (tasksToDelete === false) {
            console.error('Project has no tasks');
            return;
        }

        tasksToDelete.forEach((task) => {
            tasks.deleteTask(task);
        })

        saveData();
    }

    /**
     * @param {*} projectKey 
     * @param {*} taskKey 
     */
    function deleteTask(projectKey, taskKey) {
        if (!tasks.deleteTask(taskKey)) { return false; }
        if (!projects.deleteTask(projectKey, taskKey)) { return false; }

        return true;
    }

    function getTaskDetails(taskKey) {
        if (tasks.taskExists(taskKey) === false) { return false; }
        return tasks.getTask(taskKey);
    }

    function sortTasksByDate() {

    }

    function moveTask(projectKey, taskKey) {

    }

    /**
     * @param {*} key
     * @param {*} title
     * @param {*} description
     * @param {*} dueDate
     * @param {*} priority
     * @param {*} completed
     * @returns boolean indicating successful update
     */
    function updateTask(taskKey, title = undefined, description = undefined, dueDate = undefined, priority = undefined, completed = undefined) {
        let inputs = {
            title,
            description,
            dueDate: dueDate.replaceAll('-', '/'),
            priority,
            completed,
        };

        let result = tasks.updateTask(taskKey, inputs);

        if (!result) {
            console.error('Unable to update task');
        }

        tasks.showTasks();
        saveData();

        return result;
    }

    /**
     * @param {*} projectKey project key
     * @param {*} name new project name
     * @returns boolean indicating successful update
     */
    function updateProject(projectKey, name) {
        let result = projects.updateProjectName(projectKey, name);
        saveData();
        return result;
    }

    function loadData() {
        console.log(`Projects: ${projects.loadData()}`);
        console.log(`Tasks: ${tasks.loadData()}`);
    }

    function saveData() {
        projects.saveData();
        tasks.saveData();
    }

    function showData() {
        console.clear();
        projects.showProjects();
        tasks.showTasks();
    }

    function toggleTaskComplete(taskKey) {
        return tasks.toggleTaskComplete(taskKey);
    }
    
    return {
        createProject,
        createTask,
        deleteProject,
        deleteTask,
        getTaskDetails,
        getProjectTasks,
        updateTask,
        updateProject,
        showData,
        toggleTaskComplete,
    }
})();

export default brain;