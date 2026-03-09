import {renderLogin} from "./pages/login.js"
import {renderRegister} from "./pages/register.js"
import {renderDashboard} from "./pages/dashboard.js"
import {renderCreateSpace} from "./pages/createSpace.js"
import {renderSpace} from "./pages/space.js"
import {renderCreateTask} from "./pages/createTask.js"
import {renderAddUser} from "./pages/addUser.js"
import {renderProfile} from "./pages/profile.js"

export function router(){

    const hash=location.hash;

    if(hash.startsWith("#space/")){
        const id=hash.split("/")[1];
        renderSpace(id);
        return;
    }

    if(hash.startsWith("#create-task/")){
        const id=hash.split("/")[1];
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

        default:
            renderLogin();
            break;
    }

}