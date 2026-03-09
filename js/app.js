import { router } from "./router.js"

window.addEventListener("hashchange", router)

window.addEventListener("load", () => {

    if(!location.hash)
        location.hash = "login"

    router()

})