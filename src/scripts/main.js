import "../style/style.scss";
import { DomControl } from './barrel'
import { ProjectList } from './barrel'
import { TaskList } from './barrel'

let brain = (() => {
    let tasks;
    let projects;
    let domControl;

    // Initializer
    (() => {
        tasks = TaskList();
        projects = ProjectList();
        domControl = DomControl();

        loadData();
        displayAllProjects();
    })();

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

    function createProject(name) {
        let projectID = projects.addProject(name);
        let projectElement = domControl.createProjectElement(projectID, name);

        domControl.insertProject(projectElement);
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
        let projectKey = +domControl.getCurrentProject();

        if (projectKey == NaN || projectKey === false || projectKey === null) {
            console.error(`Invalid Project ID`);
            return;
        }

        let inputs = { projectKey, title, description, dueDate, priority, completed };
        let taskKey = tasks.addTask(inputs);

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
    function deleteTask(taskKey) {
        let projectKey = tasks.getProjectKey(taskKey);

        if (projectKey === null) { return false; }
        if (!tasks.deleteTask(taskKey)) { return false; }
        if (!projects.deleteTask(projectKey, taskKey)) { return false; }
        saveData();
        return true;
    }

    function getTaskDetails(taskKey) {
        return tasks.getTask(taskKey);
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
        if (projects.loadData() && tasks.loadData()) {
            console.log(`Loading Successful`);
        }
        else {
            deleteData();
            console.log(`Load Failed; Starting Clean`);
        }
        
        saveData();
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

    function deleteData() {
        projects.deleteAllProjects();
        tasks.deleteAllTasks();
    }

    function toggleTaskComplete(taskKey) {
        let result = tasks.toggleTaskComplete(taskKey);
        saveData();
        return result;
    }

    function displayAllTasks() {
        domControl.clearTaskList();

        tasks.processAllTasks((task) => {
            domControl.insertTask(domControl.createTaskElement(task.id, task));
        })
    }

    function displayAllProjects() {
        projects.processAllProjects((project) => {
            domControl.insertProject(domControl.createProjectElement(project.id, project.name));
        })
    }

    /**
     * Get all tasks from a project and display it into the taskContainer
     * @param {*} projectID 
     * @returns boolean
     */
    function displayProjectTasks(projectID) {
        domControl.clearTaskList();
        let tasks = getProjectTasks(projectID);
        
        tasks.forEach((taskID) => {
            let task = getTaskDetails(taskID);
            if (!task) {
                domControl.insertTask(domControl.createTaskCreatorButton());
                return false;
            }
            domControl.insertTask(domControl.createTaskElement(taskID, task));
        })

        domControl.insertTask(domControl.createTaskCreatorButton());
        domControl.sortTasksByDate();

        return true;
    }

    return {
        createProject,
        createTask,
        deleteProject,
        deleteTask,
        getTaskDetails,
        displayAllTasks,
        displayProjectTasks,
        updateTask,
        updateProject,
        showData,
        toggleTaskComplete,
    }
})();

export default brain;