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
            <p>Ответственный: ${task.assignee_name}</p>
            <p>Дедлайн: ${task.next_due_date}</p>
            
            <br>
            
            <button class="button success mark-done-btn" data-id="${task.id}">
                Выполнено
            </button>
            
            <button class="button secondary update-btn" onclick="location.hash='update-task/${id}/${task.id}'">
                Изменить
            </button>
        </div>
    `).join('');

    const events = await getSpaceEvents(id);

    const ITEMS_PER_PAGE = 7;

    function initHistoryPagination(events, spaceId) {
        const ITEMS_PER_PAGE = 7;

        const historyContainer = document.getElementById("history-container");
        const paginationContainer = document.getElementById("pagination-container");

        let currentPage = 1;

        async function renderPage() {
            const totalPages = Math.max(1, Math.ceil(events.length / ITEMS_PER_PAGE));

            if (currentPage > totalPages) currentPage = totalPages;
            if (currentPage < 1) currentPage = 1;

            const start = (currentPage - 1) * ITEMS_PER_PAGE;
            const paginated = events.slice(start, start + ITEMS_PER_PAGE);

            historyContainer.replaceChildren(
                ...paginated.map(event => {
                    const div = document.createElement("div");
                    div.className = "history-item";

                    div.innerHTML = `
                    ${event.payload?.task_title || ''} <br>
                    ${event.payload?.user_name || ''} <br>
                    ${event.payload?.action || ''}
                `;

                    return div;
                })
            );

            const totalPagesText = Math.max(1, totalPages);

            paginationContainer.innerHTML = `
            <div class="pagination">
                <button class="page-btn prev" ${currentPage === 1 ? "disabled" : ""}>
                    <span class="arrow left"></span>
                </button>

                <span class="page-info">Page ${currentPage} / ${totalPagesText}</span>

                <button class="page-btn next" ${currentPage === totalPages ? "disabled" : ""}>
                    <span class="arrow right"></span>
                </button>
            </div>
        `;
        }

        paginationContainer.addEventListener("click", (e) => {
            const btn = e.target.closest("button");
            if (!btn || btn.disabled) return;

            if (btn.classList.contains("prev")) {
                currentPage--;
                renderPage();
            }

            if (btn.classList.contains("next")) {
                currentPage++;
                renderPage();
            }
        });

        renderPage();
    }

    const app=document.getElementById("app");

    app.innerHTML=`

    ${Navbar()}
    
    <div class="container">
    
        <button class="button back" onclick="location.hash = 'dashboard'" style="margin-bottom:20px">
            Отмена
        </button>
    
        <h2 class="page-title">Пространство ${space.name}</h2>
        
        <button class="button back" onclick="location.hash='create-task/${id}'">
            Создать задачу
        </button>
        
        <br><br>
        
        <h3>Активные задачи</h3>
        
        <div class="grid">
        
            ${tasksHTML || "<p>У вас пока нет задач.</p>"}
        
        </div>
        
        <br>
        
        <h3>History</h3>
        
        <div class="card" id="history-container"></div>

        <div id="pagination-container"></div>
    
    </div>
    
    `;

    await initHistoryPagination(events, id);

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
