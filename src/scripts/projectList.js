/* 
    Store projects and keep record of their tasks.
    projects = [
        { projectID, projectName, [taskID, taskID, taskID] },
        { projectID, projectName, [taskID, taskID, taskID] },
        { projectID, projectName, [taskID, taskID, taskID] },
        ...
    ]
*/
export default function ProjectList() {
    let projects = [];

    function createProject(name) {
        return {
            id: generateID(),
            name,
            tasks: [],
        }
    }

    /* Create a new project, store it, then return the project's key */
    function addProject(name) {
        let project = createProject(name);
        let key = project.id;
        projects.splice(key, 0, project);
        return key;
    }

    /* Delete an existing project and return the task keys that it contained */
    function deleteProject(key) {
        for (let p in projects) {
            if (projects[p].id == key) {
                projects.splice(p, 1);
                return;
            }
        }

        console.error('Invalid project key');
    }

    /* Store a task key in a project */
    function addTask(key = 0, taskKey) {
        let project = getProject(key);

        if (!project) {
            return
        }

        project.tasks.push(taskKey);
    }

    /* Delete task from a project */
    function deleteTask(projectKey, taskKey) {
        let project = getProject(projectKey);

        if (!project) {
            return;
        }

        for (let t in project.tasks) {
            if (taskKey == project.tasks[t]) {
                project.tasks.splice(t, 1);
                return;
            }
        }

        console.error('Invalid task key');
    }

    function updateProjectName(key, name) {
        let projectIndex = getProjectIndex(key);

        if (projectIndex === false) {
            return false;
        }

        projects[projectIndex].name = name;
        return true;
    }

    /**
     * Returns project object if it exists in storage
     * @param {*} key project key
     * @returns object
     */
    function getProject(key) {
        for (let p in projects) {
            let project = projects[p];

            if (project.id == key) {
                return project;
            }
        }

        console.error('Invalid project key');
        return false;
    }

    function getProjectIndex(key) {
        for (let p in projects) {
            let projectID = projects[p].id;

            if (projectID > key) {
                break;
            }

            if (projectID == key) {
                return p;
            }
        }

        console.error('Invalid project key')
        return false;
    }

    function getName(key) {
        let project = getProject(key);

        if (!project) {
            return;
        }

        return project.name;
    }

    /**
     * Return all tasks that belong to a project 
     * @returns array
    */
    function getTasks(key) {
        let project = getProject(key);

        if (project === false) {
            return false;
        }

        return project.tasks;
    }

    function showProjects() {
        console.log(projects);
    }

    function saveData() {
        localStorage.setItem('Projects', JSON.stringify(projects));
    }

    function loadData() {
        let projectData = localStorage.getItem('Projects');

        if (projectData === null) {
            return false;
        }

        projects = JSON.parse(projectData);
        return true;
    }


    /**
     * Generate a new ID for new entries. This will search for the lowest possible ID number.
     
     For example, if the existing IDs are: 0, 1, 2, 4, 5, 7
     then the generated ID will be 3
 
     If the existing IDs are 0, 1, 2, 3
     then the generated ID will be 4
     * @returns generated project ID
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

    function processAllProjects(callback) {
        projects.forEach((project)=> {
            callback(project);
        })
    }

    return {
        addProject,
        deleteProject,
        updateProjectName,
        addTask,
        deleteTask,
        getName,
        getTasks,
        saveData,
        loadData,
        showProjects,
        processAllProjects,
    }
}