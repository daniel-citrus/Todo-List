import "../style/style.scss";
import { ProjectList } from './barrel'
import { TaskList } from './barrel'

let brain = (() => {
    let tasks = TaskList();
    let projects = ProjectList();
    /* 
        Adds a new task to the task list and saves its taskID in the project that it belongs to
    */

    tasks.addTask(['Pull Ups', 'Full range of motion', '9/4/2023', 4]);
    tasks.addTask(['Dips', 'Heavy weight', '9/3/2023', 3]);
    tasks.addTask(['Eat', 'Healthy balanced meal', '9/2/2023', 5]);
    tasks.addTask(['Sleep', 'Full night of sleep', '9/2/2023', 5]);
    tasks.addTask(['Study', 'Regular study session', '9/6/2023', 5]);
    
    projects.addProject('Health');
    projects.addProject('Health');
    projects.showProjects();

    return {
    }
})();

export default brain;