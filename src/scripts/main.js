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
            insertDemo();
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

    function insertDemo() {
        let myProjects = [
            {
                title: 'Groceries',
                tasks: [
                    {
                        title: 'Fruits',
                        description: 'Pick your favorite fruits',
                    },
                    {
                        title: 'Vegetables',
                        description: 'Fibrous and starchy veggies',
                    },
                    {
                        title: 'Chicken',
                        description: 'Bone-in and skinned chicken thighs',
                    },
                    {
                        title: 'Beef',
                        description: 'Ribeye Steak',
                    },
                    {
                        title: 'Fish',
                        description: 'Fresh salmon',
                    },
                    {
                        title: 'Milk',
                        description: 'Lactose free whole milk',
                    },
                ]
            },
            {
                title: 'Prepare for Travel',
                tasks: [
                    {
                        title: 'Clothes',
                        description: '6 days worth of regular and exercise clothing',
                    },
                    {
                        title: 'Shoes',
                        description: 'Workout shoes and casual shoes',
                    },
                    {
                        title: 'Purchase tickets',
                        description: 'Non-stop flights only and check for credit card deals',
                    },
                    {
                        title: 'Car rental',
                        description: 'Compare prices on Turo, Autoslash, and credit card portals'
                    },
                    {
                        title: 'Friends',
                        description: 'Schedule friend meetups',
                    },
                    {
                        title: 'Activities',
                        description: 'Book any additional activities',
                    }
                ],
            },
            {
                title: 'Shopping',
                tasks: [
                    {
                        title: 'Boots',
                        description: 'Waterproof brown boots'
                    },
                    {
                        title: 'Monitor',
                        description: 'High resolution monitor for work',
                    },
                    {
                        title: 'Windshield wiper fluid',
                    }
                ],
            }
        ]

        function randomInteger(max) {
            return Math.floor(Math.random() * max);
        }

        function randomBoolean() {
            return !randomInteger(2);
        }

        function randomPriority() {
            return randomInteger(5) + 1;
        }

        function randomDate() {
            let date = new Date();
            let days = randomInteger(366);

            if (randomBoolean()) {
                date.setDate(date.getDate() + days);
            }
            else {
                date.setDate(date.getDate() - days);
            }

            return date;
        }

        myProjects.forEach((project) => {
            let projectID = projects.addProject(project.title);

            project.tasks.forEach((task) => {
                let inputs = {
                    projectKey: projectID,
                    title: task.title,
                    description: task.description,
                    dueDate: randomDate(),
                    priority: randomPriority(),
                    completed: randomBoolean(),
                };
                
                projects.addTask(projectID, tasks.addTask(inputs));
            })
            
            projects.showProjects()
        })
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