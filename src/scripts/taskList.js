export default function TaskList() {
    let tasks = [];

    /* title, description, dueDate, priority, completed = false */
    function createTask(inputs) {
        let title = '',
            description = '',
            dueDate = '',
            priority = '',
            completed = false;

        ({
            title,
            description,
            dueDate,
            priority,
            completed
        } = inputs);

        return {
            id: generateID(),
            title: title,
            description: description,
            dueDate: dueDate,
            priority: priority,
            completed: completed,
        }
    }

    /*
    Generate a new ID for new entries. This will search for the lowest possible ID number.
    
    For example, if the existing IDs are: 0, 1, 2, 4, 5, 7
    then the generated ID will be 3

    If the existing IDs are 0, 1, 2, 3
    then the generated ID will be 4
    */
    function generateID() {
        let taskCount = tasks.length;

        if (taskCount == 0) {
            return 0;
        }

        for (let t in tasks) {
            if (t < tasks[t].id) {
                taskCount = t;
                break;
            }
        }

        return +taskCount;
    }

    /**
     * Generates new task and returns the taskID
     * @param {*} inputs object with the following properties: title, description, dueDate, priority, completed (boolean)
     * @returns taskID integer
     */
    function addTask(inputs) {
        let task = createTask(inputs);
        let taskID = task.id;

        tasks.splice(taskID, 0, task);
        return taskID;
    }

    /* Delete one or more tasks from task list */
    function deleteTask(key) {
        if (tasks.length == 0) {
            console.error(`No tasks to delete`);
            return false;
        }

        for (let t in tasks) {
            if (tasks[t].id == key) {
                tasks.splice(t, 1);
                return true;
            }
        }

        return false;
    }

    function updateTask(key, inputs) {
        let task = getTask(key);

        if (!task) {
            return;
        }

        tasks[getTaskIndex(key)] = createTask(inputs);
        
    }

    /* Check if task ID exists in storage */
    function getTask(key) {
        for (let task of tasks) {
            let taskID = task.id;

            if (taskID > key) {
                break;
            }

            if (taskID == key) {
                return task;
            }
        }

        console.error('Invalid task key');
        return null;
    }

    function getTaskIndex(key) {
        for (let taskIndex in tasks) {
            let taskID = tasks[taskIndex].id;

            if (taskID == key) {
                return taskIndex;
            }
        }
    }

    function showTasks() {
        console.log(tasks);
    }

    function saveData() {
        localStorage.setItem('Tasks', JSON.stringify(tasks));
    }

    function loadData() {
        tasks = JSON.parse(localStorage.getItem('Tasks'));
    }

    return {
        addTask,
        deleteTask,
        loadData,
        showTasks,
        updateTask,
        saveData
    }
};