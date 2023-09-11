import "../style/style.scss";
import { ProjectList } from './barrel'
import { TaskList } from './barrel'

let brain = (() => {
    let tasks = TaskList();
    let projects = ProjectList();

    function createProject(name) {
        // Create a new project
        // Create new project element in dom (passing project key)
    }

    function createTask(inputs) {
        // add a new task in tasks
        // get selected project's key in front-end
        // insert a new task element in DOM
        // pass project key and task key to create new project in projects
    }

    function deleteProject(key) {
        // use project key to delete it in projects
        // get task keys that have been deleted and use to delete from tasks
    }

    function deleteTask(key, taskKey) {
        // pass project key and task key to delete task from projects
        // delete task from tasks
    }

    function saveData() {

    }

    projects.addProject('Health');
    projects.addProject('Health1');
    projects.addProject('Health2');
    /* projects.addTask(0, tasks.addTask(['Pull Ups', 'Quality reps', '9/4/2023', 4]))
    projects.addTask(0, tasks.addTask(['Dips', 'Heavy weight', '9/3/2023', 3]))
    projects.addTask(0, tasks.addTask(['Eat', 'Healthy meals', '9/2/2023', 5]))
    projects.addTask(0, tasks.addTask(['Sleep', 'Full night sleep', '9/2/2023', 5]))
    projects.addTask(0, tasks.addTask(['Study', 'Regular session', '9/6/2023', 5])) */
    projects.showProjects();


    return {
    }
})();

export default brain;