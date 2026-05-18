import {renderLogin} from "./pages/login.js"
import {renderRegister} from "./pages/register.js"
import {renderDashboard} from "./pages/dashboard.js"
import {renderCreateSpace} from "./pages/createSpace.js"
import {renderSpace} from "./pages/space.js"
import {renderCreateTask} from "./pages/createTask.js"
import {renderProfile} from "./pages/profile.js"
import {renderJoinSpace} from "./pages/joinSpace.js";
import {renderUpdateTask} from "./pages/updateTask.js";

export function router(){

    const hash=location.hash;

    const token = localStorage.getItem("access_token")

    const publicRoutes = ["#login", "#register", ""]

    if (!token && !publicRoutes.includes(hash)) {
        location.hash = "login"
        return
    }

    if(hash.startsWith("#space/")){
        const id= parseInt(hash.split("/")[1], 10);
        renderSpace(id);
        return;
    }

    if(hash.startsWith("#create-task/")){
        const id= parseInt(hash.split("/")[1], 10);
        renderCreateTask(id);
        return;
    }

    if (hash.startsWith("#update-task/")){
        const spaceId= parseInt(hash.split("/")[1], 10);
        const taskId = parseInt(hash.split("/")[2], 10);
        renderUpdateTask(spaceId, taskId);
        return;
    }

    switch(hash){

        case "#register":
            renderRegister();
            break;

        case "#dashboard":
            renderDashboard();
            break;

        case "#create-space":
            renderCreateSpace();
            break;

        case "#profile":
            renderProfile();
            break;

        case "#join-space":
            renderJoinSpace();
            break;

        default:
            renderLogin();
            break;
    }

}