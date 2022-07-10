export function getLocalStorage(key) {
    if (key) {
        const result = localStorage.getItem(key);
        if (result) {
            return JSON.parse(result);
        }
    }
    return [];
}


export function setLocalStorage(key, value) {
    if (key && value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

