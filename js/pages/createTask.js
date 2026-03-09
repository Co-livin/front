import {Navbar} from "../components/navbar.js"
import {BackButton} from "../components/backButton.js"

export function renderCreateTask(spaceId){

    const app=document.getElementById("app");

    app.innerHTML=`

    ${Navbar()}
    
    <div class="container">
    
        ${BackButton()}
        
        <h2 class="page-title">Create Task</h2>
        
        <div class="card">
        
            <input class="input" placeholder="Task title">
            
            <select class="input">
                <option>Alex</option>
                <option>Sam</option>
            </select>
            
            <input class="input" type="date">
            
            <button class="button primary" id="createTaskBtn">
                Create Task
            </button>
        
        </div>
    
    </div>
    
    `;

    document
        .getElementById("createTaskBtn")
        .onclick=()=>{

        // позже API

        location.hash="space/"+spaceId;

    };

}