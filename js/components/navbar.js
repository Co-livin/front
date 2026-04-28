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
                    <button onclick="location.hash='login'">
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
    });
}

window.toggleProfileMenu = function(event) {
    event.stopPropagation();
    const menu = document.getElementById("profile-menu");
    menu.classList.toggle("hidden");
}