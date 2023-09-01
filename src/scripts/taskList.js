export default function TaskList() {
    let tasks = new Map();

    function createTask(title, description, dueDate, priority, completed = false) {
        return {
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
        let taskCount = tasks.size;
        if (taskCount == 0) {
            return 0;
        }

        for (let i = 0; i < taskCount; i++) {
            if (!tasks.has(i)) {
                return i;
            }
        }

        return taskCount;
    }

    /* Generates new task and returns the taskID */
    function addTask(inputs) {
        let taskID = generateID();
        tasks.set(taskID, createTask(...inputs));
        return taskID;
    }

    function deleteTask(key) {
        /* if (key >= tasks.length || key < 0 || key == undefined) {
            console.error(`Invalid Task Key: ${key}`);
            return;
        }
        
        tasks = tasks.slice(0, key).concat(tasks.slice(key + 1)); */
        if (!tasks.delete(key)) {
            console.error(`Invalid Task Key: ${key}`);
        }
    }

    function showTasks() {
        console.log(tasks);
    }

    return {
        addTask,
        deleteTask,
        showTasks
    }
};

/* 
let inputs = [
    ['Pull Ups', 'Full range of motion', '9/4/2023', 4],
    ['Dips', 'Heavy weight', '9/3/2023', 3],
    ['Eat', 'Healthy balanced meal', '9/2/2023', 5],
    ['Sleep', 'Full night of sleep with natural wake up', '9/2/2023', 5],
    ['Study', 'Regular study session', '9/6/2023', 5],
]
 */