import {getCurrentSpaces} from "./dashboard.js";

export function renderLogin(){

    const app=document.getElementById("app");

    app.innerHTML=`

    <div class="container">
    
        <div class="card center-card">
        
            <h2 class="page-title">Авторизация</h2>
            
            <form class="login-form">
            
                <input class="input" name="username" placeholder="Логин" minlength="4" maxlength="16">
                
                <input class="input" type="password" name="password" placeholder="Пароль" minlength="8" maxlength="16">
                
                <button class="button primary" type="submit" id="button-login">
                    Войти
                </button>
                
            </form>
            
            <br>
            
            <button class="button back" onclick="location.hash='register'">
                Создать аккаунт
            </button>
        
        </div>
        
        <br>
        
        <div class="card center-card description">
            <strong>Coli</strong> — трекер для организации бытовых дел для тех, кто живет или работает вместе
        </div>
    
    </div>
    
    `;

    const form = document.querySelector(".login-form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            await loginUser(data);
            await getCurrentUserData();
            const spaces = await getCurrentSpaces();
            if (spaces.length === 1) {
                location.hash = `space/${spaces[0].id}`
            } else {
                location.hash = "dashboard";
            }
        } catch(err) {
            alert("Ошибка входа");
        }
    })
}

export async function loginUser(userData) {
    try {
        const response = await fetch("https://colivin.ru/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json",
            },
            body: new URLSearchParams(userData),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("access_token", data.access_token);
            return data;
        } else {
            throw new Error("Unable to login");
        }

    } catch (err) {
        alert("Ошибка входа");
        console.error(err);
        throw err;
    }

}

export async function getCurrentUserData() {
    const token = localStorage.getItem("access_token");
    try {
        const response = await fetch("https://colivin.ru/api/auth/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error(await response.text());

        const user = await response.json();
        localStorage.setItem("login", user.login);
        localStorage.setItem("name", user.name);
        localStorage.setItem("id", user.id);
        localStorage.setItem("created_at", user.created_at);
    } catch (error) {
        console.error("Ошибка получения данных о пользователе:", error);
        alert("Пупупу, кажется вы не существуете")
    }
}