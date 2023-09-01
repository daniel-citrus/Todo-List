/* export default class Task {
    constructor(title, description, dueDate, priority, completed = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
    }
}
 */
export default function TaskList() {
    let tasks = [];

    function createTask(title, description, dueDate, priority, completed = false) {
        return {
            title: title, 
            description : description,
            dueDate : dueDate,
            priority : priority,
            completed : completed,
        }
    }

    /* Adds a new task object to the tasks array then returns the task ID */
    function addTask(inputs) {
        return tasks.push(createTask(...inputs));
    }

    function removeTask(key) {
        if (key >= tasks.length || key < 0 || key == undefined) {
            console.error(`Invalid Task Key: ${key}`);
            return;
        }

        tasks = tasks.slice(0, key).concat(tasks.slice(key + 1));
    }

    function showTasks() {
        console.log(tasks);
    }

    return {
        addTask,
        removeTask,
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