export default function DomControl() {
    let projectContainer = document.querySelector('.projects');
    let taskContainer = document.querySelector('.tasks');

    let projectButtons = document.querySelectorAll("button.project");
    let taskButtons = document.querySelectorAll("button.task");

    projectButtons.forEach((pButton)=> {
        pButton.addEventListener("click", ()=> {
            console.log('hi');
        })
    })

    function createProject() {

    }

    function createTask() {
        
    }

    return {
    }
}