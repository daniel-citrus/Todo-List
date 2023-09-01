/* export default class Project extends Map {
    constructor(name) {
        super();
        this.name = name;
        this.storage = [];
    }
} */

/* 
    Store projects and keep record of their tasks.
    Map Structure:
    projects = {
        key -> {name, [task, task, task, ...]},
        key -> {name, [task, task, task, ...]},
        key -> {name, [task, task, task, ...]},
        ...
    }
*/
export default function ProjectList() {
    let projects = new Map();

    function newProject(name) {
        return {
            name: name,
            tasks: [],
        }
    }

    function addProject(key, name) {
        projects.set(key, newProject(name));
    }

    function addTask(projectKey, taskID) {
        let project = projects.get(projectKey);
        project.tasks.push(taskID);
    }

    function deleteTask(projectKey, taskID) {
        let project = projects.get(projectKey);
        let tasks = project.tasks;
        
        for (let i in tasks) {
            i = +i;
            if (tasks[i] == taskID) {
                tasks = tasks.slice(0, i).concat(tasks.slice(i + 1));
                project.tasks = tasks;
                return true;
            }
        }

        console.error(`Invalid Task ID: ${taskID}`);
        return false;
    }

    function showProjects() {
        console.log(projects);
    }

    return {
        addProject,
        addTask,
        deleteTask,
        showProjects,
    }
}