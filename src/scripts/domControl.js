export default function DomControl() {
    let projectContainer = document.querySelector('.projects');
    let taskContainer = document.querySelector('.tasks');

    let projectButtons = document.querySelectorAll("button.project");
    let taskButtons = document.querySelectorAll("button.task");

    let p = 1;
    projectButtons.forEach((pButton)=> {
        pButton.addEventListener("click", ()=> {
            createProject(p++);
        })
    })

    taskButtons.forEach((pButton)=> {
        pButton.addEventListener("click", ()=> {
            createTask(p++);
        })
    })

    for (let i = 0; i < 100; i++) {
        projectButtons[0].click();
    }

    function createProject(key) {
        let project = document.createElement('div');
        project.dataset.id = key;
        project.textContent = key;
        projectContainer.appendChild(project);
    }

    function deleteProject(key) {

    }

    function createTask(key) {
        let task = document.createElement('div');
        task.dataset.id = key;
        task.textContent = key;
        taskContainer.appendChild(task);
    }

    return {
    }
}