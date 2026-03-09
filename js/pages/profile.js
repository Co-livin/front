import {Navbar} from "../components/navbar.js"
import {BackButton} from "../components/backButton.js"

export function renderProfile(){

    const app=document.getElementById("app");

    app.innerHTML=`

    ${Navbar()}
    
    <div class="container">
    
        ${BackButton()}
    
        <h2 class="page-title">Profile</h2>
        
        <div class="card">
        
            <p>Name: Alex</p>
            <p>Email: alex@mail.com</p>
            
            <br>
            
            <button class="button secondary" onclick="location.hash='login'">
                Logout
            </button>
        
        </div>
    
    </div>
    
    `;

}