import {Navbar} from "../components/navbar.js"
import {BackButton} from "../components/backButton.js"

export function renderCreateSpace(){

    const app=document.getElementById("app");

    app.innerHTML=`

    ${Navbar()}
    
    <div class="container">
    
        ${BackButton()}
        
        <h2 class="page-title">Create Space</h2>
        
        <div class="card">
        
            <input class="input" id="spaceName" placeholder="Space name">
            
            <input class="input" placeholder="Add user email">
            
            <button class="button primary" id="createSpaceBtn">
                Create Space
            </button>
        
        </div>
    
    </div>
    
    `;

    document
        .getElementById("createSpaceBtn")
        .onclick=()=>{

        // здесь позже будет API

        location.hash="dashboard";

    };

}