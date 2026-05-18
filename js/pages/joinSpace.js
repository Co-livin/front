import {Navbar, initNavbar} from "../components/navbar.js"

export function renderJoinSpace(){

    const app=document.getElementById("app");
    app.innerHTML=`
    ${Navbar()}
    
    <div class="container join-space">
        <button class="button back-button" onclick="location.hash = 'dashboard'">
            Отмена
        </button>
        <div class="content-card">
            <h2 class="page-title invite-space">Введите код для входа в пространство</h2>
            <form class="join-space-form">
                <input class="input" name="invite_code" placeholder="Инвайт-код" maxlength="10" required>
               
                <button class="button primary" type="submit" id="joinSpaceBtn">
                    Присоединиться
                </button>
            </form>
        </div>
    </div>
    `;

    initNavbar();

    const form = document.querySelector(".join-space-form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries())

        try {
            await joinSpace(data);

            location.hash = "dashboard";
        } catch (error) {
            alert("Ошибка при вступлении в пространства");
        }
    })
}

export async function joinSpace(code){
    const token = localStorage.getItem("access_token");
    try {
        const response = await fetch('https://colivin.ru/api/spaces/join', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(code)
        });

        if (!response.ok) throw new Error(await response.text());
    } catch (error) {
        console.error("Ошибка при создании пространства:", error);
        throw error;
    }
}