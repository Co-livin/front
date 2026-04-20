import {Navbar} from "../components/navbar.js"
import {getUsernameById} from "./space.js";

export async function renderCreateTask(spaceId){

    const app=document.getElementById("app");

    app.innerHTML=`

    ${Navbar()}
    
    <div class="container">
    
        <button class="button secondary" onclick="location.hash = 'space/${spaceId}'" style="margin-bottom:20px">
            ← Back
        </button>
        
        <h2 class="page-title">Create Task</h2>
        
        <form class="create-task-form">
        
            <input class="input" name="title" placeholder="title" minlength="4" maxlength="25">
            
            <br>
            <br>
            
            <label>
                Due Date:
                <input class="input" type="date" name="next_due_date" required min="2026-01-01">
            </label>
            
            <label>
                <input type="checkbox" name="is_recurring" id="recurring-check"> 
                Is Recurring?
            </label>
            
            <input class="input" type="number" name="frequency_days" id="freq-input" 
                   placeholder="Frequency (days)" style="display:none" min="1" max="365">
                   
            <br>
            
            <button class="button primary" id="createTaskBtn">
                Create Task
            </button>
        
        </form>
    
    </div>
    
    `;

    const label = document.createElement("label");
    label.textContent = "Assignee:";

    const select = document.createElement("select");
    select.name = "username";

    label.appendChild(select);

    const members = await getSpaceMembers(spaceId);
    members.forEach(member => {
        const option = document.createElement("option");
        option.value = member;
        option.text = member;
        select.appendChild(option);
    });

    const titleInput = document.querySelector('input[name="title"]');
    titleInput.after(label);

    const check = document.getElementById("recurring-check");
    const freqInput = document.getElementById("freq-input");

    check.addEventListener("change", (e) => {
        freqInput.style.display = e.target.checked ? "block" : "none";
    });

    const form = document.querySelector(".create-task-form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const assignee_id = await getIdByUsername(data.username)

        const taskData = {
            title: data.title,
            is_recurring: !!data.is_recurring,
            frequency_days: parseInt(data.frequency_days) || 0,
            assignee_id: assignee_id,
            next_due_date: data.next_due_date
        };

        try {
            await createTask(spaceId, taskData);

            location.hash = `space/${spaceId}`
        } catch (error) {
            alert("Ошибка при создании задачи");
        }
    })
}

export async function createTask(spaceId, taskData){
    const token = localStorage.getItem("access_token");
    try {
        const response = await fetch(`https://colivin.ru/api/spaces/${spaceId}/tasks`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(taskData)
        });

        if (!response.ok) throw new Error(await response.text());
    } catch (error) {
        console.error("Ошибка при создании задания:", error);
        throw error;
    }
}

export async function getIdByUsername(username){
    const token = localStorage.getItem("access_token");
    try {
        const response = await fetch(`https://colivin.ru/api/users/by-login/${username}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error(await response.text());

        const userData = await response.json();
        return userData.id;
    } catch (error) {
        console.error("Ошибка при получении id:", error);
        throw error;
    }
}

export async function getSpaceMembers(spaceId){
    const token = localStorage.getItem("access_token");
    try {
        const response = await fetch(`https://colivin.ru/api/spaces/${spaceId}/members`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error(await response.text());

        const membersData = await response.json();
        const ids = membersData.map(member => member.user_id);
        const members = [];
        for (const id of ids){
            const login = await getUsernameById(id);
            members.push(login);
        }
        return members;
    } catch (error) {
        console.error("Ошибка при получении участников:", error);
        throw error;
    }
}
