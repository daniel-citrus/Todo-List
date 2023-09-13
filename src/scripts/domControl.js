export default function DomControl() {
    let projectContainer = document.querySelector('.projects');
    let taskContainer = document.querySelector('.tasks');

    let projectButtons = document.querySelectorAll("button.project");
    let taskButtons = document.querySelectorAll("button.task");

    let p = 1;
    projectButtons.forEach((pButton) => {
        pButton.addEventListener("click", () => {
            projectContainer.appendChild(buildProject(p++, 'Test'));
        })
    })

    taskButtons.forEach((pButton) => {
        pButton.addEventListener("click", () => {
            taskContainer.appendChild(buildTask(p++, 'test'));
        })
    })

    /**
     * Creates a project DOM element that has a custom data set called data-id. The element contains the project name and options button.
     * @param {*} key project id
     * @param {*} name project name
     **/
    function buildProject(key, name) {
        let project = document.createElement('div');
        project.classList.add('project');
        project.dataset.id = key;

        let projectName = document.createElement('div');
        projectName.classList.add('name');
        projectName.textContent = name;
        project.appendChild(projectName);

        project.appendChild(projectOptionButton(key));

        return project;
    }

    function projectOptions(key) {
        console.log(key);
    }

    function projectOptionButton(key) {
        let button = document.createElement('button');
        button.classList.add('options');

        button.addEventListener('click', () => {
            projectOptions(key);
        })

        return button;
    }

    function updateProjectName(key, name) {
        let projectName = document.querySelector(`.projects .project[data-id="${key}"]`);

        if (!projectName) {
            console.error(`Project element does not exist - Key: ${key}`)
            return;
        }

        projectName.textContent = name;
    }

    /**
     * Creates a task DOM element that has a custom data set called data-id. The element contains the task name, completion checkbox, and options button.
     * @param {*} key task id
     * @param {*} title task name
     * @param {*} description task description
     * @param {*} dueDate task due date
     * @param {*} priority task priority level
     * @param {*} completed boolean
     **/
    function buildTask(key, name) {
        let task = document.createElement('div');
        task.classList.add('task');
        task.dataset.id = key;

        let taskName = document.createElement('div');
        taskName.classList.add('name');
        taskName.textContent = name;
        task.appendChild(taskName);

        let options = document.createElement('button');
        options.classList.add('options');
        task.appendChild(options);

        options.addEventListener('click', ()=> {
            console.log(`Task ID: ${key}`);
        })

        return task;
    }

    return {
    }
}