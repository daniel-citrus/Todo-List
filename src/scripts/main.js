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
    projects.addTask(a, 3);
    projects.addTask(a, 4);
    projects.addTask(a, 5);
    projects.addTask(a, 6);
    projects.addTask(a, 7);
    projects.deleteTask(a, 4);
    projects.showProjects()

    tasks.addTask(['Pull Ups', 'Full range of motion', '9/4/2023', 4]);
    tasks.addTask(['Dips', 'Heavy weight', '9/3/2023', 3]);
    tasks.addTask(['Eat', 'Healthy balanced meal', '9/2/2023', 5]);
    tasks.addTask(['Sleep', 'Full night of sleep with natural wake up', '9/2/2023', 5]);
    tasks.addTask(['Study', 'Regular study session', '9/6/2023', 5]);

    tasks.showTasks();

    return {
    }
})();

export default brain;