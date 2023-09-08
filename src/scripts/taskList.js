export default function TaskList() {
    let tasks = [];

    function createTask(title, description, dueDate, priority, completed = false) {
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


        return taskCount;
    }

    /* Generates new task and returns the taskID */
    function addTask(inputs) {
        let task = createTask(...inputs);
        let taskID = task.id;

        if (tasks.length == 0) {
            taskID = 0;
            tasks.push(task);
        }

        for (let i in tasks) {
            taskID = i;
        }

        return taskID;
    }

    /* delete one or more tasks from task list */
    function deleteTask(...keys) {
        if (tasks.length == 0) {
            console.error(`No tasks to delete`);
            return false;
        }
        
        keys.forEach((key)=> {
            if (!tasks.delete(key)) {
                console.error(`Invalid task key: ${key}`);
            }
        });

        return true;
    }

    function showTasks() {
        console.log(tasks);
    }

    function saveData() {
        localStorage.setItem('Tasks', JSON.stringify(...tasks.entries()));
    }

    return {
        addTask,
        deleteTask,
        showTasks,
        saveData
    }
};