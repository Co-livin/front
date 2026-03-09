export function renderLogin(){

    const app=document.getElementById("app");

    app.innerHTML=`

    <div class="container">
    
        <div class="card center-card">
        
            <h2 class="page-title">Login</h2>
            
            <input class="input" placeholder="Email">
            
            <input class="input" type="password" placeholder="Password">
            
            <button class="button primary" onclick="location.hash='dashboard'">
                Login
            </button>
            
            <br><br>
            
            <button class="button secondary" onclick="location.hash='register'">
                Create account
            </button>
        
        </div>
    
    </div>
    
    `;

}