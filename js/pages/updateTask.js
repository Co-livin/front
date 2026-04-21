import {Navbar, initNavbar} from "../components/navbar.js";
import {getIdByUsername, getSpaceMembers} from "./createTask.js";

export async function renderUpdateTask(spaceId, taskId) {
    const app=document.getElementById("app");

    app.innerHTML=`

    ${Navbar()}
    
    <div class="container">
    
        <button class="button back" onclick="location.hash = 'space/${spaceId}'" style="margin-bottom: 30px">
            Отмена
        </button>
        
        <button class="button delete" id="deleteTaskBtn">
            Удалить
        </button> 
        
        <h2 class="page-title">Редактировать задачу</h2>
        
        <form class="update-task-form">
        
            <input class="input" name="title" placeholder="Название" minlength="2" maxlength="20" required>
            
            <label id="assignee-label">
                <b>Ответственный:</b>
            </label>
            
            <label>
                <b>Дедлайн:</b>
                <input class="input" type="date" name="next_due_date" required min="2026-01-01">
            </label>
            
            <label class="checkbox-label">
                <input type="checkbox" name="is_recurring" id="recurring-check"> 
                <b>Является регулярной?</b>
            </label>
            
            <input class="input" type="number" name="frequency_days" id="freq-input" 
                   placeholder="Период (в днях)" style="display:none" min="1" max="365">
                   
            
            <button class="button primary" id="updateTaskBtn">
                Обновить
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
    });

    const button = document.getElementById("deleteTaskBtn");
    button.addEventListener("click", async (event) => {
        try {
            await deleteTask(taskId);
            location.hash = `space/${spaceId}`;
        } catch (error) {
            alert("Не получилось удалить задачу");
        }
    })

    const form = document.querySelector(".update-task-form");
    form.addEventListener("submit", (e) => {})

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
            await updateTask(taskId, taskData);

            location.hash = `space/${spaceId}`;
        } catch (error) {
            alert("Ошибка при обновлении задачи");
        }
    })
}

export async function updateTask(taskId, taskData) {
    const token = localStorage.getItem("access_token");
    try {
        const response = await fetch(`https://colivin.ru/api/tasks/${taskId}`, {
            method: 'PATCH',
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

export async function deleteTask(taskId) {
    const token = localStorage.getItem("access_token");
    try {
        const response = await fetch(`https://colivin.ru/api/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) throw new Error(await response.text());
    } catch (error) {
        console.error("Ошибка при удалении задачи:", error);
        throw error;
    }
}