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

    /* Create a new project, store it, then return the project key */
    function addProject(name) {
        let key = generateID();
        projects.set(key, createProject(name));
        return key;
    }
    
    function deleteProject(key) {
        if (!projects.delete(key)) {
            console.log(`Invalid Project Key: ${key}`);
        }
    }

    /* Store a task keyin  a project */
    function addTask(key, taskKey) {
        projects.get(key).tasks.add(taskKey);
    }

    /* Delete task from a project */
    function deleteTask(key, taskKey) {
        // get project using key
        let project = projects.get(key);

        if (!project) {
            console.error(`Invalid key: ${key}`);
            return;
        }
        // get that project's task array
        let tasks = project.tasks;
        // remove task key from that task array
        if (!tasks.delete(taskKey)) {
            console.error(`Invalid taskKey: ${taskKey}`);
            return;
        }
    }

    function getName(key) {
        // return project's name using key
    }

    /**
     * Return all tasks that belong to a project 
     * @returns array
    */
    function getTasks(key) {

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