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

    function createProject(name) {
        return {
            name: name,
            tasks: new Set(),
        }
    }

    /* Create a new project, store it, then return the project's key */
    function addProject(name) {
        let key = generateID();
        projects.set(key, createProject(name));
        return key;
    }

    /* Delete an existing project and return the task keys that it contained */
    function deleteProject(key) {
        if (!projects.has(key)) {
            console.log(`Invalid Project Key: ${key}`);
            return;
        }

        let tasks = Array.from(projects.get(key).tasks);
        projects.delete(key);
        return tasks;
    }

    /* Store a task keyin  a project */
    function addTask(key, taskKey) {
        projects.get(key).tasks.add(taskKey);
    }

    /* Delete task from a project */
    function deleteTask(key, taskKey) {
        let project = projects.get(key);

        if (!project) {
            console.error(`Invalid key: ${key}`);
            return;
        }

        let tasks = project.tasks;

        if (!tasks.delete(taskKey)) {
            console.error(`Invalid taskKey: ${taskKey}`);
            return;
        }
    }

    function getName(key) {
        let project = projects.get(key);

        if (!project) {
            console.error(`Invalid key: ${key}`);
            return;
        }

        return project.name;
    }

    /**
     * Return all tasks that belong to a project 
     * @returns array
    */
    function getTasks(key) {
        let project = projects.get(key);

        if (!project) {
            console.error(`Invalid key: ${key}`);
            return;
        }

        return project.tasks;
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
        deleteProject,
        addTask,
        deleteTask,
        getName,
        getTasks,
        showProjects,
    }
}