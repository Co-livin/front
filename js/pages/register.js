export function renderRegister(){

    const app=document.getElementById("app");

    app.innerHTML=`

    <div class="container">
    
        <button class="button secondary" onclick="location.hash = 'login'" style="margin-bottom:20px">
            ← Back
        </button>
    
        <div class="card center-card">
        
            <h2 class="page-title">Register</h2>
            
            <form class="register-form">
                <input class="input" name="login" placeholder="login" minlength="4" maxlength="16">
                <input class="input" name="name" placeholder="name" minlength="2" maxlength="16">
                <input class="input" name="password" type="password" placeholder="password" minlength="8" maxlength="16">
            
                <button class="button primary" type="submit" id="button-register">
                    Register
                </button>
            </form>
        </div>
    
    </div>
    
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
    console.log(JSON.stringify(userData))
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
