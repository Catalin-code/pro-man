import { dom } from "./dom.js";

// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards()
}

function makeDraggable() {
    const draggables = document.querySelectorAll('.draggable')
    const dragContainers = document.querySelectorAll('.drag-container')

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging')
        })
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging')
        })
    })

    dragContainers.forEach(container => {
        container.addEventListener('dragover', ev => {
            ev.preventDefault()
            const draggable = document.querySelector('.dragging')
            container.appendChild(draggable)
        })
    })
}


init();

// setTimeout(function(){
//     document.querySelectorAll('[id^="addCard"]').forEach(item => {
//         item.addEventListener('click', ev => {
//             alert('MERGE')
//         })
//     })
//     alert('AU TRECUT 3 SECUNDE !!!')
// }, 3000)






