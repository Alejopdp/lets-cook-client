export const getToken = () => {
    return JSON.parse(window.localStorage.getItem("token"));
};

export const setItemInLocalStorage = (itemName, itemValue) => {
    return window.localStorage.setItem(itemName, JSON.stringify(itemValue));
};

export const clearLocalStorage = () => {
    window.localStorage.clear();
};
