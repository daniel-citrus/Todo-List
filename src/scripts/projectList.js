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

    /* Create a new project, store it, then return the project key */
    function addProject(name) {
        projects.set(generateID(), newProject(name));
    }

    function addTask(key, taskID) {
        projects[key].tasks.push(taskID);
    }

    function showProjects() {
        console.log(projects);
    }

    /*
    Generate a new ID for new entries. This will search for the lowest possible ID number.
    
    For example, if the existing IDs are: 0, 1, 2, 4, 5, 7
    then the generated ID will be 3

    If the existing IDs are 0, 1, 2, 3
    then the generated ID will be 4
    */
    function generateID() {
        let projectCount = projects.size;
        if (projectCount == 0) {
            return 0;
        }

        for (let i = 0; i < projectCount; i++) {
            if (!projects.has(i)) {
                return i;
            }
        }

        return projectCount;
    }

    return {
        addProject,
        addTask,
        deleteTask,
        showProjects,
    }
}