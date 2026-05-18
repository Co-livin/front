import { router } from "./router.js"
import {getCurrentSpaces} from "./pages/dashboard.js";

window.addEventListener("hashchange", router)
window.addEventListener("load", async () => {
    const token = localStorage.getItem("access_token")

    if(!location.hash) {
        if (!token) {
            location.hash = "login";
        } else {
            try {
                const spaces = await getCurrentSpaces();

                if (spaces && spaces.length === 1) {
                    location.hash = `space/${spaces[0].id}`;
                } else {
                    location.hash = "dashboard";
                }
            } catch(err) {
                console.error(err);
                localStorage.removeItem("access_token");
                location.hash = "login";
            }
        }
    }

    router();
})