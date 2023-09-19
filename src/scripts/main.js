import "../style/style.scss";
import { DomControl } from './barrel'
import { ProjectList } from './barrel'
import { TaskList } from './barrel'

let brain = (() => {
    let tasks = TaskList();
    let projects = ProjectList();
    let domControl = DomControl();

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

    function moveTask(projectKey, taskKey)  {

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
        priority: 2,
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
        priority: 1
    }

    let task4 = {
        title: 'Sleep',
        description: `Good sleep improves your brain performance, mood, and health.
                Not getting enough quality sleep regularly raises the risk of many diseases and disorders. These range from heart disease and stroke to obesity and dementia.
                There’s more to good sleep than just the hours spent in bed, says Dr. Marishka Brown, a sleep expert at NIH. “Healthy sleep encompasses three major things,” she explains. “One is how much sleep you get. Another is sleep quality—that you get uninterrupted and refreshing sleep. The last is a consistent sleep schedule.”`,
        dueDate: '9/2/2023',
        priority: 1
    }

    let task5 = {
        title: 'Study',
        description: 'Regular session',
        dueDate: '9/6/2023',
        priority: 1,
    }


    projects.addProject('Health');
    projects.addProject('Health1');
    projects.addProject('Health2');

    projects.addTask(2, tasks.addTask(task1));
    projects.addTask(0, tasks.addTask(task2));
    projects.addTask(1, tasks.addTask(task3));
    projects.addTask(1, tasks.addTask(task4));
    projects.addTask(2, tasks.addTask(task5));

    tasks.showTasks();
    projects.showProjects();

    return {
    }
})();

export default brain;