const API = "http://localhost:8080";

export async function getSpaces() {

    const res = await fetch(API + "/spaces");

    return res.json();

}