import "../style/style.scss";
import { ProjectList } from './barrel'
import { TaskList } from './barrel'

let brain = (() => {
    let tasks = TaskList();
    let projects = ProjectList();
    /* 
        Adds a new task to the task list and saves its taskID in the project that it belongs to
    */

    projects.addProject('Health');
    projects.addTask(0, tasks.addTask(['Pull Ups', 'Full range of motion', '9/4/2023', 4]))
    projects.addTask(0, tasks.addTask(['Dips', 'Heavy weight', '9/3/2023', 3]))
    projects.addTask(0, tasks.addTask(['Eat', 'Healthy balanced meal', '9/2/2023', 5]))
    projects.addTask(0, tasks.addTask(['Sleep', 'Full night of sleep', '9/2/2023', 5]))
    projects.addTask(0, tasks.addTask(['Study', 'Regular study session', '9/6/2023', 5]))

    
    tasks.deleteTask(3);
    projects.deleteTask(0, 3);
    
    tasks.showTasks();
    projects.showProjects();
    return {
    }
})();

export default brain;