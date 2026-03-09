import {Navbar} from "../components/navbar.js"
import {BackButton} from "../components/backButton.js"

export function renderAddUser(){

    const app=document.getElementById("app");

    app.innerHTML=`

    ${Navbar()}
    
    <div class="container">
    
        ${BackButton()}
    
        <h2 class="page-title">Add User</h2>
        
        <div class="card">
        
            <input class="input" placeholder="Search user email">
            
            <button class="button primary">
                Add
            </button>
        
        </div>
    
    </div>
    
    `;

}