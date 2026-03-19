import {Navbar} from "../components/navbar.js"
import {BackButton} from "../components/backButton.js"

export function renderProfile(){

    const app=document.getElementById("app");
    const login = localStorage.getItem("login");
    const name = localStorage.getItem("name");

    app.innerHTML=`

    ${Navbar()}
    
    <div class="container">
    
        ${BackButton()}
    
        <h2 class="page-title">Profile</h2>
        
        <div class="card">
        
            <p>Login: ${login}</p>
            <p>Name: ${name}</p>
            
            <br>
            
            <button class="button secondary" onclick="location.hash='login'">
                Logout
            </button>
        
        </div>
    
    </div>
    
    `;

}