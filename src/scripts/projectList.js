/* 
    Store projects and keep record of their tasks.
    Map Structure:
    projects = {
        key -> {name, [taskID, taskID, taskID, ...]},
        key -> {name, [taskID, taskID, taskID, ...]},
        key -> {name, [taskID, taskID, taskID, ...]},
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

    function addProject(name) {
        projects.set(newProject(name));
    }

    function addTask(key, taskID) {
        projects[key].tasks.push(taskID);
    }

    function deleteTask(key, taskID) {
        let task = projects[key].tasks

        if (!project) {
            console.error(`Invalid Task ID: ${taskID}`);
            return false;
        }

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
        /* console.log(projects); */
    }

    return {
        addProject,
        addTask,
        deleteTask,
        showProjects,
    }
}