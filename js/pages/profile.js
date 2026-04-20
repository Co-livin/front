import {Navbar} from "../components/navbar.js"

export function renderProfile(){

    const app=document.getElementById("app");
    const login = localStorage.getItem("login");
    const name = localStorage.getItem("name");

    app.innerHTML=`

    ${Navbar()}
    
    <div class="container">
    
        <button class="button back" onclick="history.back()" style="margin-bottom:20px">
            Отмена
        </button>
    
        <h2 class="page-title">Профиль</h2>
        
        <div class="card">
        
            <p>Логин: ${login}</p>
            <p>Имя: ${name}</p>
            
            <br>
            
            <button class="button back" id="exitAccount" onclick="location.hash='login'">
                Выйти из аккаунта
            </button>
        
        </div>
    
    </div>
    
    `;

}