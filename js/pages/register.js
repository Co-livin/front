import {BackButton} from "../components/backButton.js"

export function renderRegister(){

    const app=document.getElementById("app");

    app.innerHTML=`

    <div class="container">
    
        ${BackButton()}
    
        <div class="card center-card">
        
            <h2 class="page-title">Register</h2>
            
            <input class="input" placeholder="Name">
            <input class="input" placeholder="Email">
            <input class="input" type="password" placeholder="Password">
            
            <button class="button primary" onclick="location.hash='dashboard'">
                Register
            </button>
        
        </div>
    
    </div>
    
    `;

}