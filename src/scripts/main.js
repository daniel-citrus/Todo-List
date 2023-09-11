import "../style/style.scss";
import { ProjectList } from './barrel'
import { TaskList } from './barrel'

let brain = (() => {
    let tasks = TaskList();
    let projects = ProjectList();

    function createProject(name) {
        // Create a new project
        let projectID = projects.addProject(name);
        // Create new project element in dom (passing project key)
    }

    function createTask(inputs, projectKey) {
        // add a new task in tasks
        let taskKey = tasks.addTask(inputs);
        // insert task into project
        projects.addTask(projectKey, taskKey);
        // insert a new task element in DOM
    }

    function deleteProject(key) {
        // use project key to delete it in projects
        // get task keys that have been deleted and use to delete from tasks
    }

    function deleteTask(key, taskKey) {
        // pass project key and task key to delete task from projects
        // delete task from tasks
    }

    function loadData() {
        // load projects
        // load tasks
    }

    function saveData() {
        // load projects
        // load tasks
    }

    let task1 = {
        title: 'Pull Ups',
        description: 'Quality reps',
        dueDate: '9/4/2023',
        priority: 4,
        completed: true,
    };

    let task2 = {
        title: 'Dips',
        description: 'Heavy weight',
        dueDate: '9/3/2023',
        priority: 3,
    }

    let task3 = {
        title: 'Eat',
        description: 'Healthy meals',
        dueDate: '9/2/2023',
        priority: 5
    }

    let task4 = {
        title: 'Sleep',
        description: 'Full night sleep',
        dueDate: '9/2/2023',
        priority: 5
    }

    let task5 = {
        title: 'Study',
        description: 'Regular session',
        dueDate: '9/6/2023',
        priority: 5,
    }


    projects.addProject('Health');
    projects.addProject('Health1');
    projects.addProject('Health2');

    projects.addTask(2, tasks.addTask(task1));
    projects.addTask(0, tasks.addTask(task2));
    projects.addTask(1, tasks.addTask(task3));
    projects.addTask(1, tasks.addTask(task4));
    projects.addTask(2, tasks.addTask(task5));

    projects.showProjects();

    return {
    }
})();

export default brain;