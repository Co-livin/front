export function renderRegister(){

    const app=document.getElementById("app");

    app.innerHTML=`

    <main class="container">
    
        <button class="button back" onclick="location.hash = 'login'" style="margin-bottom:20px">
            ← Назад
        </button>
    
        <article class="card center-card">
        
            <h2 class="page-title">Регистрация</h2>
            
            <form class="register-form">
                <input class="input" name="login" placeholder="Логин" minlength="4" maxlength="46" required>
                <input class="input" name="name" placeholder="Имя" minlength="2" maxlength="46" required>
                <input class="input" name="password" type="password" placeholder="Пароль" minlength="8" maxlength="16" required>
            
                <button class="button primary" type="submit" id="button-register">
                    Зарегистрироваться
                </button>
            </form>
        </article>
        
        <br>
        
        <article class="card center-card description">
            <strong>Coli</strong> — трекер для организации бытовых дел для тех, кто живет или работает вместе
        </article>
    </main>
    
    `;

    const form = document.querySelector(".register-form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            await registerUser(data);

            location.hash = 'login'
        } catch (error) {
            alert("Ошибка регистрации, проверьте консоль.");
        }
    });

}

export async function registerUser(userData){
    try {
        const response = await fetch("https://colivin.ru/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const newUser = await response.json();
        console.log("Новый пользователь:", newUser);
    } catch (error) {
        console.error("Ошибка при создании пользователя:", error);
        throw error;
    }
}
