import {Navbar} from "../components/navbar.js"

export function renderProfile(){

    const app=document.getElementById("app");
    const login = localStorage.getItem("login");
    const name = localStorage.getItem("name");

    app.innerHTML=`

    ${Navbar()}
    
    <div class="container">
    
        <button class="button secondary" onclick="history.back()" style="margin-bottom:20px">
            ← Back
        </button>
    
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