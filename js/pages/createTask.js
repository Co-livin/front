import {Navbar, initNavbar} from "../components/navbar.js"
import {getUsernameById} from "./space.js";

export async function renderCreateTask(spaceId){

    const app=document.getElementById("app");

    app.innerHTML=`

    ${Navbar()}
    
    <div class="container create-task">
        <button class="button back" onclick="location.hash = 'space/${spaceId}'" style="margin-bottom: 30px">
            Отмена
        </button>
        <h2 class="page-title">Создать задачу</h2>
        <form class="create-task-form">
 
            <input class="input" name="title" placeholder="Название" minlength="2" maxlength="150" required>
     
            <label id="assignee-label">
                <b>Ответственный:</b>
            </label>
            <label class="due-date">
                <b>Дедлайн:</b>
                <input class="input" type="date" name="next_due_date" required min="2026-01-01">
            </label>
            
            <label class="checkbox-label">
                <input type="checkbox" name="is_recurring" id="recurring-check"> 
                <b>Является регулярной?</b>
            </label>
            
            <input class="input" type="number" name="frequency_days" id="freq-input" 
                   placeholder="Период (в днях)" style="display:none" min="1" max="365">
                   
            <button class="button primary" id="createTaskBtn">
                Создать
            </button>
        </form>
    </div>
    
    `;

    initNavbar();

    const label = document.getElementById("assignee-label");

    const select = document.createElement("select");
    select.name = "username";
    select.required = true;

    label.appendChild(select);

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Выбери имя";
    placeholder.disabled = true;
    placeholder.selected = true;

    select.appendChild(placeholder);

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
        freqInput.required = e.target.checked;
    });

    const form = document.querySelector(".create-task-form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const assignee_id = await getIdByUsername(data.username)

        const isRecurring = document.getElementById("recurring-check").checked;
        const frequency = parseInt(data.frequency_days);

        const taskData = {
            title: data.title,
            is_recurring: !!data.is_recurring,
            frequency_days: isRecurring ? frequency : 0,
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
