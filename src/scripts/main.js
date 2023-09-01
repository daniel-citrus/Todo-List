import "../style/style.scss";
import { ProjectList } from './barrel'
import { TaskList } from './barrel'

let brain = (() => {
    let projects = ProjectList();
    let tasks = TaskList();
    /* 
        Adds a new task to the task list and saves its taskID in the project that it belongs to
    */

    let a = document.createElement('div');
    let b = document.createElement('a');
    
    projects.addProject(a, 'Fitness');
    projects.addProject(b, 'Knowledge');
    projects.addTask(a, 1);
    projects.addTask(a, 2);
    projects.showProjects()

    function newTask(taskData) {
        let taskID = tasks.addTask(taskData);
    }

    newTask(['Pull Ups', 'Full range of motion', '9/4/2023', 4]);
    newTask(['Dips', 'Heavy weight', '9/3/2023', 3]);
    newTask(['Eat', 'Healthy balanced meal', '9/2/2023', 5]);
    newTask(['Sleep', 'Full night of sleep with natural wake up', '9/2/2023', 5]);
    newTask(['Study', 'Regular study session', '9/6/2023', 5]);

    tasks.showTasks();

    return {
    }
})();

export default brain;