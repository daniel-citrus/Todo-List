/* export default class Project extends Map {
    constructor(name) {
        super();
        this.name = name;
        this.storage = [];
    }
} */

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

    function showProjects() {
        console.log(projects);
    }

    return {
        addProject,
        addTask,
        showProjects,
    }
}