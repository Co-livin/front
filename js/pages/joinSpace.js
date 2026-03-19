import {Navbar} from "../components/navbar.js"
import {BackButton} from "../components/backButton.js"

export function renderJoinSpace(){

    const app=document.getElementById("app");

    app.innerHTML=`

    ${Navbar()}
    
    <div class="container">
    
        ${BackButton()}
        
        <h2 class="page-title">Join Space</h2>
        
        <form class="join-space-form">
        
            <input class="input" name="invite_code" placeholder="Join code">
            
            <button class="button primary" type="submit" id="joinSpaceBtn">
                Join Space
            </button>
        
        </form>
    
    </div>
    
    `;

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