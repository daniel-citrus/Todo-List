/* 
    Store projects and keep record of their tasks.
    projects = [
        { projectID, prjectName, [taskID, taskID, taskID] },
        { projectID, prjectName, [taskID, taskID, taskID] },
        { projectID, prjectName, [taskID, taskID, taskID] },
        ...
    ]
*/
export default function ProjectList() {
    let projects = [];

    function createProject(name) {
        return {
            id: undefined,
            name: name,
            tasks: [],
        }
    }

    /* Create a new project, store it, then return the project's key */
    function addProject(name) {
        let project = createProject(name);
        let key = generateID();
        project.id = key;
        projects.splice(key, 0, project);
        return key;
    }

    /* Delete an existing project and return the task keys that it contained */
    function deleteProject(key) {
        for (let p in projects) {
            if (projects[p].id == key) {
                projects.splice(key, 1);
                return;
            }
        }

        console.error('Invalid project key');
    }

    /* Store a task keyin  a project */
    function addTask(key, taskKey) {
        /* projects.get(key).tasks.add(taskKey); */
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
        let projectCount = projects.length;

        if (projectCount == 0) {
            return 0;
        }

        for (let p in projects) {
            if (p < projects[p].id) {
                projectCount = p;
                break;
            }
        }
        
        return +projectCount;
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