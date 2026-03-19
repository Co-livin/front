import {renderLogin} from "./pages/login.js"
import {renderRegister} from "./pages/register.js"
import {renderDashboard} from "./pages/dashboard.js"
import {renderCreateSpace} from "./pages/createSpace.js"
import {renderSpace} from "./pages/space.js"
import {renderCreateTask} from "./pages/createTask.js"
import {renderAddUser} from "./pages/addUser.js"
import {renderProfile} from "./pages/profile.js"
import {renderJoinSpace} from "./pages/joinSpace.js";

export function router(){

    const hash=location.hash;

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

        case "#add-user":
            renderAddUser();
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