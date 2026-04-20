import {Navbar} from "../components/navbar.js"

export async function renderDashboard(){

    let spaces = await getCurrentSpaces();

    const spacesHtml = spaces.map(space => `
        <div class="card main">
                <h3>${space.name}</h3>
                <p>Инвайт-код: ${space.invite_code}</p>
                <button class="button open" onclick="location.hash='space/${space.id}'">
                    Открыть
                </button>
            </div>
    `).join('');

    const app=document.getElementById("app");

    app.innerHTML=`

    ${Navbar()}
    
    <div class="container">
    
        <h2 class="page-title">Твои пространства</h2>
        
        <button class="button secondary" onclick="location.hash='create-space'">
            Создать
        </button>
        
        <button class="button secondary" onclick="location.hash='join-space'">
            Присоединиться к другу
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