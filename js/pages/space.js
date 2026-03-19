import {Navbar} from "../components/navbar.js"
import {taskCard} from "../components/taskCard.js"
import {BackButton} from "../components/backButton.js"

export function renderSpace(id){
    const space = getSpaceById(id)

    const tasks=[
        {title:"Take out trash",user:"Alex",due:"Today"},
        {title:"Clean kitchen",user:"Sam",due:"Tomorrow"}
    ];

    let tasksHTML="";

    tasks.forEach(t=>{
        tasksHTML+=taskCard(t)
    })

    const app=document.getElementById("app");

    app.innerHTML=`

    ${Navbar()}
    
    <div class="container">
    
        ${BackButton()}
    
        <h2 class="page-title">Space ${space.name}</h2>
        
        <button class="button secondary" onclick="location.hash='create-task/${id}'">
            Add Task
        </button>
        
        <br><br>
        
        <h3>Active Tasks</h3>
        
        <div class="grid">
        
            ${tasksHTML}
        
        </div>
        
        <br>
        
        <h3>History</h3>
        
        <div class="card">
        
            <div class="history-item">
                Alex completed "Take out trash"
            </div>
            
            <div class="history-item">
                Sam created task "Clean kitchen"
            </div>
        
        </div>
    
    </div>
    
    `;

}

export function getSpaceById(id) {
    const allSpaces = JSON.parse(localStorage.getItem("my_spaces") || "[]");
    return allSpaces.find(space => space.id === id);
}