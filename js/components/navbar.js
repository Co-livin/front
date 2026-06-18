export function Navbar(){
    const login = localStorage.getItem("login");
    const name = localStorage.getItem("name");

    return`
    <div class="navbar">
        <div class="logo" onclick="location.hash='dashboard'">
            COLI
        </div>
        
        <div class="nav-links">
            <a class="nav-link" href="https://forms.gle/FXtwKj416MPqszNHA" target="_blank">Обратная связь</a>
            
            <button onclick="location.hash='dashboard'">
                Пространства
            </button>
            
            <div class="profile-wrapper">
                <button onclick="toggleProfileMenu(event)">
                    Профиль
                </button>

                <div id="profile-menu" class="profile-menu hidden">
                    <div class="login">Логин: ${login}</div>
                    <div>Имя: ${name}</div>
                    <button class="theme-btn" onclick="toggleTheme()">
                        Темная тема
                    </button>
                    <button onclick="logout()">
                        Выйти
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
}

export function initNavbar() {
    setTimeout(() => {
        document.addEventListener("click", () => {
            const menu = document.getElementById("profile-menu");
            if (menu) {
                menu.classList.add("hidden");
            }
        });

        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            document.body.classList.add("dark-theme");
        }

        updateThemeButton();
    });
}

window.toggleProfileMenu = function(event) {
    event.stopPropagation();
    const menu = document.getElementById("profile-menu");
    menu.classList.toggle("hidden");
}

window.logout = function() {
    localStorage.clear();
    location.hash = "login";
    location.reload();
}

window.toggleTheme = function() {
    const isDark = document.body.classList.toggle("dark-theme");

    localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
    );

    updateThemeButton();
}

function updateThemeButton() {
    const btn = document.querySelector(".theme-btn");

    if (!btn) return;

    const dark = document.body.classList.contains("dark-theme");

    btn.textContent = dark ? "Светлая тема" : "Темная тема";
}
