let userKey="USER";

export function saveUser(user){
    localStorage.setItem(userKey,JSON.stringify(user));
}

export function getUser(){
    return JSON.parse(localStorage.getItem(userKey));
}

export function clearLocalStorage(){
    localStorage.clear();
}