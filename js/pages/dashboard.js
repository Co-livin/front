import {Navbar} from "../components/navbar.js"

export async function renderDashboard(){

    let spaces = await getCurrentSpaces();

    const spacesHtml = spaces.map(space => `
        <div class="card">
            
                <h3>${space.name}</h3>
                <p>ID: ${space.id}</p>
                <p>Code: ${space.invite_code}</p>
                
                <br>
                
                <button class="button primary" onclick="location.hash='space/${space.id}'">
                    Open
                </button>
            
            </div>
    `).join('');

    const app=document.getElementById("app");

    app.innerHTML=`

    ${Navbar()}
    
    <div class="container">
    
        <h2 class="page-title">Your Spaces</h2>
        
        <button class="button secondary" onclick="location.hash='create-space'">
            Create Space
        </button>
        
        <button class="button secondary" onclick="location.hash='join-space'">
            Join Space
        </button>
        
        <br><br>
        
        <div class="grid">
        
            ${spacesHtml || "<p>У вас пока нет пространств.</p>"}
        
        </div>
    
    </div>
    
    `;

}

export async function getCurrentSpaces() {
    const token = localStorage.getItem("access_token");

    try {
        const response = await fetch('https://colivin.ru/api/spaces/my', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error(await response.text());

        const spaces = await response.json();
        localStorage.setItem("my_spaces", JSON.stringify(spaces));
        return spaces;
    } catch (error) {
        console.error("Ошибка загрузки пространств:", error);
    }
}