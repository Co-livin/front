import {Navbar} from "../components/navbar.js"

export function renderDashboard(){

    const spaces=[
        {id:1,name:"Dorm Room",members:3},
        {id:2,name:"Apartment",members:4}
    ];

    let html="";

    spaces.forEach(space=>{

        html+=`

        <div class="card">
        
            <h3>${space.name}</h3>
            <p>${space.members} members</p>
            
            <br>
            
            <button class="button primary" onclick="location.hash='space/${space.id}'">
                Open
            </button>
        
        </div>
        
        `;

    })

    const app=document.getElementById("app");

    app.innerHTML=`

    ${Navbar()}
    
    <div class="container">
    
        <h2 class="page-title">Your Spaces</h2>
        
        <button class="button secondary" onclick="location.hash='create-space'">
            Create Space
        </button>
        
        <br><br>
        
        <div class="grid">
        
            ${html}
        
        </div>
    
    </div>
    
    `;

}