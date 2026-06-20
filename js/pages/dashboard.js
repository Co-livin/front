import {Navbar, initNavbar} from "../components/navbar.js"

export async function renderDashboard(){
    const app=document.getElementById("app");

    app.innerHTML = `
    <main class="container">
        <p>Загрузка...</p>
    </main>
    `;

    let spaces = await getCurrentSpaces();

    const spacesHtml = spaces.map(space => `
        <article class="card main">
            <h3>${space.name}</h3>
            <p>Инвайт-код: ${space.invite_code}</p>
            <div>
                <button class="button open" onclick="location.hash='space/${space.id}'">
                    Открыть
                </button>
                <button class="button secondary copy-btn" data-invite="${space.invite_code}">
                    Скопировать код
                </button>            
            </div>
        </article>
    `).join('');

    app.innerHTML=`

    ${Navbar()}
    
    <main class="container">
    
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
    
    </main>
    
    `;

    initNavbar();

    document.querySelectorAll(".copy-btn").forEach(button => {
        button.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(
                    button.dataset.invite
                );

                const oldText = button.textContent;

                button.textContent = "Скопировано";

                setTimeout(() => {
                    button.textContent = oldText;
                }, 1500);

            } catch (error) {
                alert("Не удалось скопировать код");
            }
        });
    });
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