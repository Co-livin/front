import {Navbar} from "../components/navbar.js"

export async function renderSpace(id){
    let tasks = await getCurrentTasks(id);

    const space = await getSpaceById(id)

    const tasksWithUsernames = await Promise.all(tasks.map(async (task) => {
        try {
            const username = await getUsernameById(task.assignee_id);
            return { ...task, assignee_name: username };
        } catch (e) {
            return { ...task, assignee_name: "Unknown" };
        }
    }));

    const tasksHTML = tasksWithUsernames.map(task => `
        <div class="card">
            
            <h3>${task.title}</h3>
            <p>Assignee: ${task.assignee_name}</p>
            <p>Due: ${task.next_due_date}</p>
            
            <br>
            
            <button class="button success mark-done-btn" data-id="${task.id}">
                Mark Done
            </button>
            
            <button class="button secondary update-btn" onclick="location.hash='update-task/${id}/${task.id}'">
                Update Task
            </button>
        </div>
    `).join('');

    const events = await getSpaceEvents(id);

    const ITEMS_PER_PAGE = 7;

    function renderHistory(events, page, spaceId) {
        const historyContainer = document.getElementById("history-container");
        const paginationContainer = document.getElementById("pagination-container");

        const start = (page - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;

        const paginatedEvents = events.slice(start, end);

        historyContainer.innerHTML = paginatedEvents.map(event => `
        <div class="history-item">
            ${event.payload.task_title || ''} <br>
            ${event.payload.user_name || ''} <br>
            ${event.payload.action || ''}
        </div>
    `).join('') || "<p>У пространства еще нет истории.</p>";

        const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);

        paginationContainer.innerHTML = `
        <div class="pagination">
            <button ${page === 1 ? "disabled" : ""} id="prev-page">←</button>
            <span>Page ${page} / ${totalPages}</span>
            <button ${page === totalPages ? "disabled" : ""} id="next-page">→</button>
        </div>
    `;

        document.getElementById("prev-page")?.addEventListener("click", () => {
            renderHistory(events, page - 1, spaceId);
        });

        document.getElementById("next-page")?.addEventListener("click", () => {
            renderHistory(events, page + 1, spaceId);
        });
    }

    const app=document.getElementById("app");

    app.innerHTML=`

    ${Navbar()}
    
    <div class="container">
    
        <button class="button secondary" onclick="location.hash = 'dashboard'" style="margin-bottom:20px">
            ← Back
        </button>
    
        <h2 class="page-title">Space ${space.name}</h2>
        
        <button class="button secondary" onclick="location.hash='create-task/${id}'">
            Add Task
        </button>
        
        <br><br>
        
        <h3>Active Tasks</h3>
        
        <div class="grid">
        
            ${tasksHTML || "<p>У вас пока нет задач.</p>"}
        
        </div>
        
        <br>
        
        <h3>History</h3>
        
        <div class="card" id="history-container"></div>

        <div id="pagination-container"></div>
    
    </div>
    
    `;

    renderHistory(events, 1, id);

    const doneButtons = app.querySelectorAll('.mark-done-btn');
    doneButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const taskId = event.target.getAttribute('data-id');

            try {
                await markCompleted(taskId);
                await renderSpace(id);
            } catch (e) {
                alert("Не удалось отметить задачу как выполненную");
            }
        })
    })
}

export function getSpaceById(id) {
    const allSpaces = JSON.parse(localStorage.getItem("my_spaces") || "[]");
    return allSpaces.find(space => space.id === id);
}

export async function getCurrentTasks(id) {
    const token = localStorage.getItem("access_token");

    try {
        const response = await fetch(`https://colivin.ru/api/spaces/${id}/tasks`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) throw new Error(await response.text());

        const tasks = await response.json();
        localStorage.setItem(`space_${id}_tasks`, JSON.stringify(tasks));

        return tasks;
    } catch (error) {
        console.error("Ошибка загрузки задач:", error);
    }
}

export async function getUsernameById(id) {
    const token = localStorage.getItem("access_token");

    try {
        const response = await fetch(`https://colivin.ru/api/users/by-id/${id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) throw new Error(await response.text());

        const userData = await response.json();
        return  userData.login;
    } catch (error) {
        console.error("Ошибка при получении логина:", error);
        throw error;
    }
}


export async function markCompleted(taskId) {
    const token = localStorage.getItem("access_token");
    try {
        const response = await fetch(`https://colivin.ru/api/tasks/${taskId}/complete`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) throw new Error(await response.text());
    } catch (error) {
        console.error("Ошибка при выполнении задачи:", error);
        throw error;
    }
}

export async function getSpaceEvents(spaceId) {
    const token = localStorage.getItem("access_token");

    try {
        const response = await fetch(`https://colivin.ru/api/spaces/${spaceId}/events`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) throw new Error(await response.text());

        const events = await response.json();
        localStorage.setItem(`space_${spaceId}_events`, JSON.stringify(events));

        return events;
    } catch (error) {
        console.error("Ошибка при получении событий:", error);
        throw error;
    }
}
