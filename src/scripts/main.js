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
        dueDate: new Date('2023-09-04'),
        priority: 2,
        completed: true,
    };

    let task2 = {
        title: 'Dips',
        description: 'Heavy weight',
        dueDate: new Date('2023-9-3'),
        priority: 3,
    }

    let task3 = {
        title: 'Eat',
        description: 'Healthy meals',
        dueDate: new Date('2023-9-2'),
        priority: 1
    }

    let task4 = {
        title: 'Sleep',
        description: `Good sleep improves your brain performance, mood, and health.
                Not getting enough quality sleep regularly raises the risk of many diseases and disorders. These range from heart disease and stroke to obesity and dementia.
                There’s more to good sleep than just the hours spent in bed, says Dr. Marishka Brown, a sleep expert at NIH. “Healthy sleep encompasses three major things,” she explains. “One is how much sleep you get. Another is sleep quality—that you get uninterrupted and refreshing sleep. The last is a consistent sleep schedule.”`,
        dueDate: new Date('2023-9-2'),
        priority: 1
    }

    let task5 = {
        title: 'Study',
        description: 'Regular session',
        dueDate: new Date('2023-9-6'),
        priority: 1,
    }

    createProject('Tasks');
    createProject('Health');
    createProject('Fitness');

    projects.addTask(2, tasks.addTask(task1));
    projects.addTask(0, tasks.addTask(task2));
    projects.addTask(1, tasks.addTask(task3));
    projects.addTask(1, tasks.addTask(task4));
    projects.addTask(2, tasks.addTask(task5));
    console.clear();
    projects.showProjects();
    tasks.showTasks();
    /* localStorage.clear(); */

    function createProject(name) {
        let projectID = projects.addProject(name);
        let projectElement = domControl.createProjectElement(projectID, name);

        domControl.insertProject(projectElement);
        saveData();
    }

    /**
     * Create a task and insert its details into a project, the task list, and display
     * 
     * @param {*} inputs Object containing task details (title, description, dueDate, priority, completed)
     * @param {*} projectKey Project that the key belongs to
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
        projects.deleteTask(projectKey, taskKey);
        tasks.deleteTask(taskKey);
    }

    function getTaskDetails(taskKey) {
        if (tasks.taskExists(taskKey) === false) { return false; }
        return tasks.getTask(taskKey);
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
    }
})();

export default brain;