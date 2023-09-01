import "../style/style.scss";
import { Todo } from './barrel'
import { Project } from './barrel'

/* 
    Contains and manages sets by using DOM elements as Map keys and Objects as Map  values.
*/
let brain = (()=> {
    let storage = new Map();

    function addItem(projectKey, itemKey, data) {
        let project = storage.get(projectKey);

        if (!project) {
            console.error('Invalid Project Key')
            return;
        }

        project.set(itemKey, new Todo(...data));
    }

    /* Delete a Todo item from an existing project */
    function deleteItem(itemKey) {
        let project = storage.get(projectKey);

        if (!project) {
            console.error('Invalid Project Key')
            return;
        }

        if (!project.delete(itemKey)) {
            console.error('Invalid Project Key')
            return;
        }
    }

    function deleteProject(key) {
        if (!storage.delete(key)) {
            console.error('Invalid Project Key')
        }
    }

    /* Build a new project and insert into storage */
    function newProject(key, name) {
        let project = new Project(name);
        storage.set(key, project);
    }

    return {
        addItem,
        deleteItem,
        deleteProject,
        newProject
    }
})();

export default brain;