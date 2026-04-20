import {Navbar} from "../components/navbar.js"

export function renderCreateSpace(){

    const app=document.getElementById("app");

    app.innerHTML=`

    ${Navbar()}
    
    <div class="container">
    
        <button class="button secondary" onclick="location.hash = 'dashboard'" style="margin-bottom:20px">
            ← Back
        </button>
        
        <h2 class="page-title">Create Space</h2>
        
        <form class="add-space-form">
        
            <input class="input" name="name" placeholder="Space name" minlength="2" maxlength="16">
            
            <button class="button primary" type="submit" id="createSpaceBtn">
                Create Space
            </button>
        
        </form>
    
    </div>
    
    `;

    const form = document.querySelector(".add-space-form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries())

        try {
            await createSpace(data);

            location.hash = "dashboard";
        } catch (error) {
            alert("Ошибка при создании пространства");
        }
    })
}

export async function createSpace(spaceData){
    const token = localStorage.getItem("access_token");
    try {
        const response = await fetch('https://colivin.ru/api/spaces/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(spaceData)
        });

        if (!response.ok) throw new Error(await response.text());
    } catch (error) {
        console.error("Ошибка при создании пространства:", error);
        throw error;
    }
}